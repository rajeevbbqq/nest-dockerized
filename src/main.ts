import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const port = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(`Server running on port 127.0.0.1:${port}`);
  await app.listen(port);
}
bootstrap();
