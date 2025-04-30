import {
  Controller,
  Put,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from '../auth/guards';
import { HeroSectionService } from './hero-section.service';
import { UpdateHeroSectionDto } from './dtos';
import { HeroSection } from './hero-section.entity';

@Controller('admin/hero-section')
@UseGuards(AdminGuard)
export class AdminHeroSectionController {
  constructor(private readonly heroSectionService: HeroSectionService) {}

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateHeroSectionDto: UpdateHeroSectionDto,
  ): Promise<HeroSection> {
    return this.heroSectionService.update(id, updateHeroSectionDto);
  }
}
