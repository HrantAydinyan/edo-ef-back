import { IsString } from 'class-validator';

export class CreateToolsDto {
  @IsString()
  title: string;

  @IsString()
  shortDescription: string;
}
