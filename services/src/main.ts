import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { exceptionFactory } from '@wire/core/exception';
import { TrimPipe } from '@wire/core/pipes';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  // app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new TrimPipe(),
    new ValidationPipe({
      transform: true,
      exceptionFactory,
    }),
  );
  await app.listen(3000);
}
bootstrap();
