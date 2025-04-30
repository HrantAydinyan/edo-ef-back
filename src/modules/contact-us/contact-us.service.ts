import { Injectable } from '@nestjs/common';
import { BookAppointmentsDto, ContactUsDto } from '../notification/dtos';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class ContactUsService {
  constructor(private readonly notificationService: NotificationService) {}

  async sendEmail(contactUsDto: ContactUsDto): Promise<boolean> {
    return this.notificationService.sendContactUsEmail(contactUsDto);
  }

  async sendBookAppointmentsEmail(
    bookAppointmentsDto: BookAppointmentsDto,
  ): Promise<boolean> {
    return this.notificationService.sendBookAppointmentsEmail(
      bookAppointmentsDto,
    );
  }
}
