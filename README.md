# Kalkulator Grid Martingale — Tunggak Semi

Kalkulator statis (HTML/CSS/JS, tanpa backend) untuk menghitung **lot**,
**floating loss (drawdown)**, dan **estimasi profit** sampai posisi ke-x,
mengikuti logika EA:

- Lot level ke-n = `Lot Awal × Pengali^(n-1)` (dibatasi oleh Batas Maksimal Lot bila diisi)
- Jarak antar level tetap dalam pips (`AddPositionPips`)
- Take Profit dihitung dari harga rata-rata (pips)
- Harga rata-rata dan harga TP dihitung berdasarkan harga perolehan posisi
  pertama, arah posisi (Buy/Sell), dan ukuran 1 pip yang Anda isi sendiri

Tidak ada kurva/grafik, hanya tabel angka per level sesuai permintaan.

## Isi folder

```
index.html      -> halaman kalkulator
manifest.json   -> agar bisa dipasang sebagai app/shortcut di HP (PWA)
sw.js           -> service worker, auto-update saat kode di GitHub berubah
icons/          -> ikon untuk shortcut layar utama
```

## Cara upload ke GitHub Pages

1. Buat repository baru di GitHub, misalnya `tunggaksemi-calculator`.
2. Upload semua isi folder ini (`index.html`, `manifest.json`, `sw.js`, folder `icons/`) ke root repository tersebut.
3. Buka **Settings → Pages** di repository.
4. Pada **Source**, pilih branch `main` dan folder `/ (root)`, lalu **Save**.
5. Tunggu 1–2 menit, GitHub akan memberi URL seperti:
   `https://<username>.github.io/tunggaksemi-calculator/`

Setiap kali Anda mengubah `index.html` (atau file lain) dan push ke GitHub,
halaman akan otomatis memakai versi terbaru saat dibuka kembali secara
online — tidak perlu menaikkan versi cache manual, karena service worker
memakai strategi *network-first* (selalu ambil dari internet dulu, cache
hanya cadangan saat offline).

## Cara menambahkan shortcut di HP

**Android (Chrome):**
1. Buka URL GitHub Pages di atas.
2. Ketuk menu titik tiga → **Tambahkan ke layar Utama** / **Instal aplikasi**.
   (Atau akan muncul tombol "Tambahkan ke Layar Utama" otomatis di halaman.)

**iPhone (Safari):**
1. Buka URL di Safari.
2. Ketuk tombol **Share/Bagikan** → **Tambah ke Layar Utama**.

Ikon kalkulator akan muncul di layar utama HP seperti aplikasi biasa, dan
terbuka tanpa address bar browser.

## Jika ikon shortcut tetap tidak muncul

1. Pastikan folder `icons/` beserta semua file di dalamnya (huruf besar/kecil
   harus persis sama) ikut ter-upload ke GitHub — cek langsung dengan membuka
   `https://<username>.github.io/<repo>/icons/icon-192.png` di browser HP;
   kalau muncul gambar ikon, filenya sudah benar.
2. Di HP, hapus dulu shortcut lama yang sudah kadung dibuat, lalu di Chrome
   buka **Settings → Site settings/Storage → cari domain github.io →
   Clear & reset** (atau hapus data situs) supaya service worker & cache
   lama yang mungkin sempat gagal ter-hapus bersih.
3. Buka lagi URL-nya, tunggu halaman termuat penuh (biarkan beberapa detik
   agar service worker & manifest selesai diproses), baru lakukan
   **Tambahkan ke Layar Utama**.
4. Di iPhone, ikon shortcut memakai `apple-touch-icon`, bukan `manifest.json`
   — pastikan `icons/icon-180.png` juga ikut ter-upload.

## Catatan

Nilai "Nilai per Pip untuk 1.0 Lot (USD)" harus disesuaikan sendiri dengan
spesifikasi kontrak instrumen/broker Anda — ini tidak bisa dipukul rata
untuk semua pair. Perhitungan di kalkulator ini murni simulasi teoretis
berdasarkan logika lot & jarak level EA; belum memperhitungkan spread,
swap, komisi, slippage, batas volume broker, atau margin call.
