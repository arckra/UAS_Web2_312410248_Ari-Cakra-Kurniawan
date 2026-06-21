# 📦 E-Inventory — Sistem Inventaris Digital untuk UMKM

> Proyek UAS Mata Kuliah Web Programming 2 — Studi Kasus UMKM

---

## 📖 Deskripsi Proyek

**E-Inventory** adalah aplikasi web manajemen inventaris yang dirancang khusus untuk membantu **Data Warung Ari** dalam mengelola stok barang secara digital.

Selama ini, pencatatan stok di [nama warung] masih dilakukan secara manual menggunakan buku tulis, yang sering kali menyebabkan data tidak akurat dan sulit dipantau. Aplikasi ini hadir sebagai solusi nyata untuk mendigitalisasi proses tersebut.

**Fitur utama yang tersedia:**
- 🔐 Autentikasi dengan JWT Token (login & proteksi endpoint)
- 📊 Dashboard admin dengan ringkasan data inventaris
- 📦 Manajemen data produk/barang (tambah, edit, hapus)
- 📋 Manajemen kategori dan supplier
- 🔍 Pencarian dan filter data pada tabel
- 📈 Visualisasi data stok secara real-time

**Tech Stack:**
| Layer | Teknologi |
|---|---|
| Backend | CodeIgniter 4 (REST API) |
| Frontend | HTML + JS + TailwindCSS (SPA) |
| Database | MySQL (via phpMyAdmin) |
| Dev Environment | Laragon |

---

## 🗄️ Skema Relasi Database

Berikut adalah relasi antar tabel database pada proyek ini, didesain menggunakan fitur **Designer** di phpMyAdmin:

<img width="851" height="600" alt="image" src="https://github.com/user-attachments/assets/4df7558b-a175-43ea-90ea-41615ff17ed1" />


> *Tabel yang terlibat: `users`, `products`, `categories`, `suppliers`, `stock_in`, `stock_out` (sesuaikan dengan tabel yang kamu buat)*

---

## 🔒 Uji Coba Proteksi Token (Error 401)

Endpoint API pada proyek ini diproteksi menggunakan **JWT Bearer Token**. Berikut adalah hasil percobaan mengakses endpoint tanpa menyertakan token melalui Postman:

<img width="1708" height="784" alt="image" src="https://github.com/user-attachments/assets/b141f808-b31d-42b7-b55a-51947b39a025" />


> **Request:** `GET /api/products` tanpa header `Authorization: Bearer <token>`
> **Response:** `401 Unauthorized` — akses ditolak karena token tidak ditemukan.

---

## 🖥️ Screenshot Antarmuka Aplikasi

### Halaman Login
<img width="923" height="648" alt="image" src="https://github.com/user-attachments/assets/0032f049-9b1f-46ca-bf92-4f335ea94721" />


### Dashboard Admin
<img width="1899" height="895" alt="image" src="https://github.com/user-attachments/assets/d20b6a5b-481c-4158-9adb-d25d4bd37759" />


### Form Modal Tambah / Edit Data
<img width="783" height="717" alt="image" src="https://github.com/user-attachments/assets/5b53d4b2-3cab-4f07-aa3f-7ef6618e1deb" />


### Tabel Data dengan TailwindCSS
<img width="1617" height="558" alt="image" src="https://github.com/user-attachments/assets/0002377d-18cf-47d3-bd3a-7482cabd1ede" />


---

## ⚙️ Cara Instalasi & Menjalankan Proyek

### Prasyarat
Pastikan kamu sudah menginstal:
- [Laragon](https://laragon.org/) (sudah termasuk PHP 8.x, MySQL, Apache)
- [Node.js](https://nodejs.org/) v18+
- [Composer](https://getcomposer.org/)

---

### 🔧 Backend — CodeIgniter 4

```bash
# 1. Clone repositori ini
git clone https://github.com/arckra/UAS_Web2_312410248_Ari-Cakra-Kurniawan.git
cd project-uas/backend-api

# 2. Install dependency PHP
composer install

# 3. Salin file environment
cp env .env

# 4. Buka file .env dan sesuaikan konfigurasi database
#    CI_ENVIRONMENT = development
#    database.default.hostname = localhost
#    database.default.database = db_einventory
#    database.default.username = root
#    database.default.password =

# 5. Buat database di phpMyAdmin dengan nama: db_einventory
#    lalu jalankan migrasi
php spark migrate

# 6. (Opsional) Jalankan seeder untuk data awal
php spark db:seed DatabaseSeeder

# 7. Jalankan server backend
php spark serve
```

> Backend berjalan di: `http://localhost:8080`

---

### 🎨 Frontend — Vue.js 3 + TailwindCSS

```bash
# 1. Masuk ke folder frontend
cd project-uas/frontend-spa

# 2. Install dependency Node
npm install

# 3. Salin file environment
cp .env.example .env

# 4. Sesuaikan URL API di file .env
#    VITE_API_URL=http://localhost:8080/api

# 5. Jalankan development server
npm run dev
```

> Frontend berjalan di: `http://localhost:5500`

---

### 👤 Akun Default (Setelah Seeder)

| Role | Email | Password |
|---|---|---|
| Admin | admin@warung.com | admin123 |

---

## 🔗 Link Demo & Presentasi

| | Link |
|---|---|
| 🌐 **Demo Aplikasi** | [Klik di sini](https://[link-deploy-kamu].com) |
| 🎬 **Video Presentasi** | [Tonton di YouTube](https://youtube.com/[link-video-kamu]) |

---

## 👨‍💻 Identitas Mahasiswa

| | |
|---|---|
| **Nama** | Ari Cakra Kurniawan |
| **NIM** | 312410248 |
| **Kelas** | I241A |
| **Mata Kuliah** | Pemrograman Web 2 |
| **Dosen Pengampu** | Agung Nugroho S.Kom,. M.Kom. |

---

<p align="center">
  Dibuat dengan ☕ dan 💻 untuk keperluan UAS Web Programming 2
</p>
