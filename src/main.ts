import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

const port = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ---- Validation Pipe ------
  app.useGlobalPipes(
    new ValidationPipe({
      forbidUnknownValues: true,
      stopAtFirstError: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    }),
  );

  // ---- Open API config for Swagger ------
  const config = new DocumentBuilder()
    .setTitle('Mars API Services')
    .setDescription(
      'Mars API Services. \n For invoking APIs, use Bearer token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoibWFyc19kZXYiLCJpYXQiOjE2OTE3ODMxODAsImV4cCI6MTcyMzMxOTE4MH0.H0oDr2URlf4gIY7L064l4l5hjEZJVdNZCockfHvH7Fc',
    )
    .setVersion('1.0')
    .addTag('posts')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);

  console.log(`Server running on port 127.0.0.1:${port}`);
  console.log(`Swagger doc running on port 127.0.0.1:${port}/documentation`);
  await app.listen(port);
}
bootstrap();
