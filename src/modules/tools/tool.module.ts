import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToolsService } from './tools.service';
import { ToolController } from './tool.controller';
import { ToolsSection } from './tools.entity';
import { AdminToolController } from './admin-tool.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ToolsSection])],
  controllers: [ToolController, AdminToolController],
  providers: [ToolsService],
  exports: [ToolsService],
})
export class ToolModule {}
