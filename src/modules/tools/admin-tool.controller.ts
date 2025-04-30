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
import { ToolsService } from './tools.service';
import { CreateToolsDto, UpdateToolsDto } from './dtos';
import {
  DynamicFilesUploadInterceptor,
  FileValidationInterceptor,
  NoContentResponse,
} from 'src/common';
import { IToolFiles } from './interfaces';
import { AdminGuard } from '../auth/guards';

@Controller('admin/tools')
@UseGuards(AdminGuard)
export class AdminToolController {
  constructor(private readonly toolsService: ToolsService) {}

  @Post()
  @UseInterceptors(new FileValidationInterceptor(['filePath']))
  @DynamicFilesUploadInterceptor([
    { field: 'filePath', destination: 'tool-images' },
  ])
  async create(
    @Body() createToolsDto: CreateToolsDto,
    @UploadedFiles() files: IToolFiles,
  ) {
    return this.toolsService.create(createToolsDto, files);
  }

  @Put(':id')
  @DynamicFilesUploadInterceptor([
    { field: 'filePath', destination: 'tool-images' },
  ])
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateToolsDto: UpdateToolsDto,
    @UploadedFiles() files?: IToolFiles,
  ) {
    return this.toolsService.update(id, updateToolsDto, files);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<NoContentResponse> {
    await this.toolsService.remove(id);

    const response = new NoContentResponse(true, 'Successfully Deleted');

    return response;
  }
}
