import { NotFoundException } from '@nestjs/common';

export class IncorrectPasswordException extends NotFoundException {
  constructor() {
    super('Incorrect password');
  }
}
