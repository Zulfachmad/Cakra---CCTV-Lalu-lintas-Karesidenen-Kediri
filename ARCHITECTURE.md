# Dokumentasi Arsitektur Proyek CAKRA
(CCTV Lalu-lintas Karesidenen Kediri)

## 1. Pola Arsitektur Utama
Proyek ini mengimplementasikan pola **MVC (Model-View-Controller)** yang dimodifikasi menjadi arsitektur terpisah (Decoupled Architecture) antara layanan Backend dan Frontend.
- **Backend:** Menggunakan kerangka kerja **NestJS** dengan arsitektur modular.
- **Frontend:** Menggunakan kerangka kerja **Vue.js** berbasis komponen.

## 2. Implementasi Komponen MVC
Pemisahan tanggung jawab dalam kode kita diatur sebagai berikut:

*   **Model (Data & Logika Bisnis):** 
    Dikelola oleh Backend (NestJS) pada bagian `Service` (contoh: `user.service.ts`). Bagian ini bertanggung jawab langsung untuk berkomunikasi dengan database dan menjalankan aturan bisnis aplikasi.
*   **View (Antarmuka Pengguna):** 
    Dikelola sepenuhnya oleh Frontend (Vue.js). File HTML/CSS dan reaktivitas data berada di dalam komponen Vue (folder `frontend/src/views/` dan `frontend/src/components/`).
*   **Controller (Lalu Lintas Data):** 
    Dikelola oleh Backend (NestJS) pada bagian `Controller` (contoh: `user.controller.ts`). Bertugas menerima *HTTP Request* dari Frontend (View), mengirimkannya ke *Service* (Model), dan mengembalikan *HTTP Response*.

## 3. Struktur Folder Utama
```text
/ (Root)
├── src/                 # Folder utama Backend (NestJS - Controller & Model)
│   └── [nama_fitur]/    # Modul fitur (berisi .controller.ts dan .service.ts)
├── frontend/            # Folder utama Frontend (Vue.js - View)
│   ├── src/views/       # Halaman utama aplikasi
│   └── src/components/  # Potongan antarmuka (tombol, card, dll)
├── ARCHITECTURE.md      # Panduan arsitektur proyek
└── package.json         # Konfigurasi dependensi
