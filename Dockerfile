# Gunakan image Node.js versi LTS (Debian-based) untuk stabilitas dan kompatibilitas maksimal
FROM node:20

# Set direktori kerja di dalam container
WORKDIR /app

# Salin file dependensi dan install
COPY package*.json ./
RUN npm install

# Salin seluruh source code backend
COPY . .

# Build aplikasi NestJS
RUN npm run build

# ==========================================
# TUGAS BACKEND: Deklarasi Environment Variable
# ==========================================
ENV PORT=3000
ENV DB_HOST=localhost
ENV DB_PORT=3306
ENV DB_USER=root
ENV DB_PASSWORD=
ENV DB_NAME=cakra_db
ENV JWT_SECRET=supersecretkey

# Buka port untuk akses dari luar container
EXPOSE 3000

# Perintah untuk menjalankan server di production mode
CMD npm run start:prod