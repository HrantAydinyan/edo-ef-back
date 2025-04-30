import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { TeamSection } from './team.entity';
import { AdminTeamController } from './admin-team.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TeamSection])],
  controllers: [TeamController, AdminTeamController],
  providers: [TeamService],
  exports: [TeamService],
})
export class TeamModule {}
