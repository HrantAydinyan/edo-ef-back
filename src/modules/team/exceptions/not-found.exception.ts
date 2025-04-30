import { NotFoundException } from '@nestjs/common';

export class TeamMemberNotFoundException extends NotFoundException {
  constructor() {
    super('Team member not found');
  }
}
