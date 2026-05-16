# Dokumentasi Arsitektur Proyek CAKRA
*(CCTV Lalu-lintas Karesidenen Kediri)*

## 1. Pola Arsitektur Utama
Proyek ini mengimplementasikan pola **MVC (Model-View-Controller)** yang dimodifikasi menjadi arsitektur terpisah (*Decoupled Architecture* / *Monorepo*) antara layanan Backend dan Frontend.
- **Backend:** Menggunakan kerangka kerja **NestJS** dengan arsitektur modular.
- **Frontend:** Menggunakan kerangka kerja **Vue.js** berbasis komponen.

## 2. Implementasi Komponen MVC
Pemisahan tanggung jawab dalam basis kode diatur sebagai berikut:

*   **Model (Data & Logika Bisnis):** 
    Dikelola oleh Backend (NestJS) pada bagian `Service` (contoh: `user.service.ts`). Bagian ini bertanggung jawab langsung untuk berkomunikasi dengan *database*, memproses data, dan menjalankan aturan bisnis aplikasi.
*   **View (Antarmuka Pengguna):** 
    Dikelola sepenuhnya oleh Frontend (Vue.js). File HTML/CSS, aset statis, dan reaktivitas data berada di dalam ekosistem Vue (folder `frontend/src/views/`, `frontend/src/components/`, dan `frontend/public/`).
*   **Controller (Lalu Lintas Data):** 
    Dikelola oleh Backend (NestJS) pada bagian `Controller` (contoh: `user.controller.ts`). Bertugas menerima *HTTP Request* dari Frontend (View), mengirimkannya ke Service (Model), dan mengembalikan *HTTP Response* yang sesuai.

## 3. Struktur Folder Utama
```text
CAKRA-Repo/ (Root)
├── src/                 # [BACKEND] Folder utama NestJS (Controller & Model)
│   ├── user/            # Modul fitur (berisi .controller.ts dan .service.ts)
│   ├── app.module.ts    # Root module pembungkus aplikasi
│   └── main.ts          # Entry point backend
├── frontend/            # [FRONTEND] Folder utama Vue.js (View)
│   ├── public/          # Aset statis (Gambar, favicon, dsb)
│   └── src/             
│       ├── views/       # Komponen halaman utama (Pages)
│       └── components/  # Potongan antarmuka (Tombol, Card, Navbar, dll)
├── ARCHITECTURE.md      # Panduan arsitektur proyek
└── package.json         # Konfigurasi dependensi Backend & Root
```

## 4. Strategi Branching & Git Flow
Proyek ini menggunakan alur kerja berbasis *Branching* untuk menjaga stabilitas kode. Semua *developer* dilarang melakukan *Push* langsung ke branch `main`.

| Nama Branch | Tipe | Fungsi / Tujuan | Aturan Merge |
| :--- | :---: | :--- | :--- |
| **`main`** | *Production* | Versi final aplikasi yang stabil dan siap rilis (*deploy*). Tidak boleh ada *error* atau *bug* kritis. | Hanya menerima *Merge* dari branch `development`. |
| **`development`** | *Staging* | Jalur integrasi utama. Tempat bertemunya fitur-fitur baru dari *backend* dan *frontend* untuk diuji coba bersama. | Menerima *Pull Request* (PR) dari branch `feat-*`. |
| **`feat-*`** <br>*(contoh: feat-be-structure)* | *Feature* | Area kerja individu untuk *developer*. Digunakan untuk membuat fitur baru, merombak struktur, atau memperbaiki *bug*. | Dibuat dari `development`, dan di-*Merge* kembali ke `development` via PR. |
