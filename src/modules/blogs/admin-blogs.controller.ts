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
import { BlogsService } from './blogs.service';
import { CreateBlogDto, UpdateBlogDto } from './dtos';
import {
  DynamicFilesUploadInterceptor,
  FileValidationInterceptor,
  NoContentResponse,
} from 'src/common';
import { IBlogFiles } from './interfaces';
import { AdminGuard } from '../auth/guards';

@Controller('admin/blogs')
@UseGuards(AdminGuard)
export class AdminBlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Post()
  @UseInterceptors(new FileValidationInterceptor(['filePath']))
  @DynamicFilesUploadInterceptor([{ field: 'filePath', destination: 'blogs' }])
  async create(
    @Body() createBlogDto: CreateBlogDto,
    @UploadedFiles() files: IBlogFiles,
  ) {
    return this.blogsService.create(createBlogDto, files);
  }

  @Put(':id')
  @DynamicFilesUploadInterceptor([{ field: 'filePath', destination: 'blogs' }])
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBlogDto: UpdateBlogDto,
    @UploadedFiles() files?: IBlogFiles,
  ) {
    return this.blogsService.update(id, updateBlogDto, files);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<NoContentResponse> {
    await this.blogsService.remove(id);

    const response = new NoContentResponse(true, 'Successfully Deleted');

    return response;
  }
}
