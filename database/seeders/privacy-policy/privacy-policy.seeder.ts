import { Injectable } from '@nestjs/common';
import { consoleInfo } from 'src/utils';
import { privacyPolicyData } from './content';
import { PrivacyPolicyService } from 'src/modules/privacy-policy/privacy-policy.service';

@Injectable()
export class PrivacyPolicySeeder {
  constructor(private readonly privacyPolicyService: PrivacyPolicyService) {}

  async seed(): Promise<void> {
    const isTableEmpty = await this.privacyPolicyService.isTableEmpty();

    if (isTableEmpty) {
      await this.privacyPolicyService.seed(privacyPolicyData);

      consoleInfo(`Privacy policy created.`);
    } else {
      consoleInfo(`Privacy policy already exists.`);
    }
  }
}
