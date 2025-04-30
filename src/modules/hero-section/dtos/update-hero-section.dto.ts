import { IsString } from 'class-validator';

export class UpdateHeroSectionDto {
  @IsString()
  title: string;

  @IsString()
  content: string;
}
