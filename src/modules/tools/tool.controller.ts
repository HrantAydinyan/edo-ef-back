import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ToolsService } from './tools.service';
import { ToolsSection } from './tools.entity';
import { PageDto, PageOptionsSearchDto } from 'src/common';

@Controller('tools')
export class ToolController {
  constructor(private readonly toolsService: ToolsService) {}

  @Get()
  async findAll(
    @Query() pageOptionsSearchDto: PageOptionsSearchDto,
  ): Promise<PageDto<ToolsSection>> {
    return this.toolsService.findAllPaginated(pageOptionsSearchDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ToolsSection> {
    return this.toolsService.findByIdOrFail(id);
  }
}
