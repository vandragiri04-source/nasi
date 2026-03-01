# 🎨 Panduan Lengkap: Auto-Loading Gallery dari Instagram SMAN 33 Jakarta

Ini adalah panduan untuk mengintegrasikan carousel dengan foto dari Instagram SMAN 33 Jakarta secara **otomatis dan legal**.

## ⭐ Metode Rekomendasi (2026): Menggunakan Image URLs Langsung

Cara paling praktis untuk website sekolah resmi adalah menyimpan foto di folder lokal project.

### Langkah-langkah Setup:

#### 1️⃣ **Persiapan Foto**
```bash
1. Download 5-10 foto terbaik dari Instagram SMAN 33 Jakarta
2. Nama file: galeri1.jpg, galeri2.jpg, galeri3.jpg, dst
3. Ukuran optimal: 1200x900px atau 1080x810px
4. Format: JPG (untuk loading cepat)
5. Size: < 500KB per foto
```

#### 2️⃣ **Simpan Foto di Folder**
```
nasi/
├── images/
│   ├── galeri1.jpg
│   ├── galeri2.jpg
│   ├── galeri3.jpg
│   ├── galeri4.jpg
│   ├── galeri5.jpg
│   └── README.md
```

#### 3️⃣ **Carousel Otomatis Memuat**

File `js/script.js` sudah dikonfigurasi untuk:
- ✅ Membaca file dari folder `images/`
- ✅ Membuat slide otomatis
- ✅ Membuat dots navigation otomatis
- ✅ Auto-rotate setiap 7 detik
- ✅ Error handling jika foto tidak ditemukan

**DEFAULT CONFIGURATION** di `js/script.js`:
```javascript
carouselPhotos = [
    { url: 'images/galeri1.jpg', alt: 'Galeri SMAN 33 Jakarta 1' },
    { url: 'images/galeri2.jpg', alt: 'Galeri SMAN 33 Jakarta 2' },
    { url: 'images/galeri3.jpg', alt: 'Galeri SMAN 33 Jakarta 3' },
    { url: 'images/galeri4.jpg', alt: 'Galeri SMAN 33 Jakarta 4' },
    { url: 'images/galeri5.jpg', alt: 'Galeri SMAN 33 Jakarta 5' }
];
```

#### 4️⃣ **Jika Ingin Menambah Foto**

Contoh menambah foto ke 8 slide:

**Edit `js/script.js`:**
```javascript
carouselPhotos = [
    { url: 'images/galeri1.jpg', alt: 'Galeri SMAN 33 Jakarta 1' },
    { url: 'images/galeri2.jpg', alt: 'Galeri SMAN 33 Jakarta 2' },
    { url: 'images/galeri3.jpg', alt: 'Galeri SMAN 33 Jakarta 3' },
    { url: 'images/galeri4.jpg', alt: 'Galeri SMAN 33 Jakarta 4' },
    { url: 'images/galeri5.jpg', alt: 'Galeri SMAN 33 Jakarta 5' },
    { url: 'images/galeri6.jpg', alt: 'Galeri SMAN 33 Jakarta 6' },
    { url: 'images/galeri7.jpg', alt: 'Galeri SMAN 33 Jakarta 7' },
    { url: 'images/galeri8.jpg', alt: 'Galeri SMAN 33 Jakarta 8' }
];
```

**Simpan foto dengan nama yang sesuai:**
```
images/
├── galeri6.jpg ✅ Tambahan 6
├── galeri7.jpg ✅ Tambahan 7
└── galeri8.jpg ✅ Tambahan 8
```

**Carousel akan otomatis:**
- ✅ Membuat 8 slide
- ✅ Membuat 8 dots navigation
- ✅ Menampilkan "1 / 8" di counter
- ✅ Auto-rotate melalui semua slide

---

## 🔧 Metode Advanced: API Instagram (Jika Ada)

Untuk sekolah dengan Business Instagram Account:

### Setup dengan Instagram Graph API

**Requirements:**
- Business Instagram Account untuk SMAN 33 Jakarta
- Facebook Developer Account
- Access Token dari Meta Developers

### 1️⃣ **Dapatkan Access Token**

```
1. Buka https://developers.facebook.com
2. Buat app baru
3. Setup Instagram Basic Display API
4. Dapatkan Access Token untuk Business Account
5. Simpan di backend server
```

### 2️⃣ **Buat Backend Endpoint**

**Node.js + Express Example:**
```javascript
const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.get('/api/instafeed', async (req, res) => {
    const ACCESS_TOKEN = 'YOUR_ACCESS_TOKEN';
    const BUSINESS_ACCOUNT_ID = 'YOUR_ACCOUNT_ID';
    
    try {
        const response = await fetch(
            `https://graph.instagram.com/${BUSINESS_ACCOUNT_ID}/media?fields=id,caption,media_type,media_url,timestamp&access_token=${ACCESS_TOKEN}`
        );
        
        const data = await response.json();
        
        // Filter hanya photo dan video
        const filtered = data.data.filter(m => 
            m.media_type === 'IMAGE' || m.media_type === 'VIDEO'
        ).slice(0, 10); // Limit 10 posts
        
        res.json(filtered);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => {
    console.log('Instagram API Server running on port 3000');
});
```

### 3️⃣ **Update JavaScript untuk Fetch dari Backend**

**Edit `js/script.js`:**
```javascript
async function loadInstagramPhotos() {
    try {
        // Fetch dari backend API
        const response = await fetch('/api/instafeed');
        const data = await response.json();
        
        // Transform data Instagram ke format carousel
        carouselPhotos = data.map(post => ({
            url: post.media_url,
            alt: post.caption || 'Instagram Photo',
            link: `https://instagram.com/p/${post.id}`
        }));
        
        renderCarousel(carouselPhotos);
    } catch (error) {
        console.error('Error loading Instagram:', error);
        // Fallback ke folder images/
        loadLocalPhotos();
    }
}

