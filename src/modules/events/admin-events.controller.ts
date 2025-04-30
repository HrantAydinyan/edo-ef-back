import {
  Controller,
  Post,
  Body,
  Param,
  UseInterceptors,
  ParseIntPipe,
  Put,
  Delete,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto, UpdateEventDto } from './dtos';
import {
  DynamicFilesUploadInterceptor,
  FileValidationInterceptor,
  NoContentResponse,
} from 'src/common';
import { IEventFiles } from './interfaces';
import { AdminGuard } from '../auth/guards';

@Controller('admin/events')
@UseGuards(AdminGuard)
export class AdminEventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @UseInterceptors(new FileValidationInterceptor(['filePath']))
  @DynamicFilesUploadInterceptor([{ field: 'filePath', destination: 'events' }])
  async create(
    @Body() createEventDto: CreateEventDto,
    @UploadedFiles() files: IEventFiles,
  ) {
    return this.eventsService.create(createEventDto, files);
  }

  @Put(':id')
  @DynamicFilesUploadInterceptor([{ field: 'filePath', destination: 'events' }])
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEventDto: UpdateEventDto,
    @UploadedFiles() files?: IEventFiles,
  ) {
    return this.eventsService.update(id, updateEventDto, files);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<NoContentResponse> {
    await this.eventsService.remove(id);

    const response = new NoContentResponse(true, 'Successfully Deleted');

    return response;
  }
}
