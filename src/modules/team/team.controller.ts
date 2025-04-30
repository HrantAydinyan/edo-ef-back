import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamSection } from './team.entity';
import { PageDto, PageOptionsSearchDto } from 'src/common';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get()
  async findAll(
    @Query() pageOptionsSearchDto: PageOptionsSearchDto,
  ): Promise<PageDto<TeamSection>> {
    return this.teamService.findAllPaginated(pageOptionsSearchDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<TeamSection> {
    return this.teamService.findByIdOrFail(id);
  }
}
