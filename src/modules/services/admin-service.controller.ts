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
import { ServicesService } from './services.service';
import { CreateServicesDto, UpdateServicesDto } from './dtos';
import {
  DynamicFilesUploadInterceptor,
  FileValidationInterceptor,
  NoContentResponse,
} from 'src/common';
import { IServiceFiles } from './interfaces';
import { AdminGuard } from '../auth/guards';

@Controller('admin/services')
@UseGuards(AdminGuard)
export class AdminServiceController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  @UseInterceptors(new FileValidationInterceptor(['filePath']))
  @DynamicFilesUploadInterceptor([
    { field: 'filePath', destination: 'service-images' },
  ])
  async create(
    @Body() createServicesDto: CreateServicesDto,
    @UploadedFiles() files: IServiceFiles,
  ) {
    return this.servicesService.create(createServicesDto, files);
  }

  @Put(':id')
  @DynamicFilesUploadInterceptor([
    { field: 'filePath', destination: 'service-images' },
  ])
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateServicesDto: UpdateServicesDto,
    @UploadedFiles() files?: IServiceFiles,
  ) {
    return this.servicesService.update(id, updateServicesDto, files);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<NoContentResponse> {
    await this.servicesService.remove(id);

    const response = new NoContentResponse(true, 'Successfully Deleted');

    return response;
  }
}
