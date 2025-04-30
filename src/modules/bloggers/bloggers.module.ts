import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BloggersService } from './bloggers.service';
import { BloggersController } from './bloggers.controller';
import { BloggersSection } from './bloggers.entity';
import { AdminBloggersController } from './admin-bloggers.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BloggersSection])],
  controllers: [BloggersController, AdminBloggersController],
  providers: [BloggersService],
  exports: [BloggersService],
})
export class BloggersModule {}
