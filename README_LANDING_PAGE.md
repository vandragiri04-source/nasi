# Landing Page SMAN 33 Jakarta

Website landing page profesional untuk SMAN 33 Jakarta dengan informasi lengkap tentang sekolah, visi, misi, dan kontak.

## 📋 Struktur File

```
nasi/
├── index.html          # File HTML utama
├── css/
│   └── style.css      # Styling website
├── js/
│   └── script.js      # Interaktivitas & animasi
└── README.md          # Dokumentasi ini
```

## 🎨 Fitur Utama

### 1. **Navigation Bar (Menu Bar)**
   - Menu statis yang responsif
   - Hamburger menu untuk mobile
   - Navigation ke berbagai section:
     - Beranda (Home)
     - Tentang Kami (About)
     - Visi & Misi (Vision & Mission)
     - Kontak (Contact)

### 2. **Hero Section**
   - Banner utama dengan background gradient
   - Call-to-action button
   - Deskripsi singkat sekolah

### 3. **About Section (Tentang Kami)**
   - Informasi lengkap tentang SMAN 33 Jakarta
   - 3 kartu fitur utama:
     - Pendidikan Berkualitas
     - Fasilitas Modern
     - Komunitas Solid

### 4. **Vision & Mission Section (Visi & Misi)**
   - **Visi**: Deskripsi tujuan jangka panjang sekolah
   - **Misi**: 5 poin misi detail untuk mencapai visi
   - Kartu interaktif dengan hover effect

### 5. **Gallery/Slideshow Section (Galeri)**
   - Auto-rotating carousel dengan 5 slide
   - Navigasi dengan tombol next/prev dan dots
   - Placeholder untuk foto Instagram
   - Auto-rotate setiap 7 detik
   - Warna background khas Betawi (merah bata & emas)

### 6. **Contact Section (Kontak)**
   - Informasi kontak:
     - Alamat
     - Nomor Telepon
     - Email
   - Background gradient yang menarik

### 6. **Footer**
   - Copyright information
   - Link permanent footer

## 🎯 Teknologi yang Digunakan

- **HTML5**: Struktur semantik
- **CSS3**: Styling modern dengan:
  - CSS Grid & Flexbox
  - Gradient backgrounds
  - Tranisition & Transform effects
  - Media queries untuk responsif
- **JavaScript**: Interaktivitas:
  - Mobile menu toggle
  - Smooth scroll navigation
  - Scroll animations
  - Intersection Observer API

## 📱 Responsive Design

Website ini fully responsive dan mendukung:
- **Desktop** (1200px+)
- **Tablet** (768px - 1199px)
- **Mobile** (< 768px)

Mobile menu (hamburger) otomatis aktif pada layar kecil.

## 🎨 Warna & Design

- **Warna Utama**: #1B4D3E (Hijau Tua Betawi) - Warna khas Kebaya Betawi
- **Warna Sekunder**: #FFD700 (Emas Kuning Betawi)
- **Warna Aksen**: #DC143C (Merah)
- **Warna Latar**: #F5E6D3 (Krem Betawi)
- **Font**: Segoe UI, sans-serif
- **Design**: Palet tradisional Betawi Rumah Kebaya yang modern, Professional, elegant

**Inspirasi Warna**: Rumah Kebaya Betawi dengan dominasi warna hijau gelap dan aksen kuning emas, mencerminkan kekayaan budaya dan keanggunan arsitektur tradisional Betawi.

### ✨ Fitur Animasi
- **Background Pattern**: Animasi bergerak berbentuk **+** (plus) yang mengalir dinamis
- **Loading Animation**: Spinner elegan saat memuat galeri
- **Interactive Buttons**: Hover effects yang responsif dengan warna Betawi

### 🖼️ Carousel/Gallery
- **Auto-Loading**: Otomatis memuat foto dari folder `/images/`
- **Auto-Rotate**: Carousel berputar setiap 7 detik
- **Manual Navigation**: Tombol prev/next dan dots untuk navigasi manual
- **Error Handling**: Jika foto tidak ditemukan, tetap menampilkan placeholder yang elegant
- **Counter**: Menampilkan posisi slide (1/5, 2/5, dst)

## 🚀 Cara Menggunakan

1. **Buka file `index.html`** di browser Anda
2. **Navigasi** menggunakan menu bar
3. **Mobile**: Tekan hamburger menu (≡) untuk membuka menu

## ✏️ Kustomisasi

