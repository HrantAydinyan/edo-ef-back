import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsSection } from './events.entity';
import { PageDto, PageOptionsSearchDto } from 'src/common';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  async findAll(
    @Query() pageOptionsSearchDto: PageOptionsSearchDto,
  ): Promise<PageDto<EventsSection>> {
    return this.eventsService.findAllPaginated(pageOptionsSearchDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<EventsSection> {
    return this.eventsService.findByIdOrFail(id);
  }
}
