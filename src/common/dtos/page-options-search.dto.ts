import { IsOptional, IsString } from 'class-validator';
import { PageOptionsDto } from './page-options.dto';

export class PageOptionsSearchDto extends PageOptionsDto {
  @IsString()
  @IsOptional()
  search?: string;
}