Untuk menyesuaikan konten:

### Mengubah Nama Sekolah
- Edit di navbar dan hero section di `index.html`

### Mengubah Informasi Kontak
- Edit section **Hubungi Kami** di `index.html`
  - Alamat
  - Telepon
  - Email

### Mengubah Warna
- Edit variable di `:root` di `css/style.css`:
  ```css
  --primary-color: #C8573B;        /* Warna merah bata (utama) */
  --secondary-color: #D4AF37;      /* Warna emas */
  --accent-color: #8B0000;         /* Warna merah tua */
  --betawi-cream: #F5E6D3;         /* Warna krem */
  ```

### ⭐ Mengintegrasikan Foto dari Instagram SMAN 33 Jakarta

#### Opsi 1: Manual Download (Paling Mudah)
1. Buka Instagram SMAN 33 Jakarta
2. Download foto berkualitas tinggi yang ingin ditampilkan
3. Simpan di folder `images/` di direktori project
4. Update HTML di section slideshow:
   ```html
   <div class="carousel-slide">
       <img src="images/foto1.jpg" alt="Foto Galeri">
   </div>
   ```

#### Opsi 2: Menggunakan JavaScript untuk Load Image URL
Jika Anda memiliki akses ke Instagram API (Business Account):
1. Dapatkan access token dari Meta/Instagram Developers
2. Modifikasi `js/script.js` untuk fetch foto:
   ```javascript
   // Contoh struktur (memerlukan backend API)
   fetch('YOUR_API_ENDPOINT/instagram-photos')
       .then(response => response.json())
       .then(data => {
           // Update carousel dengan data foto
       });
   ```

#### Opsi 3: Menggunakan Web Scraper (dengan Hati-hati)
**⚠️ Instagram memiliki Terms of Service yang melarang scraping otomatis!**

Alternatif legal:
- Gunakan Instagram Embedded Posts (Official)
- Minta izin langsung ke SMAN 33 Jakarta
- Gunakan Official Instagram API dengan Business Account

#### Cara Menambah Slide Baru
1. Tambah `<div class="carousel-slide">` baru di HTML
2. Tambah `<span class="dot">` di carousel-dots
3. Foto akan otomatis terintegrasi dengan carousel

**Struktur HTML untuk Slide Baru:**
```html
<div class="carousel-slide">
    <img src="path/ke/foto.jpg" alt="Deskripsi Foto">
</div>
```

**Tambah Dot Navigation:**
```html
<span class="dot" onclick="currentSlide(5)"></span>
```

**Update counter di HTML:**
Ubah `5` dalam `<span id="slide-counter">1 / 5</span>` sesuai jumlah slide

### Menambah Konten
- Tambahkan section baru dengan struktur `<section>` dan class yang sesuai
- Update navigation menu di navbar

## 📞 Kontak Information

Harap perbarui informasi kontak berikut di `index.html`:
- Alamat: Jakarta, Indonesia
- Telepon: +62 (0)21 XXXX XXXX
- Email: info@sman33jakarta.sch.id

## 📝 Catatan Pengembangan

- Font awesome icons digunakan dari CDN eksternal
- Pastikan koneksi internet tersedia untuk load icons
- Dapat diganti/diunduh lokal jika diperlukan offline

## 📄 Lisensi & Hak Cipta

### ©️ Hak Cipta Resmi SMAN 33 Jakarta

```
© 2026 SMAN 33 Jakarta. Semua hak dilindungi.

Jl. Kamal Raya No. 54
Cengkareng Barat, Jakarta Barat 11730
Jakarta, Indonesia

Website Resmi SMAN 33 Jakarta
Dikembangkan dengan dedikasi untuk pendidikan berkualitas
```

### Lisensi Konten
- ✅ **Website**: Milik resmi SMAN 33 Jakarta
- ✅ **Foto & Galeri**: Hak cipta SMAN 33 Jakarta
- ✅ **Konten Edukatif**: Dikembangkan untuk kepentingan sekolah
- ✅ **Penggunaan Public**: Untuk tujuan informasi dan edukasi masyarakat

### 📋 Ketentuan Penggunaan
- Konten dapat digunakan untuk keperluan resmi sekolah
- Foto tidak boleh diproyek ulang tanpa izin tertulis
- Penyimpanan data siswa sesuai dengan kebijakan keamanan sekolah

---

**Dibuat dengan ❤️ untuk SMAN 33 Jakarta**
