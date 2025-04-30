import { UnprocessableEntityException } from '@nestjs/common';

export class InvalidEmailCredentialsException extends UnprocessableEntityException {
  constructor() {
    super('Email credentials are invalid');
  }
}
