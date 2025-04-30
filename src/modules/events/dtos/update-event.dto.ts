import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateEventDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  label: string;

  @IsOptional()
  @IsString()
  status: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  bloggerId: number;
}
