import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configurations from 'src/configurations';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dataSourceOptions } from 'database/ormconfig';
import { AdminModule } from '../admin/admin.module';
import { SeederModule } from 'database/seeders/seeder.modul';
import { AuthModule } from '../auth/auth.module';
import { PrivacyPolicyModule } from '../privacy-policy/privacy-policy.module';
import { HeroSectionModule } from '../hero-section/hero-section.module';
import { ServiceModule } from '../services/service.module';
import ServeStaticModule from 'src/common/static/module-definitions/serve-static.module';
import { ToolModule } from '../tools/tool.module';
import { TeamModule } from '../team/team.module';
import { BloggersModule } from '../bloggers/bloggers.module';
import { BlogsModule } from '../blogs/blogs.module';
import { EventsModule } from '../events/events.module';
import { EmailModule } from '../email/email.module';
import { ContactUsModule } from '../contact-us/contact-us.module';
import { ImprintModule } from '../imprint/imprint.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configurations],
    }),
    ServeStaticModule,
    TypeOrmModule.forRoot(dataSourceOptions),
    AdminModule,
    SeederModule,
    AuthModule,
    PrivacyPolicyModule,
    HeroSectionModule,
    ServiceModule,
    ToolModule,
    TeamModule,
    BloggersModule,
    BlogsModule,
    EventsModule,
    EmailModule,
    ContactUsModule,
    ImprintModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
