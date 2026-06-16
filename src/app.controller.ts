import { Controller, Get } from '@nestjs/common';

@Controller('api') // Menambahkan awalan /api
export class AppController {
  
  @Get('status') // Ini akan menjadi endpoint GET /api/status
  getStatus() {
    return {
      status: 'success',
      message: 'CORS berhasil dibuka! Backend CAKRA siap menerima request dari Frontend.',
      data: {
        versi: '1.0',
        proyek: 'Sistem CCTV Lalu-lintas CAKRA'
      }
    };
  }
}