import { IsOptional, IsString } from 'class-validator';

export class UpdateServicesDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  shortDescription: string;

  @IsOptional()
  @IsString()
  description: string;
}
