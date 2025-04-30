import { Controller, Get } from '@nestjs/common';
import { PrivacyPolicyService } from './privacy-policy.service';
import { PrivacyPolicy } from './privacy-policy.entity';

@Controller('privacy-policy')
export class PrivacyPolicyController {
  constructor(private readonly privacyPolicyService: PrivacyPolicyService) {}

  @Get()
  findSingle(): Promise<PrivacyPolicy> {
    return this.privacyPolicyService.findSingle();
  }
}
