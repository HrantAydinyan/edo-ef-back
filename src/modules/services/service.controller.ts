import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesSection } from './services.entity';
import { PageDto, PageOptionsSearchDto } from 'src/common';

@Controller('services')
export class ServiceController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  async findAll(
    @Query() pageOptionsSearchDto: PageOptionsSearchDto,
  ): Promise<PageDto<ServicesSection>> {
    return this.servicesService.findAllPaginated(pageOptionsSearchDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ServicesSection> {
    return this.servicesService.findByIdOrFail(id);
  }
}
