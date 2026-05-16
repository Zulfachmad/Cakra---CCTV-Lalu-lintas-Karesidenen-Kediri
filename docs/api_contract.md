GET
/api/cctv
Digunakan untuk mengambil seluruh daftar titik kamera CCTV yang terintegrasi dari wilayah Kediri, Tulungagung, dan Blitar, termasuk koordinat lokasi untuk visualisasi pada peta.

GET
/api/cctv/{id}
Berfungsi untuk mendapatkan detail spesifik dari satu kamera, termasuk tautan aliran video (stream URL) yang akan diproses oleh pemutar video di sisi pengguna.

GET
/api/cctv/region/{region_name}
Endpoint untuk memfilter data kamera berdasarkan wilayah administratif tertentu (misalnya Kediri saja), guna mendukung fitur filter wilayah pada antarmuka.

POST
/api/admin/login
Digunakan untuk proses autentikasi administrator agar dapat mengakses panel kendali dan mengelola data infrastruktur secara aman.

PATCH
/api/admin/cctv/status/{id}
Digunakan oleh administrator untuk memperbarui status operasional kamera secara real-time (misalnya mengubah status menjadi aktif atau non-aktif) yang kemudian akan mengubah warna ikon pada peta.
