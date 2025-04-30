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
import { TeamService } from './team.service';
import { CreateTeamDto, UpdateTeamDto } from './dtos';
import {
  DynamicFilesUploadInterceptor,
  FileValidationInterceptor,
  NoContentResponse,
} from 'src/common';
import { ITeamFiles } from './interfaces';
import { AdminGuard } from '../auth/guards';

@Controller('admin/team')
@UseGuards(AdminGuard)
export class AdminTeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  @UseInterceptors(new FileValidationInterceptor(['filePath']))
  @DynamicFilesUploadInterceptor([
    { field: 'filePath', destination: 'team-images' },
  ])
  async create(
    @Body() createTeamDto: CreateTeamDto,
    @UploadedFiles() files: ITeamFiles,
  ) {
    return this.teamService.create(createTeamDto, files);
  }

  @Put(':id')
  @DynamicFilesUploadInterceptor([
    { field: 'filePath', destination: 'team-images' },
  ])
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTeamDto: UpdateTeamDto,
    @UploadedFiles() files?: ITeamFiles,
  ) {
    return this.teamService.update(id, updateTeamDto, files);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<NoContentResponse> {
    await this.teamService.remove(id);

    const response = new NoContentResponse(true, 'Successfully Deleted');

    return response;
  }
}
