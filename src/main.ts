import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Tambahkan baris ini untuk membuka gerbang CORS
  app.enableCors();

  await app.listen(process.env.PORT || 3030);
}
bootstrap();