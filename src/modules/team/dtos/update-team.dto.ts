import { IsOptional, IsString } from 'class-validator';

export class UpdateTeamDto {
  @IsOptional()
  @IsString()
  fullName: string;

  @IsOptional()
  @IsString()
  position: string;
}
