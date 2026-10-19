# Projects Spec (revisi 3 — dieksekusi)

## Perubahan besar
1. **Tombol carousel pindah ke BAWAH gambar** (di dalam kolom kanan, di bawah track carousel). Prev/next + counter.
2. **Klik gambar/foto card → popup modal** berisi: nama project, teks deskripsi, tech stack, button "GitHub" (repoUrl) + "Menuju Web" (demoUrl). Modal overlay netral, bisa ditutup dengan X / klik luar / Escape.
3. **Button "Lihat Semua Proyek"** di kolom kiri (bawah deskripsi). Klik → section membesar (mode expanded): kolom kanan berubah jadi grid semua project (2 kolom), tiap item bisa diklik → popup sama. Button berubah jadi "Tutup".
4. Modal TANPA shadow/gradient. Scrim hitam tipis di atas foto tetap (satu-satunya scrim).

## Data backend
- `image`, `demoUrl`, `repoUrl` sudah ditambah di types + seed db.js (sebelumnya). Jika `image` kosong → bg abu polos.
