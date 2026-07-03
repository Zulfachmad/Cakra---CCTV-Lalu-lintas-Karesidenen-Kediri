import { Controller, Get } from '@nestjs/common';
import { CctvService } from './cctv.service';

@Controller('api/cctv') // Akses lewat http://localhost:3000/api/cctv
export class CctvController {
  constructor(private readonly cctvService: CctvService) {}

  @Get()
  async getAllCctv() {
    const data = await this.cctvService.findAll();
    return {
      status: 'Sukses',
      jumlah_data: data.length,
      data: data,
    };
  }
}