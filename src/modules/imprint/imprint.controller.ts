import { Controller, Get } from '@nestjs/common';
import { ImprintService } from './imprint.service';
import { Imprint } from './imprint.entity';

@Controller('imprint')
export class ImprintController {
  constructor(private readonly imprintService: ImprintService) {}

  @Get()
  findSingle(): Promise<Imprint> {
    return this.imprintService.findSingle();
  }
}
