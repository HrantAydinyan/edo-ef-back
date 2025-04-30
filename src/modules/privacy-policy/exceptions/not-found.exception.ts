import { NotFoundException } from '@nestjs/common';

export class PrivacyPolicyNotFoundException extends NotFoundException {
  constructor() {
    super('Privacy policy not found');
  }
}
