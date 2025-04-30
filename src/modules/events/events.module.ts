import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { EventsSection } from './events.entity';
import { AdminEventsController } from './admin-events.controller';
import { BloggersModule } from '../bloggers/bloggers.module';

@Module({
  imports: [TypeOrmModule.forFeature([EventsSection]), BloggersModule],
  controllers: [EventsController, AdminEventsController],
  providers: [EventsService],
  exports: [EventsService],
})
export class EventsModule {}
