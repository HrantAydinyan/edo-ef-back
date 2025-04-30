import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServicesSection } from './services.entity';
import { CreateServicesDto, UpdateServicesDto } from './dtos';
import { PageDto, PageMetaDto, PageOptionsSearchDto } from 'src/common';
import { ServiceNotFoundException } from './exceptions';
import { unlinkFile } from 'src/utils';
import { IServiceFiles } from './interfaces';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(ServicesSection)
    private readonly servicesRepository: Repository<ServicesSection>,
  ) {}

  async findAllPaginated(
    pageOptionsSearchDto: PageOptionsSearchDto,
  ): Promise<PageDto<ServicesSection>> {
    const { search, skip, take, order } = pageOptionsSearchDto;

    const queryBuilder = this.servicesRepository.createQueryBuilder('service');

    if (search) {
      queryBuilder.where('(service.title ILIKE :search)', {
        search: `%${search}%`,
      });
    }

    queryBuilder.orderBy('service.createdAt', order);

    queryBuilder.skip(skip).take(take);

    const [data, totalCount] = await queryBuilder.getManyAndCount();

    const pageMetaDto = new PageMetaDto({
      totalCount,
      pageOptionsDto: pageOptionsSearchDto,
    });

    return new PageDto(data, pageMetaDto);
  }

  async findByIdOrFail(id: number): Promise<ServicesSection> {
    const service = await this.servicesRepository.findOneBy({ id });
    if (!service) {
      throw new ServiceNotFoundException();
    }
    return service;
  }

  async create(
    createServicesDto: CreateServicesDto,
    files: IServiceFiles,
  ): Promise<ServicesSection> {
    const service = this.servicesRepository.create(createServicesDto);

    service.filePath = `/public/service-images/${files.filePath[0].filename}`;
    service.filePathType = files.filePath[0].mimetype;

    return this.servicesRepository.save(service);
  }

  async update(
    id: number,
    updateServicesDto: UpdateServicesDto,
    files: IServiceFiles,
  ): Promise<ServicesSection> {
    const existingService = await this.servicesRepository.findOneBy({ id });
    if (!existingService) {
      throw new ServiceNotFoundException();
    }

    const updatedEntry = this.servicesRepository.merge(
      existingService,
      updateServicesDto,
    );

    if (files.filePath && files.filePath[0]) {
      if (existingService.filePath) await unlinkFile(existingService.filePath);
      updatedEntry.filePath = `/public/service-images/${files.filePath[0].filename}`;
      updatedEntry.filePathType = files.filePath[0].mimetype;
    }

    return this.servicesRepository.save(updatedEntry);
  }

  async findById(id: number): Promise<ServicesSection> {
    const existingService = await this.servicesRepository.findOneBy({
      id,
    });

    if (!existingService) {
      throw new ServiceNotFoundException();
    }

    return existingService;
  }

  async remove(id: number): Promise<void> {
    const service = await this.findById(id);

    await Promise.all([
      unlinkFile(service.filePath),
      unlinkFile(service.filePathType),
      this.servicesRepository.delete({ id: service.id }),
    ]);
  }
}
