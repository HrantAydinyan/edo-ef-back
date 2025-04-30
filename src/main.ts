import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as bodyParser from 'body-parser';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import rateLimit from 'express-rate-limit';

import { consoleInfo } from './utils';
import { AppModule } from './modules/app/app.module';

async function bootstrap(): Promise<NestExpressApplication> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  app.use(bodyParser.json({ limit: '100mb' }));
  app.use(bodyParser.urlencoded({ limit: '100mb', extended: false }));

  app.setGlobalPrefix('api');
  app.use(helmet());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  //TODO, choose good rate limit settings for production
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 10000, // limit each IP to 100 requests per windowMs
      message: 'Too many requests, please try again later.',
    }),
  );

  const configService = app.get(ConfigService);
  const port = configService.get('port');

  await app.listen(port);

  void consoleInfo(`Server running on ${await app.getUrl()}`);

  return app;
}
bootstrap();
