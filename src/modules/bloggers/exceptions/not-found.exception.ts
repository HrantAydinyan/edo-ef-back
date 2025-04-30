import { NotFoundException } from '@nestjs/common';

export class BloggerNotFoundException extends NotFoundException {
  constructor() {
    super('Team member not found');
  }
}
