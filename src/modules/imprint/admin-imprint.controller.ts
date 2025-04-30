import {
  Controller,
  Put,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from '../auth/guards';
import { ImprintService } from './imprint.service';
import { UpdateImprintDto } from './dtos';
import { Imprint } from './imprint.entity';

@Controller('admin/imprint')
@UseGuards(AdminGuard)
export class AdminImprintController {
  constructor(private readonly imprintService: ImprintService) {}

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateImprintDto: UpdateImprintDto,
  ): Promise<Imprint> {
    return this.imprintService.update(id, updateImprintDto);
  }
}
