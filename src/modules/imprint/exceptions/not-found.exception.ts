import { NotFoundException } from '@nestjs/common';

export class ImprintNotFoundException extends NotFoundException {
  constructor() {
    super('Imprint not found');
  }
}
