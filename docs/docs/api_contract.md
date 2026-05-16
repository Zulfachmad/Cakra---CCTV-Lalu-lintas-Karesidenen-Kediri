Method   : GET 
Endopint : /api/cctv
Deskripsi: Digunakan untuk mengambil seluruh daftar titik kamera CCTV yang terintegrasi dari wilayah Kediri, Tulungagung, dan Blitar, termasuk koordinat lokasi untuk visualisasi pada peta.1

Method   : GET
Endopint : /api/cctv/{id}
Deskripsi: Berfungsi untuk mendapatkan detail spesifik dari satu kamera, termasuk tautan aliran video (stream URL) yang akan diproses oleh pemutar video di sisi pengguna.

Method   : GET
Endopint : /api/cctv/region/{region_name}
Deskripsi: Endpoint untuk memfilter data kamera berdasarkan wilayah administratif tertentu (misalnya Kediri saja), guna mendukung fitur filter wilayah pada antarmuka.

Method   : POST 
Endopint : /api/admin/login
Deskripsi: Digunakan untuk proses autentikasi administrator agar dapat mengakses panel kendali dan mengelola data infrastruktur secara aman.

Method   : PATCH
Endopint : /api/admin/cctv/status/{id}
Deskripsi: Digunakan oleh administrator untuk memperbarui status operasional kamera secara real-time (misalnya mengubah status menjadi aktif atau non-aktif) yang kemudian akan mengubah warna ikon pada peta.
