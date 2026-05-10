# Skema Database CAKRA (CCTV Karesidenan Kediri)

Berikut adalah rancangan struktur *database* untuk aplikasi CAKRA. Diagram di bawah ini akan otomatis dirender oleh GitHub.

## 1. Entity Relationship Diagram (ERD)

```mermaid
erDiagram
    USERS {
        int id PK
        varchar username
        varchar password
        datetime created_at
    }

    CCTVS {
        int id PK
        varchar nama_cctv "Nama CCTV"
        text lokasi_alamat "Lokasi / Alamat"
        enum wilayah "Kediri, Kab-Kediri, Blitar, Kab-Blitar, Tulungagung, Kab-Tulungagung, Trenggalek, Kab-Trenggalek, Nganjuk, Kab-Nganjuk"
        varchar latitude "Latitude"
        varchar longitude "Longitude"
        varchar url_stream "URL Stream CCTV"
        enum status "Online, Offline"
        datetime created_at
        datetime updated_at
    }

    VISITOR_LOGS {
        int id PK
        varchar ip_address "Alamat IP Pengunjung"
        varchar action "Jenis Aksi (misal: Buka Peta, Putar Stream)"
        varchar user_agent "Info Browser/Perangkat"
        int cctv_id FK "Nullable: Untuk tracking CCTV mana yang sering dilihat"
        datetime accessed_at "Waktu aksi dilakukan"
    }

    USERS ||--o{ CCTVS : "mengelola"
    CCTVS ||--o{ VISITOR_LOGS : "dicatat riwayat aksesnya"
```

## 2. Rincian Tabel dan Tipe Data

### Tabel: users
Digunakan untuk menyimpan data administrator yang memiliki akses untuk mengelola data CCTV.
- `id` (int) - **Primary Key**
- `username` (varchar)
- `password` (varchar)
- `created_at` (datetime)

### Tabel: cctvs
Menyimpan data master titik lokasi CCTV dan link streaming-nya.
- `id` (int) - **Primary Key**
- `nama_cctv` (varchar) - Nama titik CCTV.
- `lokasi_alamat` (text) - Alamat lengkap lokasi.
- `wilayah` (enum) - Pilihan: Kediri, Kab-Kediri, Blitar, Kab-Blitar, Tulungagung, Kab-Tulungagung, Trenggalek, Kab-Trenggalek, Nganjuk, Kab-Nganjuk.
- `latitude` (varchar) - Koordinat garis lintang.
- `longitude` (varchar) - Koordinat garis bujur.
- `url_stream` (varchar) - Tautan ke stream CCTV (misal: RTSP atau HLS).
- `status` (enum) - Pilihan: Online, Offline.
- `created_at` (datetime)
- `updated_at` (datetime)

### Tabel: visitor_logs
Mencatat riwayat aktivitas pengguna publik yang mengakses situs CAKRA untuk keperluan analitik.
- `id` (int) - **Primary Key**
- `ip_address` (varchar) - Alamat IP pengunjung aplikasi.
- `action` (varchar) - Aksi spesifik (misal: "Buka Peta", "Putar Stream").
- `user_agent` (varchar) - Data browser atau perangkat keras pengunjung.
- `cctv_id` (int) - **Foreign Key** (Nullable). Merujuk ke cctvs.id untuk mengetahui CCTV mana yang sedang diputar.
- `accessed_at` (datetime) - Waktu log dicatat.