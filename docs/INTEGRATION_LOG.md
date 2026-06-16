# INTEGRATION LOG - CAKRA CCTV
**Dokumen Evaluasi Integrasi Frontend dan Backend (Tahap 1)**

**Tanggal:** 16 Juni 2026  
**Topik Diskusi:** "Apakah ada kendala keamanan saat membuka akses CORS (Cross-Origin Resource Sharing)?"

---

## 1. Latar Belakang & Konfigurasi Saat Ini
Dalam proses integrasi awal antara antarmuka Vue.js dan server NestJS, tim pengembang menyepakati untuk membuka gerbang CORS secara penuh pada sisi backend. Konfigurasi yang saat ini diterapkan pada `src/main.ts` adalah sebagai berikut:

```typescript
app.enableCors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
});
