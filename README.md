Judul Project : Cakra | Lalu Lintas Karesidenan Kediri

Pembagian Peran :
- Zulfa Nur Achmad Baihaqi (Product Lead) | Bertanggung jawab atas alur kerja Git, dokumentasi, dan jadwal.
- Ilham Dimas Ramadhan (Backend Developer) | Fokus pada logika server dan database.
- Bagas Darma Saputra (Frontend Developer) | Fokus pada antarmuka pengguna (UI/UX).
  
Deskripsi proyek : Aplikasi pemantauan CCTV lalu lintas real-time se-Karisidenan Kediri yang menyatukan data streaming terpisah dari wilayah Kediri, Tulungagung, dan Blitar ke dalam satu platform terpadu berbasis Progressive Web App (PWA). Aplikasi ini mengusung tampilan peta yang bersih (Clean Map UI) untuk membuang elemen tidak penting agar pengendara bisa fokus melihat rute jalan dan status operasional kamera secara instan. Karena dikembangkan dengan teknologi PWA, sistem ini sangat ringan, tidak menghabiskan memori penyimpanan HP, dan dioptimasi menggunakan Service Worker supaya tetap responsif serta stabil saat menampilkan aliran video bahkan ketika sinyal internet di perjalanan naik-turun.

## Daftar Image Container Registry (GHCR)
Proyek ini menggunakan GitHub Packages untuk menyimpan image produksi resmi agar aplikasi dapat langsung dijalankan tanpa perlu proses build ulang secara lokal:
* **Backend API (NestJS):** `ghcr.io/zulfachmad/cakra-be:v1.0.0`
* **Frontend UI (Vue.js):** `ghcr.io/zulfachmad/cakra-fe:v1.0.0`
