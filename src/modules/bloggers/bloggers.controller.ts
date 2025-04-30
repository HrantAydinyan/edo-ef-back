import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { BloggersService } from './bloggers.service';
import { BloggersSection } from './bloggers.entity';
import { PageDto, PageOptionsSearchDto } from 'src/common';

@Controller('bloggers')
export class BloggersController {
  constructor(private readonly bloggersService: BloggersService) {}

  @Get()
  async findAll(
    @Query() pageOptionsSearchDto: PageOptionsSearchDto,
  ): Promise<PageDto<BloggersSection>> {
    return this.bloggersService.findAllPaginated(pageOptionsSearchDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<BloggersSection> {
    return this.bloggersService.findByIdOrFail(id);
  }
}
