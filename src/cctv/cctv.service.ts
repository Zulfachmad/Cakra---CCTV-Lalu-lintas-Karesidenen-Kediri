import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cctv } from './cctv.entity';

@Injectable()
export class CctvService {
  constructor(
    @InjectRepository(Cctv)
    private cctvRepository: Repository<Cctv>,
  ) {}

  // Fungsi untuk mengambil semua data CCTV
  async findAll(): Promise<Cctv[]> {
    return this.cctvRepository.find();
  }
}