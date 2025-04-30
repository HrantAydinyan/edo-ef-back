import { IsOptional, IsString } from 'class-validator';

export class UpdateBloggerDto {
  @IsOptional()
  @IsString()
  fullName: string;

  @IsOptional()
  @IsString()
  position: string;
}
