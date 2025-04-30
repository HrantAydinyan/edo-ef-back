import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsSection } from './blogs.entity';
import { PageDto, PageOptionsSearchDto } from 'src/common';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Get()
  async findAll(
    @Query() pageOptionsSearchDto: PageOptionsSearchDto,
  ): Promise<PageDto<BlogsSection>> {
    return this.blogsService.findAllPaginated(pageOptionsSearchDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<BlogsSection> {
    return this.blogsService.findByIdOrFail(id);
  }
}
