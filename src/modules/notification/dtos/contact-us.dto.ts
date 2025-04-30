import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ContactUsDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  message: string;
}
