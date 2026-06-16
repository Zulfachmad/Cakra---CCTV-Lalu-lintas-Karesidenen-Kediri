import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Implementasi CORS untuk mengizinkan akses dari Frontend (Vue.js)
  app.enableCors({
    origin: '*', // Untuk tahap development awal, izinkan dari semua origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(3000);
  console.log('=== Server CAKRA Backend Running on http://localhost:3000 ===');
}
bootstrap();