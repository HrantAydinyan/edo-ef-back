import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicesService } from './services.service';
import { ServiceController } from './service.controller';
import { ServicesSection } from './services.entity';
import { AdminServiceController } from './admin-service.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ServicesSection])],
  controllers: [ServiceController, AdminServiceController],
  providers: [ServicesService],
  exports: [ServicesService],
})
export class ServiceModule {}
