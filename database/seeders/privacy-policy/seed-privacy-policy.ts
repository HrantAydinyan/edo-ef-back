import { NestFactory } from '@nestjs/core';
import { PrivacyPolicySeeder } from './privacy-policy.seeder';
import { AppModule } from 'src/modules/app/app.module';

async function bootstrap(): Promise<void> {
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const privacyPolicySeeder = appContext.get(PrivacyPolicySeeder);
  await privacyPolicySeeder.seed();
  await appContext.close();
}

void bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
