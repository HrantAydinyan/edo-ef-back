import { Module } from '@nestjs/common';
import { AdminSeeder } from './admin/admin.seeder';
import { AdminModule } from 'src/modules/admin/admin.module';
import { PrivacyPolicyModule } from 'src/modules/privacy-policy/privacy-policy.module';
import { PrivacyPolicySeeder } from './privacy-policy/privacy-policy.seeder';
import { HeroSectionModule } from 'src/modules/hero-section/hero-section.module';
import { HeroSectionSeeder } from './hero-section/hero-section.seeder';
import { ImprintModule } from 'src/modules/imprint/imprint.module';
import { ImprintSeeder } from './imprint/imprint.seeder';

@Module({
  imports: [AdminModule, PrivacyPolicyModule, HeroSectionModule, ImprintModule],
  providers: [
    AdminSeeder,
    PrivacyPolicySeeder,
    HeroSectionSeeder,
    ImprintSeeder,
  ],
})
export class SeederModule {}
