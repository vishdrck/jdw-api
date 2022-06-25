import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { CONFIG_KEYS } from 'src/constants/enums';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService>(ConfigService);

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
}
bootstrap();
