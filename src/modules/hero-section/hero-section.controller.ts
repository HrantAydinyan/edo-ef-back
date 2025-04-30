import { Controller, Get } from '@nestjs/common';
import { HeroSectionService } from './hero-section.service';
import { HeroSection } from './hero-section.entity';

@Controller('hero-section')
export class HeroSectionController {
  constructor(private readonly heroSectionService: HeroSectionService) {}

  @Get()
  findSingle(): Promise<HeroSection> {
    return this.heroSectionService.findSingle();
  }
}
