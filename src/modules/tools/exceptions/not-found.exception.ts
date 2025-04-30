import { NotFoundException } from '@nestjs/common';

export class ToolNotFoundException extends NotFoundException {
  constructor() {
    super('Tool not found');
  }
}
