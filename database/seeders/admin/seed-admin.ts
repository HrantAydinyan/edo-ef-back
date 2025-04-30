import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/modules/app/app.module';
import { AdminSeeder } from './admin.seeder';

async function bootstrap(): Promise<void> {
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const adminSeeder = appContext.get(AdminSeeder);
  await adminSeeder.create();
  await appContext.close();
}

void bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
