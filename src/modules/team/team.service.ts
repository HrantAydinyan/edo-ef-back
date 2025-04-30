import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeamSection } from './team.entity';
import { CreateTeamDto, UpdateTeamDto } from './dtos';
import { PageDto, PageMetaDto, PageOptionsSearchDto } from 'src/common';
import { TeamMemberNotFoundException } from './exceptions';
import { unlinkFile } from 'src/utils';
import { ITeamFiles } from './interfaces';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(TeamSection)
    private readonly teamRepository: Repository<TeamSection>,
  ) {}

  async findAllPaginated(
    pageOptionsSearchDto: PageOptionsSearchDto,
  ): Promise<PageDto<TeamSection>> {
    const { search, skip, take, order } = pageOptionsSearchDto;

    const queryBuilder = this.teamRepository.createQueryBuilder('teamMember');

    if (search) {
      queryBuilder.where('(teamMember.title ILIKE :search)', {
        search: `%${search}%`,
      });
    }

    queryBuilder.orderBy('teamMember.createdAt', order);

    queryBuilder.skip(skip).take(take);

    const [data, totalCount] = await queryBuilder.getManyAndCount();

    const pageMetaDto = new PageMetaDto({
      totalCount,
      pageOptionsDto: pageOptionsSearchDto,
    });

    return new PageDto(data, pageMetaDto);
  }

  async findByIdOrFail(id: number): Promise<TeamSection> {
    const teamMember = await this.teamRepository.findOneBy({ id });
    if (!teamMember) {
      throw new TeamMemberNotFoundException();
    }
    return teamMember;
  }

  async create(
    createTeamDto: CreateTeamDto,
    files: ITeamFiles,
  ): Promise<TeamSection> {
    const teamMember = this.teamRepository.create(createTeamDto);

    teamMember.filePath = `/public/team-images/${files.filePath[0].filename}`;
    teamMember.filePathType = files.filePath[0].mimetype;

    return this.teamRepository.save(teamMember);
  }

  async update(
    id: number,
    updateTeamDto: UpdateTeamDto,
    files: ITeamFiles,
  ): Promise<TeamSection> {
    const existingTeamMember = await this.teamRepository.findOneBy({ id });
    if (!existingTeamMember) {
      throw new TeamMemberNotFoundException();
    }

    const updatedEntry = this.teamRepository.merge(
      existingTeamMember,
      updateTeamDto,
    );

    if (files.filePath && files.filePath[0]) {
      if (existingTeamMember.filePath)
        await unlinkFile(existingTeamMember.filePath);
      updatedEntry.filePath = `/public/team-images/${files.filePath[0].filename}`;
      updatedEntry.filePathType = files.filePath[0].mimetype;
    }

    return this.teamRepository.save(updatedEntry);
  }

  async findById(id: number): Promise<TeamSection> {
    const existingTeamMember = await this.teamRepository.findOneBy({
      id,
    });

    if (!existingTeamMember) {
      throw new TeamMemberNotFoundException();
    }

    return existingTeamMember;
  }

  async remove(id: number): Promise<void> {
    const teamMember = await this.findById(id);

    await Promise.all([
      unlinkFile(teamMember.filePath),
      unlinkFile(teamMember.filePathType),
      this.teamRepository.delete({ id: teamMember.id }),
    ]);
  }
}
