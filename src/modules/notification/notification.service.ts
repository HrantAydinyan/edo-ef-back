import { Injectable } from '@nestjs/common';
import { EmailService } from '../email/email.service';
import { IEmailDetails } from '../email/interfaces';
import {
  EmailSendFailedException,
  InvalidEmailCredentialsException,
} from '../email/exceptions';
import { sendEmailSchema } from 'src/utils';
import { BookAppointmentsDto, ContactUsDto } from './dtos';
import { createContactUsTemplate } from '../email/email-templates/create-contact-us.template';
import { createBookAppointmentsTemplate } from '../email/email-templates';

@Injectable()
export class NotificationService {
  constructor(private readonly emailService: EmailService) {}

  async sendContactUsEmail(contactUsDto: ContactUsDto): Promise<boolean> {
    try {
      const subject = 'Contact US';

      const contactUsTemplate = createContactUsTemplate(contactUsDto);

      const emailDetails: IEmailDetails = {
        from: {
          name: 'no-reply',
          address: process.env.EMAIL_FROM,
        },
        to: process.env.EMAIL_TO,
        subject,
        html: contactUsTemplate,
      };

      const { error } = sendEmailSchema.validate(emailDetails);
      if (error) {
        console.info(error);
        throw new InvalidEmailCredentialsException();
      }

      const isEmailAccepted = await this.emailService.sendEmail(emailDetails);

      return isEmailAccepted;
    } catch (error) {
      console.info(error);
      throw new EmailSendFailedException();
    }
  }

  async sendBookAppointmentsEmail(
    bookAppointmentsDto: BookAppointmentsDto,
  ): Promise<boolean> {
    try {
      const subject = 'Contact US';

      const bookAppointmentTemplate =
        createBookAppointmentsTemplate(bookAppointmentsDto);

      const emailDetails: IEmailDetails = {
        from: {
          name: 'no-reply',
          address: process.env.EMAIL_FROM,
        },
        to: process.env.EMAIL_TO,
        subject,
        html: bookAppointmentTemplate,
      };

      const { error } = sendEmailSchema.validate(emailDetails);
      if (error) {
        console.info(error);
        throw new InvalidEmailCredentialsException();
      }

      const isEmailAccepted = await this.emailService.sendEmail(emailDetails);

      return isEmailAccepted;
    } catch (error) {
      console.info(error);
      throw new EmailSendFailedException();
    }
  }
}
