import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { BlogsSection } from './blogs.entity';
import { AdminBlogsController } from './admin-blogs.controller';
import { BloggersModule } from '../bloggers/bloggers.module';

@Module({
  imports: [TypeOrmModule.forFeature([BlogsSection]), BloggersModule],
  controllers: [BlogsController, AdminBlogsController],
  providers: [BlogsService],
  exports: [BlogsService],
})
export class BlogsModule {}
