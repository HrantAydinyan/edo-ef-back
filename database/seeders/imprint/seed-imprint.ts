import { NestFactory } from '@nestjs/core';
import { ImprintSeeder } from './imprint.seeder';
import { AppModule } from 'src/modules/app/app.module';

async function bootstrap(): Promise<void> {
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const imprintSeeder = appContext.get(ImprintSeeder);
  await imprintSeeder.seed();
  await appContext.close();
}

void bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
