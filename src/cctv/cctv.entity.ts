import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cctvs') // Harus sama persis dengan nama tabel di database
export class Cctv {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nama_cctv' })
  namaCctv: string;

  @Column({ name: 'lokasi_alamat', type: 'text', nullable: true })
  lokasiAlamat: string;

  @Column()
  wilayah: string;

  @Column({ nullable: true })
  latitude: string;

  @Column({ nullable: true })
  longitude: string;

  @Column({ name: 'url_stream', nullable: true })
  urlStream: string;

  @Column({ default: 'Online' })
  status: string;
}