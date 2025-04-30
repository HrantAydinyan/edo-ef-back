import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventsSection } from './events.entity';
import { CreateEventDto, UpdateEventDto } from './dtos';
import { PageDto, PageMetaDto, PageOptionsSearchDto } from 'src/common';
import { EventNotFoundException } from './exceptions';
import { unlinkFile } from 'src/utils';
import { IEventFiles } from './interfaces';
import { BloggersService } from '../bloggers/bloggers.service';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(EventsSection)
    private readonly eventsRepository: Repository<EventsSection>,
    private readonly bloggersService: BloggersService,
  ) {}

  async findAllPaginated(
    pageOptionsSearchDto: PageOptionsSearchDto,
  ): Promise<PageDto<EventsSection>> {
    const { search, skip, take, order } = pageOptionsSearchDto;

    const queryBuilder = this.eventsRepository
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.blogger', 'blogger');

    if (search) {
      queryBuilder.where('(event.title ILIKE :search)', {
        search: `%${search}%`,
      });
    }

    queryBuilder.orderBy('event.createdAt', order);

    queryBuilder.skip(skip).take(take);

    const [data, totalCount] = await queryBuilder.getManyAndCount();

    const pageMetaDto = new PageMetaDto({
      totalCount,
      pageOptionsDto: pageOptionsSearchDto,
    });

    return new PageDto(data, pageMetaDto);
  }

  async findByIdOrFail(id: number): Promise<EventsSection> {
    const event = await this.eventsRepository
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.blogger', 'blogger')
      .where('event.id = :id', { id })
      .getOne();

    if (!event) {
      throw new EventNotFoundException();
    }
    return event;
  }

  async create(
    createEventDto: CreateEventDto,
    files: IEventFiles,
  ): Promise<EventsSection> {
    const existingBlogger = await this.bloggersService.findByIdOrFail(
      createEventDto.bloggerId,
    );

    const event = this.eventsRepository.create({
      ...createEventDto,
      blogger: existingBlogger,
    });

    event.filePath = `/public/events/${files.filePath[0].filename}`;
    event.filePathType = files.filePath[0].mimetype;

    return this.eventsRepository.save(event);
  }

  async update(
    id: number,
    updateEventDto: UpdateEventDto,
    files: IEventFiles,
  ): Promise<EventsSection> {
    const existingBlogger = await this.bloggersService.findByIdOrFail(
      updateEventDto.bloggerId,
    );

    const existingEvent = await this.eventsRepository.findOneBy({ id });
    if (!existingEvent) {
      throw new EventNotFoundException();
    }

    const updatedEntry = this.eventsRepository.merge(existingEvent, {
      ...updateEventDto,
      blogger: existingBlogger,
    });

    if (files.filePath && files.filePath[0]) {
      if (existingEvent.filePath) await unlinkFile(existingEvent.filePath);
      updatedEntry.filePath = `/public/events/${files.filePath[0].filename}`;
      updatedEntry.filePathType = files.filePath[0].mimetype;
    }

    return this.eventsRepository.save(updatedEntry);
  }

  async findById(id: number): Promise<EventsSection> {
    const existingEvent = await this.eventsRepository.findOneBy({
      id,
    });

    if (!existingEvent) {
      throw new EventNotFoundException();
    }

    return existingEvent;
  }

  async remove(id: number): Promise<void> {
    const event = await this.findById(id);

    await Promise.all([
      unlinkFile(event.filePath),
      unlinkFile(event.filePathType),
      this.eventsRepository.delete({ id: event.id }),
    ]);
  }
}
