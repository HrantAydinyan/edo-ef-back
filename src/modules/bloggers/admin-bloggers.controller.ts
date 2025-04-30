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
import { BloggersService } from './bloggers.service';
import { CreateBloggerDto, UpdateBloggerDto } from './dtos';
import {
  DynamicFilesUploadInterceptor,
  FileValidationInterceptor,
  NoContentResponse,
} from 'src/common';
import { IBloggerFiles } from './interfaces';
import { AdminGuard } from '../auth/guards';

@Controller('admin/bloggers')
@UseGuards(AdminGuard)
export class AdminBloggersController {
  constructor(private readonly bloggersService: BloggersService) {}

  @Post()
  @UseInterceptors(new FileValidationInterceptor(['filePath']))
  @DynamicFilesUploadInterceptor([
    { field: 'filePath', destination: 'bloggers' },
  ])
  async create(
    @Body() createBloggerDto: CreateBloggerDto,
    @UploadedFiles() files: IBloggerFiles,
  ) {
    return this.bloggersService.create(createBloggerDto, files);
  }

  @Put(':id')
  @DynamicFilesUploadInterceptor([
    { field: 'filePath', destination: 'bloggers' },
  ])
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBloggerDto: UpdateBloggerDto,
    @UploadedFiles() files?: IBloggerFiles,
  ) {
    return this.bloggersService.update(id, updateBloggerDto, files);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<NoContentResponse> {
    await this.bloggersService.remove(id);

    const response = new NoContentResponse(true, 'Successfully Deleted');

    return response;
  }
}
