import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ToolsSection } from './tools.entity';
import { CreateToolsDto, UpdateToolsDto } from './dtos';
import { PageDto, PageMetaDto, PageOptionsSearchDto } from 'src/common';
import { ToolNotFoundException } from './exceptions';
import { unlinkFile } from 'src/utils';
import { IToolFiles } from './interfaces';

@Injectable()
export class ToolsService {
  constructor(
    @InjectRepository(ToolsSection)
    private readonly toolsRepository: Repository<ToolsSection>,
  ) {}

  async findAllPaginated(
    pageOptionsSearchDto: PageOptionsSearchDto,
  ): Promise<PageDto<ToolsSection>> {
    const { search, skip, take, order } = pageOptionsSearchDto;

    const queryBuilder = this.toolsRepository.createQueryBuilder('tool');

    if (search) {
      queryBuilder.where('(tool.title ILIKE :search)', {
        search: `%${search}%`,
      });
    }

    queryBuilder.orderBy('tool.createdAt', order);

    queryBuilder.skip(skip).take(take);

    const [data, totalCount] = await queryBuilder.getManyAndCount();

    const pageMetaDto = new PageMetaDto({
      totalCount,
      pageOptionsDto: pageOptionsSearchDto,
    });

    return new PageDto(data, pageMetaDto);
  }

  async findByIdOrFail(id: number): Promise<ToolsSection> {
    const tool = await this.toolsRepository.findOneBy({ id });
    if (!tool) {
      throw new ToolNotFoundException();
    }
    return tool;
  }

  async create(
    createToolsDto: CreateToolsDto,
    files: IToolFiles,
  ): Promise<ToolsSection> {
    const tool = this.toolsRepository.create(createToolsDto);

    tool.filePath = `/public/tool-images/${files.filePath[0].filename}`;
    tool.filePathType = files.filePath[0].mimetype;

    return this.toolsRepository.save(tool);
  }

  async update(
    id: number,
    updateToolsDto: UpdateToolsDto,
    files: IToolFiles,
  ): Promise<ToolsSection> {
    const existingTool = await this.toolsRepository.findOneBy({ id });
    if (!existingTool) {
      throw new ToolNotFoundException();
    }

    const updatedEntry = this.toolsRepository.merge(
      existingTool,
      updateToolsDto,
    );

    if (files.filePath && files.filePath[0]) {
      if (existingTool.filePath) await unlinkFile(existingTool.filePath);
      updatedEntry.filePath = `/public/tool-images/${files.filePath[0].filename}`;
      updatedEntry.filePathType = files.filePath[0].mimetype;
    }

    return this.toolsRepository.save(updatedEntry);
  }

  async findById(id: number): Promise<ToolsSection> {
    const existingTool = await this.toolsRepository.findOneBy({
      id,
    });

    if (!existingTool) {
      throw new ToolNotFoundException();
    }

    return existingTool;
  }

  async remove(id: number): Promise<void> {
    const tool = await this.findById(id);

    await Promise.all([
      unlinkFile(tool.filePath),
      unlinkFile(tool.filePathType),
      this.toolsRepository.delete({ id: tool.id }),
    ]);
  }
}
