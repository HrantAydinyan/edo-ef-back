import { IsOptional, IsString } from 'class-validator';

export class UpdateToolsDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  shortDescription: string;
}
