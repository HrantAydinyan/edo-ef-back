import { IsEmail } from 'class-validator';

export class BookAppointmentsDto {
  @IsEmail()
  email: string;
}
