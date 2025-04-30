import { NestFactory } from '@nestjs/core';
import { HeroSectionSeeder } from './hero-section.seeder';
import { AppModule } from 'src/modules/app/app.module';

async function bootstrap(): Promise<void> {
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const heroSectionSeeder = appContext.get(HeroSectionSeeder);
  await heroSectionSeeder.seed();
  await appContext.close();
}

void bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
