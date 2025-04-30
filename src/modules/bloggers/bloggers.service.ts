import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BloggersSection } from './bloggers.entity';
import { CreateBloggerDto, UpdateBloggerDto } from './dtos';
import { PageDto, PageMetaDto, PageOptionsSearchDto } from 'src/common';
import { BloggerNotFoundException } from './exceptions';
import { unlinkFile } from 'src/utils';
import { IBloggerFiles } from './interfaces';

@Injectable()
export class BloggersService {
  constructor(
    @InjectRepository(BloggersSection)
    private readonly bloggersRepository: Repository<BloggersSection>,
  ) {}

  async findAllPaginated(
    pageOptionsSearchDto: PageOptionsSearchDto,
  ): Promise<PageDto<BloggersSection>> {
    const { search, skip, take, order } = pageOptionsSearchDto;

    const queryBuilder = this.bloggersRepository.createQueryBuilder('blogger');

    if (search) {
      queryBuilder.where('(blogger.title ILIKE :search)', {
        search: `%${search}%`,
      });
    }

    queryBuilder.orderBy('blogger.createdAt', order);

    queryBuilder.skip(skip).take(take);

    const [data, totalCount] = await queryBuilder.getManyAndCount();

    const pageMetaDto = new PageMetaDto({
      totalCount,
      pageOptionsDto: pageOptionsSearchDto,
    });

    return new PageDto(data, pageMetaDto);
  }

  async findByIdOrFail(id: number): Promise<BloggersSection> {
    const blogger = await this.bloggersRepository.findOneBy({ id });
    if (!blogger) {
      throw new BloggerNotFoundException();
    }
    return blogger;
  }

  async create(
    createBloggerDto: CreateBloggerDto,
    files: IBloggerFiles,
  ): Promise<BloggersSection> {
    const blogger = this.bloggersRepository.create(createBloggerDto);

    blogger.filePath = `/public/bloggers/${files.filePath[0].filename}`;
    blogger.filePathType = files.filePath[0].mimetype;

    return this.bloggersRepository.save(blogger);
  }

  async update(
    id: number,
    updateBloggerDto: UpdateBloggerDto,
    files: IBloggerFiles,
  ): Promise<BloggersSection> {
    const existingblogger = await this.bloggersRepository.findOneBy({ id });
    if (!existingblogger) {
      throw new BloggerNotFoundException();
    }

    const updatedEntry = this.bloggersRepository.merge(
      existingblogger,
      updateBloggerDto,
    );

    if (files.filePath && files.filePath[0]) {
      if (existingblogger.filePath) await unlinkFile(existingblogger.filePath);
      updatedEntry.filePath = `/public/bloggers/${files.filePath[0].filename}`;
      updatedEntry.filePathType = files.filePath[0].mimetype;
    }

    return this.bloggersRepository.save(updatedEntry);
  }

  async findById(id: number): Promise<BloggersSection> {
    const existingblogger = await this.bloggersRepository.findOneBy({
      id,
    });

    if (!existingblogger) {
      throw new BloggerNotFoundException();
    }

    return existingblogger;
  }

  async remove(id: number): Promise<void> {
    const blogger = await this.findById(id);

    await Promise.all([
      unlinkFile(blogger.filePath),
      unlinkFile(blogger.filePathType),
      this.bloggersRepository.delete({ id: blogger.id }),
    ]);
  }
}
