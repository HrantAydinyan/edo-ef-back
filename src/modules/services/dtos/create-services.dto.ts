import { IsString } from 'class-validator';

export class CreateServicesDto {
  @IsString()
  title: string;

  @IsString()
  shortDescription: string;

  @IsString()
  description: string;
}
