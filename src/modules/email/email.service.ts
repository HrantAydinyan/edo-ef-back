import { Injectable } from '@nestjs/common';
import { Transporter } from 'nodemailer';
import { EmailSendFailedException } from './exceptions';
import { getTransport } from './configs';
import { IEmailDetails } from './interfaces';

@Injectable()
export class EmailService {
  constructor() {}

  async sendEmail(emailDetails: IEmailDetails): Promise<boolean> {
    try {
      console.log();
      const transporter: Transporter = getTransport();
      const response = await transporter.sendMail(emailDetails);

      const isAccepted = !!response.accepted?.length;
      return isAccepted;
    } catch (error) {
      console.info(error);
      throw new EmailSendFailedException();
    }
  }
}
