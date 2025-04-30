import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Imprint } from './imprint.entity';
import { ImprintController } from './imprint.controller';
import { AdminImprintController } from './admin-imprint.controller';
import { ImprintService } from './imprint.service';

@Module({
  imports: [TypeOrmModule.forFeature([Imprint])],
  controllers: [ImprintController, AdminImprintController],
  providers: [ImprintService],
  exports: [ImprintService],
})
export class ImprintModule {}
