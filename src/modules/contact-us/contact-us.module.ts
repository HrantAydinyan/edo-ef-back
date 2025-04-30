import { Module } from '@nestjs/common';
import { NotificationService } from '../notification/notification.service';
import { EmailService } from '../email/email.service';
import { ContactUsController } from './contact-us.controller';
import { ContactUsService } from './contact-us.service';

@Module({
  imports: [],
  controllers: [ContactUsController],
  providers: [ContactUsService, NotificationService, EmailService],
  exports: [ContactUsService],
})
export class ContactUsModule {}
