import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { CONFIG_KEYS } from 'src/modules/common/constants/enums';
import { ValidationPipe } from '@nestjs/common';
import logsHelper from './modules/common/helpers/logs.helper';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'log', 'warn'],
    bufferLogs: true,
  });

  // app.useLogger(app.get(CustomeLogger));

  const configService = app.get<ConfigService>(ConfigService);

  app.setGlobalPrefix('api');

  // Enable this when connecting to the web interface. WEB_URL should be configured in .env file
  // app.enableCors({ origin: configService.get(CONFIG_KEYS.WEB_URL) });

  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: configService.get(CONFIG_KEYS.NODE_ENV) === 'production',
      whitelist: true,
      // transform: true,
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle(configService.get<string>(CONFIG_KEYS.SYSTEM_NAME))
    .setDescription(configService.get<string>(CONFIG_KEYS.SYSTEM_DESCRIPTION))
    .setVersion(configService.get<string>(CONFIG_KEYS.VERSION))
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/swagger', app, document);

  const port = configService.get<number>(CONFIG_KEYS.PORT);

  await app.listen(port);
  logsHelper.info(`The ${configService.get(CONFIG_KEYS.SYSTEM_NAME)} backend is listening on port ${configService.get(CONFIG_KEYS.PORT)}`, 'NestApplication');
}

bootstrap();
