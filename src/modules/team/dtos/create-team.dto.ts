import { IsString } from 'class-validator';

export class CreateTeamDto {
  @IsString()
  fullName: string;

  @IsString()
  position: string;
}
