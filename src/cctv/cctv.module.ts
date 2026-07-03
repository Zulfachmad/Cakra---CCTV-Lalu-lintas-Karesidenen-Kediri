import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CctvController } from './cctv.controller';
import { CctvService } from './cctv.service';
import { Cctv } from './cctv.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cctv])], // Wajib ditambahkan
  controllers: [CctvController],
  providers: [CctvService],
})
export class CctvModule {}