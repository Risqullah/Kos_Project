# Modern Espresso Minimalist Design System

## Overview
Modern Espresso Minimalist adalah sistem desain yang menggabungkan kehangatan warna kopi (CafeBlend) dengan ketegasan struktur geometris modern yang bersih (terinspirasi dari QuestUI). Desain ini meninggalkan efek neumorphism yang tebal dan beralih ke layout berlapis yang *simple*, sudut kartu bersudut tegas, garis batas tipis yang tajam, serta warna latar belakang kopi gelap (*Dark Espresso*) yang eksklusif dan "cool" untuk mengedepankan kesan premium.

---

## Colors

### Light Mode Tones (Default)
- **Primary Coffee** (#8B5E3C): Aksen utama, tombol CTA, highlight
- **Secondary Amber** (#C4956A): Tag dekoratif, border aksen, hover tint
- **Tertiary Cream** (#FDF6EC): Latar belakang halaman publik (warm cream)
- **Surface Light** (#FFFFFF): Permukaan kartu, panel putih bersih
- **Border Light** (#EAE0D5): Garis batas tipis default

### Cool Dark Espresso Tones (Untuk Dashboard & Area Eksklusif)
- **Background Dark** (#120907): Latar belakang hitam kopi pekat (Espresso)
- **Surface Dark** (#1D110E): Permukaan kartu gelap
- **Border Dark** (#2E1E1A): Garis batas tipis gelap
- **Text Parchment** (#F4EBE1): Warna teks krem lembut (menggantikan putih murni agar tidak merusak mata)

### Status Semantic Colors
- **Success** (#059669): Kamar tersedia, transaksi sukses
- **Warning** (#D97706): Jatuh tempo sewa, pending
- **Danger** (#EF4444): Kerusakan parah, reservasi ditolak
- **Info** (#6366F1): Informasi penting, pemeliharaan

---

## Typography

- **Headline Font**: DM Serif Display (kesan mewah dan inscribed)
- **Body Font**: Barlow / Work Sans (kesan modern, terbaca jelas)
- **Mono Font**: Fira Code / IBM Plex Mono (untuk kode kamar, nominal uang)

- **h1 / H1**: DM Serif Display, tebal, bersudut tegas.
- **body**: Barlow/Work Sans, nyaman dibaca untuk deskripsi panjang.
- **small / uppercase**: Digunakan untuk chip, badge, dan label kecil dengan letter-spacing renggang (`tracking-wider`) untuk memberi kesan presisi.

---

## Spacing & Geometry
- **Sudut (Border Radius)**:
  - **Cards & Modals**: `12px` (rounded-xl) atau `16px` (rounded-2xl) untuk tampilan clean.
  - **Buttons & Inputs**: `6px` (rounded-md) atau `8px` (rounded-lg) untuk ketegasan visual.
  - **Badges / Toggles**: `4px` atau `full` (pill shape).
- **Garis Batas (Borders)**: Selalu gunakan ketebalan `1px` yang solid dengan kontras rendah. Hindari border tebal.

---

## Elevation & Effects
- **Glow Shadow**: Menggunakan efek glow tipis berwarna kopi/emas (`shadow-[0_0_15px_rgba(139,94,60,0.15)]`) pada elemen terpilih atau hover state.
- **Border Aksen**: Kartu penting diberi aksen border atas setebal `2px` menggunakan warna `--color-primary` untuk menegaskan kepentingan konten.
- **Transitions**: Transisi efek hover dilakukan secara halus selama `200ms` s.d `300ms`.

---

## Do's and Don'ts

1. **Do** gunakan garis batas tipis `1px` daripada shadow neumorphic yang kabur untuk kesan modern.
2. **Do** gunakan font serif DM Serif Display hanya untuk heading besar; gunakan sans-serif untuk isi teks agar mudah dibaca.
3. **Do** gunakan aksen warna kopi gelap (#1D110E) sebagai surface utama di dashboard agar kontras dan terasa "cool".
4. **Don't** gunakan warna putih murni (#FFFFFF) sebagai teks di background gelap; gunakan warna krem lembut (#F4EBE1).
5. **Don't** gunakan sudut melingkar terlalu besar (seperti `rounded-full` pada kartu) yang membuat antarmuka terasa kekanak-kanakan.
