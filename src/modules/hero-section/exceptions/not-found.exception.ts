import { NotFoundException } from '@nestjs/common';

export class HeroSectionNotFoundException extends NotFoundException {
  constructor() {
    super('Hero Section not found');
  }
}
