import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateEventDto {
  @IsString()
  title: string;

  @IsString()
  label: string;

  @IsString()
  status: string;

  @IsString()
  description: string;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  bloggerId: number;
}
