import { IsString } from 'class-validator';

export class UpdateImprintDto {
  @IsString()
  title: string;

  @IsString()
  content: string;
}
