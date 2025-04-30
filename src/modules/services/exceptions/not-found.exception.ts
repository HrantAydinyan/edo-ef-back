import { NotFoundException } from '@nestjs/common';

export class ServiceNotFoundException extends NotFoundException {
  constructor() {
    super('Service not found');
  }
}
