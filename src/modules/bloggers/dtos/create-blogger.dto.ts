import { IsString } from 'class-validator';

export class CreateBloggerDto {
  @IsString()
  fullName: string;

  @IsString()
  status: string;
}