async function loadLocalPhotos() {
    // Fallback ke local images
    carouselPhotos = [
        { url: 'images/galeri1.jpg', alt: 'Galeri SMAN 33 Jakarta 1' },
        { url: 'images/galeri2.jpg', alt: 'Galeri SMAN 33 Jakarta 2' },
        // ... dst
    ];
    renderCarousel(carouselPhotos);
}

loadInstagramPhotos();
```

---

## ⚠️ Metode yang TIDAK Direkomendasikan

### ❌ Auto Web Scraping Tanpa API

```javascript
// ❌ JANGAN GUNAKAN!
// Ini melanggar Instagram Terms of Service
const instagramUsername = 'sman33jakarta';
// ... scraping code - TIDAK LEGAL
```

**Alasan Larangan:**
- ❌ Melanggar Instagram ToS (Terms of Service)
- ❌ Instagram akan memblokir IP/akun
- ❌ Tidak sustainable (dapat berubah kapan saja)
- ❌ Risiko hukum untuk sekolah

---

## 📊 Fitur Carousel yang Tersedia

### ✨ Animasi & Effects
```
✅ Auto-rotate setiap 7 detik
✅ Previous/Next buttons dengan border gold
✅ Dots navigation (tap untuk pindah slide)
✅ Smooth fade animation
✅ Background pattern + yang mengalir
✅ Loading state yang elegant
✅ Error handling untuk missing photos
✅ Responsive design (mobile-friendly)
```

### 🎨 Warna Betawi (Kebaya Style)
```
🟢 Hijau Tua: #1B4D3E (Primary)
🟡 Kuning Emas: #FFD700 (Accent)
⚪ Putih: #FFFFFF (Slide Background)
🟤 Krem: #F5E6D3 (Info Area)

Border: Gold (#FFD700) - 4px
Buttons: Hijau dengan border gold
```

---

## 🚀 Checklist Implementasi

### Setup Dasar
- [ ] Folder `images/` sudah dibuat
- [ ] Download 5+ foto dari Instagram SMAN 33 Jakarta
- [ ] Rename file: galeri1.jpg, galeri2.jpg, dst
- [ ] Kompres foto ke < 500KB per file
- [ ] Copy foto ke folder `images/`
- [ ] Load website di browser
- [ ] Carousel tampil dengan foto
- [ ] Auto-rotate berjalan (7 detik)
- [ ] Dots navigation berfungsi
- [ ] Mobile responsive

### Kustomisasi (Optional)
- [ ] Tambah/kurangi jumlah foto
- [ ] Update deskripsi di `alt` text
- [ ] Ubah durasi auto-rotate (edit `7000` ms)
- [ ] Ubah warna background pattern
- [ ] Tambah caption pada slide

### Advanced (Jika Ada API)
- [ ] Setup Business Instagram Account
- [ ] Dapatkan Instagram Access Token
- [ ] Setup backend API endpoint
- [ ] Update JavaScript untuk fetch API
- [ ] Test auto-fetch dari Instagram
- [ ] Setup error fallback

---

## 🎯 Demo Penggunaan

### Contoh 1: Gallery dengan 5 Foto
```
🖼️ Slide 1 → Auto-rotate 7 detik → Slide 2 → ...
Dots: ● ○ ○ ○ ○
Counter: 1 / 5
```

### Contoh 2: Gallery dengan 10 Foto
```
🖼️ Slide 1 → Auto-rotate 7 detik → Slide 2 → ...
Dots: ● ○ ○ ○ ○ ○ ○ ○ ○ ○
Counter: 1 / 10
```

### Contoh 3: Manual Navigation
```
User klik →  (next button) → Slide berubah langsung
User klik dot ke-3 → Langsung ke Slide 3
User klik ← (prev button) → Kembali ke slide sebelumnya
```

---

## 📞 Troubleshooting

### ❓ Carousel tidak muncul
**Solusi:**
- Cek console browser (F12)
- Pastikan folder `images/` ada
- Pastikan file HTML sudah include `js/script.js`

### ❓ Foto tidak ditampilkan
**Solusi:**
- Cek path file (jangan ada spasi atau karakter khusus)
- File harus dalam folder: `images/galeri1.jpg`
- Pastikan file format JPG (bukan JPEG)
- Cek ukuran file (harus < 5MB)

### ❓ Auto-rotate tidak jalan
**Solusi:**
- Buka browser console (F12)
- Cek error message
- Pastikan `js/script.js` dimuat dengan benar
- Cek file `index.html` sudah include script

### ❓ Dots tidak berjumlah sesuai foto
**Solusi:**
- Periksa jumlah array di `carouselPhotos`
- Setiap foto harus ada entry dalam array
- Setiap entry harus memiliki `url` dan `alt`

---

## 📚 Referensi & Resources

- **Instagram Graph API**: https://developers.facebook.com/docs/instagram-graph-api
- **Meta Developers**: https://developers.facebook.com
- **Image Optimization**: https://squoosh.app
- **Compression Tools**: https://tinypng.com

---

**✍️ Dibuat: 2026**  
**Untuk: SMAN 33 Jakarta - Website Resmi**  
**Status: Production Ready** ✅
