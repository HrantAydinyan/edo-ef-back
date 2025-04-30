import { Body, Controller, Post } from '@nestjs/common';
import { BookAppointmentsDto, ContactUsDto } from '../notification/dtos';
import { ContactUsService } from './contact-us.service';

@Controller('contact-us')
export class ContactUsController {
  constructor(private readonly contactUsService: ContactUsService) {}

  @Post()
  sendEmail(@Body() contactUsDto: ContactUsDto): Promise<boolean> {
    return this.contactUsService.sendEmail(contactUsDto);
  }

  @Post('book-appointments')
  sendBookAppointmentsEmail(
    @Body() bookAppointmentsDto: BookAppointmentsDto,
  ): Promise<boolean> {
    return this.contactUsService.sendBookAppointmentsEmail(bookAppointmentsDto);
  }
}
