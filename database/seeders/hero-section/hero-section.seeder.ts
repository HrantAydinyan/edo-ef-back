import { Injectable } from '@nestjs/common';
import { consoleInfo } from 'src/utils';
import { heroSectionData } from './content';
import { HeroSectionService } from 'src/modules/hero-section/hero-section.service';

@Injectable()
export class HeroSectionSeeder {
  constructor(private readonly heroSectionService: HeroSectionService) {}

  async seed(): Promise<void> {
    const isTableEmpty = await this.heroSectionService.isTableEmpty();

    if (isTableEmpty) {
      await this.heroSectionService.seed(heroSectionData);

      consoleInfo(`Hero Section created.`);
    } else {
      consoleInfo(`Hero Section already exists.`);
    }
  }
}
