import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CctvModule } from './cctv/cctv.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      // Host dan port seringkali diabaikan jika menggunakan socket, tapi biarkan saja default
      host: 'localhost', 
      port: 3306,
      username: 'cakra', 
      password: 'cakra', 
      database: 'cakra',
      extra: {
        // INI ADALAH KUNCI RAHASIANYA: Memaksa lewat jalur Unix Socket aaPanel
        socketPath: '/tmp/mysql.sock', 
      },
      autoLoadEntities: true, 
      synchronize: false,
    }),
    CctvModule,
  ],
})
export class AppModule {}