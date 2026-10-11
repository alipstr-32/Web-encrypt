# ALIP ENCRYPTOR - Public Web Version

Platform web profesional untuk mengenkripsi file (AES-256-GCM), mendekripsi file `.alipenc`, melakukan obfuscation kode sumber, dan pemrosesan batch secara aman langsung di browser Anda.

## Fitur Utama
1. **Universal File Encryption**: Enkripsi file apa pun (TXT, PDF, JPG, PNG, MP4, ZIP, dll.) menggunakan AES-256-GCM + PBKDF2/Web Crypto API.
2. **Secure Decryption**: Dekripsi file `.alipenc` dengan verifikasi integritas dan pemulihan nama asli.
3. **Code Obfuscator**: Melindungi kode sumber (JavaScript, HTML, CSS, Python, dll.) dengan engine transformasi dan minifikasi.
4. **Batch Processor**: Proses banyak file sekaligus.
5. **Local History**: Riwayat sesi aman yang disimpan secara lokal di browser Anda.

## Panduan Deployment Publik (Tanpa Termux)

### Cloudflare Pages / Vercel / Netlify:
1. Buat repositori baru di GitHub dan unggah seluruh file proyek ini.
2. Buka [Cloudflare Pages](https://pages.cloudflare.com/) atau [Vercel](https://vercel.com/).
3. Pilih **New Project** dan hubungkan repositori GitHub Anda.
4. Biarkan *Build Command* kosong (karena ini adalah situs statis murni) atau gunakan `npm run build`.
5. Tentukan *Output Directory* ke root (`/`).
6. Klik **Deploy** dan dapatkan URL HTTPS publik Anda secara instan!
