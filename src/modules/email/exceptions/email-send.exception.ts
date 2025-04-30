import { BadRequestException } from '@nestjs/common';

export class EmailSendFailedException extends BadRequestException {
  constructor() {
    super('Email sending failed');
  }
}
