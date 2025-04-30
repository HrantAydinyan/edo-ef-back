import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrivacyPolicy } from './privacy-policy.entity';
import { PrivacyPolicyController } from './privacy-policy.controller';
import { AdminPrivacyPolicyController } from './admin-privacy-policy.controller';
import { PrivacyPolicyService } from './privacy-policy.service';

@Module({
  imports: [TypeOrmModule.forFeature([PrivacyPolicy])],
  controllers: [PrivacyPolicyController, AdminPrivacyPolicyController],
  providers: [PrivacyPolicyService],
  exports: [PrivacyPolicyService],
})
export class PrivacyPolicyModule {}
