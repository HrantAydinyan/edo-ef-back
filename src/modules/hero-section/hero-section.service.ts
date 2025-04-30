import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HeroSection } from './hero-section.entity';
import { Repository } from 'typeorm';
import { IHeroSection } from './interfaces';
import { UpdateHeroSectionDto } from './dtos';
import { HeroSectionNotFoundException } from './exceptions';

@Injectable()
export class HeroSectionService {
  constructor(
    @InjectRepository(HeroSection)
    private readonly HeroSectionRepository: Repository<HeroSection>,
  ) {}

  async findByIdOrFail(id: number): Promise<HeroSection> {
    const heroSection = await this.HeroSectionRepository.findOneBy({ id });

    if (!heroSection) {
      throw new HeroSectionNotFoundException();
    }

    return heroSection;
  }

  async seed(createHeroSection: IHeroSection): Promise<HeroSection> {
    const heroSection = this.HeroSectionRepository.create(createHeroSection);
    return this.HeroSectionRepository.save(heroSection);
  }

  async update(
    id: number,
    updateHeroSectionDto: UpdateHeroSectionDto,
  ): Promise<HeroSection> {
    const heroSection = await this.findByIdOrFail(id);

    const updatedHeroSection = this.HeroSectionRepository.merge(
      heroSection,
      updateHeroSectionDto,
    );

    return this.HeroSectionRepository.save(updatedHeroSection);
  }

  async isTableEmpty(): Promise<boolean> {
    return !Boolean(await this.HeroSectionRepository.count());
  }

  async findSingle(): Promise<HeroSection> {
    return this.HeroSectionRepository.findOneBy({});
  }
}
