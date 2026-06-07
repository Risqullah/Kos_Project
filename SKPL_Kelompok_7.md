Template
Spesifikasi Kebutuhan Perangkat Lunak (SKPL)
Nomor Dokumen: FO SE 1.0 Revisi No.: 02
Berlaku Sejak: 12 Maret 2018 Halaman: 1 dari 23
Jl. Umbansari 1 Rumbai, Pekanbaru 28265 – Riau. Telp: 0761-53939, Fax: 0761-

SPESIFIKASI KEBUTUHAN
PERANGKAT LUNAK
Di siapkan oleh:
M.Risqullah (2455301097)
M. Ikhsan Dwi Putra (2455301121)
Hanif Andika Hizamil Putra (2455301079)
Abstrak:
Dokumen ini menyediakan spesifikasi standar untuk Sistem Manajemen
Eternal Kost. Sistem ini adalah sebuah platform berbasis website responsif
yang mengubah proses manajemen konvensional menjadi digital,
bertindak sebagai pusat informasi, sistem reservasi online , serta
dashboard pengelolaan bagi pemilik kos.
Seluruh isi dan informasi pada template merupakan milik Program Studi Teknik Informatika (PSTI) PCR dan
bersifat rahasia. Dilarang menyalin dan memperbanyak dokumen ini tanpa diketahui oleh PSTI-PCR, kecuali
ada ijin tertulis dari PSTI-PCR.
Template
Spesifikasi Kebutuhan Perangkat Lunak (SKPL)
Nomor Dokumen: FO SE 1.0 Revisi No.: 02
Berlaku Sejak: 12 Maret 2018 Halaman: 2 dari 23
Jl. Umbansari 1 Rumbai, Pekanbaru 28265 – Riau. Telp: 0761-53939, Fax: 0761-

Informasi Tentang Template
Spesifikasi Kebutuhan Perangkat Lunak
Program Studi Teknik Informatika – PCR
Informasi template Spesifikasi Kebutuhan Perangkat Lunak
Pemilik
Dokumen
Program Studi Teknik Informatika Politeknik Caltex Riau
Penanggung
Jawab Dokumen
**1. M.Risqullah (2455301097)

M. Ikhsan Dwi Putra (2455301121)
Hanif Andika Hizamil Putra (2455301079)
Pendistribusian
Dokumen
Laporan Kegiatan Pengembangan Sistem Manajemen Kos
Histori Dokumen Release**^ V.1.^
Copyright Copyright^ @^2023 Prodi^ TI^ PCR^
Seluruh informasinya adalah hak milik Prodi TI PCR yang tidak
dipulikasikan dan bersifat rahasia.
Seluruh isi dan informasi pada template merupakan milik Program Studi Teknik Informatika (PSTI) PCR dan
bersifat rahasia. Dilarang menyalin dan memperbanyak dokumen ini tanpa diketahui oleh PSTI-PCR, kecuali
ada ijin tertulis dari PSTI-PCR.
SPESIFIKASI KEBUTUHAN PERANGKAT LUNAK
SISTEM MANAJEMEN KOST (ETERNAL KOST)
SIMAKO
22 Mei 2026 DRAF
Disiapkan:
M.Risqullah (2455301097)
M. Ikhsan Dwi Putra (2455301121)
Hanif Andika Hizamil Putra (2455301079)
sebagai kelengkapan Praktikum Rekayasa Perangkat Lunak 2 di
Prodi Teknik Informatika-PCR
Abstrak:
Dokumen ini berisi spesifikasi kebutuhan perangkat lunak untuk
pengembangan website reservasi kos online "Eternal Kost".
Dokumen ini mendefinisikan kebutuhan fungsional dan
non-fungsional, antarmuka, serta fitur-fitur sistem yang akan
dibangun menggunakan metode Agile Scrum. Sistem ini bertujuan
untuk mendigitalisasi manajemen kos, menyediakan informasi
real-time kepada calon penghuni, serta memudahkan proses
reservasi dan pengelolaan data bagi pemilik kos.
Seluruh isi dan informasi pada template merupakan milik Program Studi
Teknik Informatika (PSTI) PCR dan bersifat rahasia. Dilarang
menyalin dan memperbanyak dokumen ini tanpa diketahui oleh
PSTI-PCR, kecuali ada ijin tertulis dari PSTI-PCR.
Seluruh isi dan informasi pada template merupakan milik Program Studi Teknik
Informatika (PSTI) PCR dan bersifat rahasia. Dilarang menyalin dan memperbanyak

Spesifikasi Kebutuhan Perangkat Lunak Daftar Perubahan Dokumen

Daftar Perubahan Dokumen
Seluruh versi dari dokumen ini didaftar berdasar kronologisnya. Tidak ada
hubungan antara nomer dokumen dan nomor versi perangkat lunak.
Versi
Dokumen Tanggal^ Alasan^ Perubahan^
Versi
Perangkat Lunak
DRAF 01 25/05/
26
Release yang pertama ETERNAL-KOS V

Dokumen ini dibuat oleh Kelompok 7 dengan pengawasan dari Prodi Teknik
Informatika PCR sebagai upaya untuk menjamin keakurasian dokumen saat akan
di cetak.
Copyright @ 2023 Program Studi Teknik Informatika PCR
Seluruh informasinya adalah hak milik Program Studi Teknik
Informatika PCR yang tidak dipulikasikan dan bersifat rahasia.

Seluruh isi dan informasi pada template merupakan milik Program Studi Teknik
Informatika (PSTI) PCR dan bersifat rahasia. Dilarang menyalin dan memperbanyak

Spesifikasi Kebutuhan Perangkat Lunak Daftar Revisi Dokumen
Daftar Revisi Dokumen
Seluruh revisi yang telah dilakukan pada dokumen ini, dapat diikuti sebagaimana
tabel berikut.
Nomer
Revisi Halaman^ Tanggal^
Keterangan Pemeriksaan
Keterangan singkat perbaikan
Ditulis
oleh
Diperiksa
oleh
Disetujui
oleh
Dokumen ini dibuat oleh <nama_mahasiswa> dengan pengawasan dari Prodi
Teknik Informatika PCR sebagai upaya untuk menjamin keakurasian dokumen
saat akan di cetak.
Copyright @ 2023 Program Studi Teknik Informatika PCR
Seluruh informasinya adalah hak milik Program Studi Teknik
Informatika PCR yang tidak dipulikasikan dan bersifat rahasia.

Seluruh isi dan informasi pada template merupakan milik Program Studi Teknik
Informatika (PSTI) PCR dan bersifat rahasia. Dilarang menyalin dan memperbanyak

Spesifikasi Kebutuhan Perangkat Lunak Daftar Isi
<Release date>
Seluruh isi dan informasi pada template merupakan milik Program Studi Teknik
Informasi Tentang Template....................................................................................... Daftar Isi
- Spesifikasi Kebutuhan Perangkat Lunak......................................................
Program Studi Teknik Informatika – PCR................................................................
SPESIFIKASI KEBUTUHAN PERANGKAT LUNAK...........................................
SISTEM MANAJEMEN KOST (ETERNAL KOST).............................................
SIMAKO.......................................................................................................................
Daftar Perubahan Dokumen.......................................................................................
Daftar Revisi Dokumen................................................................................................
Daftar Isi.......................................................................................................................
Pendahuluan.............................................................................................................
Deskripsi Umum.......................................................................................................
Kebutuhan Antarmuka Eksternal..........................................................................
Kebutuhan Fungsional.............................................................................................
Kebutuhan Non Fungsional.....................................................................................
Feature Sistem..........................................................................................................
Kebutuhan Lain........................................................................................................
Appendix A: Model Analisis........................................................................................
Appendix B: Daftar Kebutuhan................................................................................
Spesifikasi Kebutuhan Perangkat Lunak Pendahuluan

1. Pendahuluan.............................................................................................................
Tujuan
Dokumen Spesifikasi Kebutuhan Perangkat Lunak (SKPL) ini bertujuan
untuk mendefinisikan secara lengkap dan jelas kebutuhan-kebutuhan
untuk pengembangan website "Eternal Kost". Dokumen ini menjadi acuan
utama bagi tim pengembang (Kelompok 7) dalam melakukan perancangan,
implementasi, dan pengujian perangkat lunak. Lingkup SKPL ini mencakup
seluruh kebutuhan untuk sistem manajemen kos dan reservasi online, baik
untuk sisi pengguna publik (calon penghuni) maupun sisi administrator
(pemilik kos).
Ruang Lingkup Perangkat Lunak
Perangkat lunak yang akan dikembangkan adalah sebuah website reservasi
kos online yang responsif dan aman untuk Eternal Kost, sebuah penyedia
kos khusus perempuan. Tujuan utamanya adalah mengatasi masalah
pengelolaan manual yang saat ini membebani pemilik dan menyulitkan
calon penghuni dalam mendapatkan informasi.
Sasaran dan keuntungan dari pengembangan perangkat lunak ini adalah:
● Bagi Pemilik Kos: Mempermudah manajemen data kamar, penghuni,
keuangan, dan aturan kos melalui sebuah dashboard admin yang
terpusat.
● Bagi Calon Penghuni: Menyediakan akses informasi 24/7 mengenai detail
kamar, harga, fasilitas, aturan, dan ketersediaan kamar secara real-time,
serta kemudahan melakukan reservasi online.
● Bagi Penghuni: Menyediakan saluran pengaduan masalah (report) secara
online.
● Strategi Bisnis: Meningkatkan citra profesional bisnis Eternal Kost,
mengoptimalkan promosi, dan meningkatkan efisiensi operasional.
Target Audience
Dokumen ini ditujukan untuk:
Audience Keterangan
Tim Pengembang (Kelompok 7) Sebagai panduan utama dalam
proses desain, pengkodean, dan
pengujian.
Dosen Pembimbing Untuk mengevaluasi kelengkapan
dan ketepatan analisis kebutuhan.

Seluruh isi dan informasi pada template merupakan milik Program Studi Teknik
Informatika (PSTI) PCR dan bersifat rahasia. Dilarang menyalin dan memperbanyak

Spesifikasi Kebutuhan Perangkat Lunak Pendahuluan
Pemilik Eternal Kost Verifikasi bahwa kebutuhan
bisnisnya telah diakomodasi
dengan benar
Definisi, Istilah dan Singkatan
Guna memberikan gambaran yang sama terhadap beberapa definisi, istilah
dan singkatan yang digunakan di dokumen ini, perlu dijelaskan
sebagaimana berikut:
SKPL Spesifikasi Kebutuhan Perangkat
Lunak
SRS Software Requirement
Specification atau
Adalah dokumen hasil analisis
sebuah perangkat lunak yang berisi
spesifikasi kebutuhan pengguna
FR (Functional Requirement): Kebutuhan fungsional yang wajib
dimiliki sistem
UC (Use Case) Interaksi spesifik antara sistem dan
aktor pengguna
US (User Story) Penjelasan singkat fitur dari sudut
pandang pengguna (Aktor)
Owner Orang yang memiliki dan
mengelola keseluruhan kos-kosan
Sistem Penomoran
Ada beberapa hal/bagian dalam dokumen ini yang perlu diberi nomor.
Maksud penomoran ini untuk mempermudah audience dalam
pengidentifikasian. Adapun aturan penomorannya sebagaimana tabel
berikut:
Hal/Bagian Aturan Penomoran
Kebutuhan Fungsional Nomor berbentuk FR-XX, misal: FR-01, FR-
Kebutuhan Non
Fungsional
Nomor berbentuk NFR-XX, misal: NFR-01, NFR-
Fitur Sistem / Use Case Nomor berbentuk UC-XX, misal: UC-01, UC-

Seluruh isi dan informasi pada template merupakan milik Program Studi Teknik
Informatika (PSTI) PCR dan bersifat rahasia. Dilarang menyalin dan memperbanyak

Spesifikasi Kebutuhan Perangkat Lunak Pendahuluan
Ikhtisar Dokumen
Dokumen Spesifikasi Kebutuhan Perangkat Lunak (SKPL) untuk Sistem
Management Kost ini berisi spesifikasi
kebutuhan pengembangan perangkat lunak secara rinci.
Pengorganisasian dokumen dikelompokkan dalam beberapa bagian,
yaitu:

Pendahuluan, adapun beberapa pembahasan yang dibahas pada
bab pendahuluan antara lain yaitu :
a. Tujuan
b. Ruang Lingkup Perangkat Lunak
c. Target Audience
d. Definisi, Istilah dan Singkatan
e. Sistem Penomoran
f. dan Ikhtisar Dokumen.
Deskripsi Umum, pada bab ini berisi penjelasan berkaitan dengan
penjelasan perangkat lunak yang akan dikembangkan, yang terdiri dari
penjelasan tentang:
a. Tentang Perangkat Lunak
b. Karakteristik dan Klasifikasi Pengguna
c. Lingkungan Operasi
Kebutuhan Antarmuka Eksternal, pada bab ini berisi penjelasan
berkaitan dengan antarmuka dari perangkat lunak yang dikembangkan,
terdiri dari penjelasan tentang:
a. Antarmuka Pengguna (Wireframe)
b. Antarmuka Perangkat Keras
c. Antarmuka Perangkat Lunak
d. Antarmuka Komunikasi
Kebutuhan Fungsional, pada bab ini berisi penjelasan detail dari
kebutuhan fungsional dari perangkat lunak yang dikembangkan.
Kebutuhan Non Fungsional, pada bab ini berisi penjelasan detail
dari kebutuhan non fungsional dari perangkat lunak yang
dikembangkan.
Feature Sistem, pada bab ini berisi penjelasan dari perancangan
berbasis object oriented yang akan digunakan sebagai acuan untuk
pengembangan perangkat lunak, terdiri dari penjelasan tentang:
a. Use Case Diagram
b. Use Case Description
Kebutuhan Lain, pada bab ini berisi penjelasan dari diagram aktivitas
atau activity diagram menggambarkan workflow (aliran kerja) atau
aktivitas dari sebuah sistem atau proses bisnis atau menu yang ada
pada perangkat lunak.
a. Alur Penggunaan Sistem (Activity Diagram)
Appendix A: Model Analisis
Appendix B: Daftar Kebutuhan

Seluruh isi dan informasi pada template merupakan milik Program Studi Teknik
Informatika (PSTI) PCR dan bersifat rahasia. Dilarang menyalin dan memperbanyak
Spesifikasi Kebutuhan Perangkat Lunak Pendahuluan

Seluruh isi dan informasi pada template merupakan milik Program Studi Teknik
Informatika (PSTI) PCR dan bersifat rahasia. Dilarang menyalin dan memperbanyak

Spesifikasi Kebutuhan Perangkat Lunak Deskripsi Umum

2. Deskripsi Umum.......................................................................................................
Tentang Perangkat Lunak
Perangkat lunak "Website Eternal Kost" adalah sistem informasi terintegrasi
yang menggantikan sistem manual (buku/catatan) yang saat ini digunakan.
Sistem ini terdiri dari dua komponen utama:

Website Publik: Dapat diakses oleh calon penghuni untuk melihat
informasi kos, galeri kamar, harga, aturan, lokasi, dan melakukan
reservasi online.
Dashboard Admin: Dapat diakses oleh owner untuk mengelola seluruh
data, termasuk data kamar, penghuni, transaksi keuangan, aturan kos,
serta melihat notifikasi dan laporan pengaduan.
Karakteristik dan Klasifikasi Pengguna
Terdapat tiga klasifikasi pengguna dengan hak akses berbeda:
No Pengguna Deskripsi
1 Owner Aktor ini memiliki hak akses penuh
terhadap dashboard admin. Memiliki
kebutuhan keahlian teknis dasar untuk
mengoperasikan fitur Create, Read,
Update, Delete (CRUD) dan melihat
laporan.
2 Penghuni Pengguna yang telah memiliki akun
(atau mengakses fitur terbatas) untuk
dapat melakukan report pengaduan.
3 Calon Penghuni Pengguna publik tanpa perlu login.
Karakteristiknya adalah membutuhkan
informasi yang cepat, akurat, dan
antarmuka yang mudah digunakan.

Seluruh isi dan informasi pada template merupakan milik Program Studi Teknik
Informatika (PSTI) PCR dan bersifat rahasia. Dilarang menyalin dan memperbanyak
Spesifikasi Kebutuhan Perangkat Lunak Deskripsi Umum
Lingkungan Operasi
Web Browser Chrome, dan Microsoft Edge.
DBMS MySQL, atau PostGreSQL
Sistem Operasi Semua Sistem Operasi selama masih
bisa akses web browser

Seluruh isi dan informasi pada template merupakan milik Program Studi Teknik
Informatika (PSTI) PCR dan bersifat rahasia. Dilarang menyalin dan memperbanyak

Spesifikasi Kebutuhan Perangkat Lunak Kebutuhan Antarmuka Eksternal

3. Kebutuhan Antarmuka Eksternal..........................................................................
3.1. Antarmuka Pengguna (Wireframe)
3.1.1. Wireframe Halaman Login (SKPL-WF-01)
3.1.2. Wireframe Halaman Landing Page (SKPL-WF-02)
Antarmuka Perangkat Keras
Antarmuka perangkat keras merupakan bentuk koneksi fisik antara
manusia dan teknologi untuk membuat sebuah sistem. Antarmuka
perangkat keras menggunakan kombinasi dari alat-alat untuk
membuat/membangun sebuah sistem.
Perangkat keras yang digunakan untuk pengembangan SIMAKO
adalah sebagai berikut:

Computer / Laptop
Mouse, digunakan untuk mengenali input data yang dilakukan pengguna
berkaitan dengan event click.
Keyboard, digunakan untuk melakukan input data berupa karakter atau
text yang diinputkan.
Modem/wifi, digunakan untuk melakukan koneksi ke internet
Antarmuka Perangkat Lunak
Adapun perangkat lunak yang digunakan pada adalah
sebagai berikut:
Protokol Https
PHP 8.
Framework React Js.
MySQL
Antarmuka Komunikasi

Seluruh isi dan informasi pada template merupakan milik Program Studi Teknik
Informatika (PSTI) PCR dan bersifat rahasia. Dilarang menyalin dan memperbanyak
Spesifikasi Kebutuhan Perangkat Lunak Kebutuhan NonFungsional Lainnya

4. Kebutuhan Fungsional.............................................................................................
Kebutuhan Fungsional
<Jika ada kebutuhan kinerja perangkat lunak yang kondisinya bervariasi,
nyatakan dan terangkan dasar pemikirannya, agar dapat membantu
pengembang dalam memahami tujuan dan pemilihan desain yang cocok.
Terutama yang berhubungan dengan waktu untuk sistem real time. Buatlah
kebutuhan yang sedemikian jelas dan mungkin. Pernyataan kebutuhan
kinerja untuk satu kebutuhan fungsional atau feature >
Kode Kebutuhan Fungsonal
SKPL-KF-01 Sistem menyediakan fitur pengelolaan informasi dan
keamanan kos oleh owner
SKPL-KF-02 Sistem menampilkan notifikasi dan daftar penghuni yang
mendekati jatuh tempo pembayaran

SKPL-KF-03 (^) Sistem menyediakan fitur pencatatan pemasukan dan
pengeluaran serta laporan keuangan
SKPL-KF-04 Sistem menyediakan fitur pengelolaan data penghuni
meliputi tambah, edit, hapus dan pencarian data penghuni
SKPL-KF-05 Sistem menyediakan fitur pengelolaan kamar kos meliputi
edit fasilitas dan status kamar
SKPL-KF-06 Sistem menampilkan detail kamar berupa foto, harga,
fasilitas, status dan informasi kamar
SKPL-KF-07 Sistem menampilkan informasi terkait kos, aturan dan
keamanan kos
SKPL-KF-08 Sistem menyediakan fitur reservasi kamar secara online
SKPL-KF-09 Sistem menyediakan fitur report atau pengaduan penghuni
kepada owner

Seluruh isi dan informasi pada template merupakan milik Program Studi Teknik
Informatika (PSTI) PCR dan bersifat rahasia. Dilarang menyalin dan memperbanyak

Spesifikasi Kebutuhan Perangkat Lunak Kebutuhan NonFungsional Lainnya

5. Kebutuhan Non Fungsional.....................................................................................
Kode Parameter Requirement
SKPL-NF-01 (^) Usability Kelompok kami
memastikan tampilan
website mudah
dipahami oleh Calon
Penghuni saat mencari
kost.
SKPL-NF-02 (^) Availability Kelompok kami
menjamin website dapat
diakses setiap saat untuk
mengecek status kamar.
SKPL-NF-03 (^) Reliability Kelompok kami
menjaga keakuratan
data agar tidak ada
kesalahan informasi
kamar kosong.
SKPL-NF-04 (^) Portability Kelompok kami
merancang website agar
dapat dibuka dengan
lancar di laptop maupun
android
SKPL-NF-05 (^) Security Kelompok kami
menerapkan sistem
login admin untuk
melindungi data
keuangan dan penghuni.

Seluruh isi dan informasi pada template merupakan milik Program Studi Teknik
Informatika (PSTI) PCR dan bersifat rahasia. Dilarang menyalin dan memperbanyak

Spesifikasi Kebutuhan Perangkat Lunak Kebutuhan NonFungsional Lainnya

6. Feature Sistem..........................................................................................................
6.1. Use Case Diagram
6.2. Use Case Description
6.2.1. Use Case Description Mengelola Informasi Kos (SKPL-UCD-01)
UC-01: Mengelola Informasi Kos Actor: Owner
Description
Owner dapat menambah, mengedit, atau menghapus informasi dan aturan kos yang
akan ditampilkan di website.
Precondition
Owner sudah login ke dashboard admin
Postcondition
Informasi dan aturan kos tersimpan dalam sistem dan ditampilkan di halaman utama
website
Main Flow:

Owner membuka halaman "Kelola Informasi & Aturan"
Owner menambah atau mengedit aturan
Owner menekan tombol "Simpan"
Sistem menyimpan data
Sistem menampilkan aturan di halaman depan website
Alternative Flow:
3a. Jika owner memilih tombol “Hapus” pada aturan tertentu

Seluruh isi dan informasi pada template merupakan milik Program Studi Teknik
Informatika (PSTI) PCR dan bersifat rahasia. Dilarang menyalin dan memperbanyak
Spesifikasi Kebutuhan Perangkat Lunak Kebutuhan NonFungsional Lainnya
6.2.2. Use Case Description Melihat Notifikasi Jatuh Tempo
(SKPL-UCD-02)
UC-02 - Melihat Notifikasi Jatuh
Tempo
Actor: Owner
Description
Sistem menampilkan daftar penghuni yang masa sewanya akan habis secara otomatis
di dashboard owner.
Precondition
Owner sudah login ke dashboard admin
Postcondition
Owner melihat dan mengetahui daftar penghuni dengan masa sewa hampir habis
Main Flow:

Owner membuka halaman dashboard
Sistem secara otomatis memeriksa data masa sewa penghuni
Sistem menampilkan list nama penghuni yang masa sewanya akan habis dalam
14 hari ke depan
Owner melihat detail penghuni
6.2.3. Use Case Description Mengelola Keuangan Kos(SKPL-UCD-03)
UC-03 - Mengelola Keuangan Kos Actor: Owner
Description
Owner dapat mencatat pemasukan dan pengeluaran serta melihat laporan keuangan kos
Precondition
Owner sudah login ke dashboard admin
Postcondition
Laporan keuangan terupdate dan ditampilkan kepada owner
Main Flow:
Owner membuka halaman "Keuangan".
Owner memilih jenis transaksi (pemasukan/pengeluaran).
Owner menginput nominal dan keterangan.
Owner menekan tombol "Simpan".
Sistem menyimpan data transaksi.
Sistem menghitung total pemasukan dikurangi pengeluaran.
Sistem menampilkan laporan keuangan yang sudah diperbarui.
6.2.4. Use Case Description Mengelola Data
Penghuni(SKPL-UCD-04)

Seluruh isi dan informasi pada template merupakan milik Program Studi Teknik
Informatika (PSTI) PCR dan bersifat rahasia. Dilarang menyalin dan memperbanyak
Spesifikasi Kebutuhan Perangkat Lunak Kebutuhan NonFungsional Lainnya
UC-04 - Mengelola Data Penghuni Actor: Owner
Description
Owner dapat menambah, mencari, mengubah dan menghapus data penghuni
Precondition
Owner sudah login ke dashboard admin
Postcondition
Data penghuni tersimpan dan dapat dikelola
Main Flow:

Owner membuka halaman "Data Penghuni"
Owner mencari data penghuni via kamar yang telah ditempati
Sistem menampilkan data penghuni
Owner dapat menambah, mengubah atau menghapus data penghuni
Sistem menyimpan perubahan data
Alternative Flow:
2a. Jika data penghuni tidak ditemukan, sistem menampilkan pesan “Data penghuni
tidak ditemukan”.
6.2.5. Use Case Description Mengelola Kamar Kos(SKPL-UCD-05)
UC-05 - Mengelola Kamar Kos Actor: Owner
Description
Owner dapat mengelola fasilitas, informasi, dan status ketersediaan kamar kos
Precondition
Owner sudah login ke dashboard admin
Postcondition
Informasi kamar diperbarui pada website
Main Flow:
Owner membuka halaman “Manajemen Kamar”
Owner memilih kamar yang ingin dikelola
Owner mengubah fasilitas, harga atau status kamar
Owner menekan tombol “Simpan”
Sistem menyimpan perubahan data kamar
Sistem menampilkan informasi kamar terbaru pada website
Alternative Flow:
3a. Jika kamar sedang diperbaiki atau dihuni, owner dapat mengubah status menjadi
“Tidak Tersedia”
6.2.6. Use Case Description Melihat Detail Kamar(SKPL-UCD-06)

Seluruh isi dan informasi pada template merupakan milik Program Studi Teknik
Informatika (PSTI) PCR dan bersifat rahasia. Dilarang menyalin dan memperbanyak
Spesifikasi Kebutuhan Perangkat Lunak Kebutuhan NonFungsional Lainnya
UC-06 - Melihat Detail Kamar Actor: Calon Penghuni
Description
Calon penghuni dapat melihat detail kamar berupa foto, fasilitas, harga dan informasi
kamar
Precondition
Calon penghuni membuka website/sistem
Postcondition
Calon penghuni memperoleh informasi detail kamar
Main Flow:

Calon penghuni membuka halaman daftar kamar
Calon penghuni memilih salah satu kamar
Sistem menampilkan detail kamar berupa foto, fasilitas, harga dan status kamar
Calon penghuni membaca informasi kamar
6.2.7. Use Case Description Melihat Informasi Kos(SKPL-UCD-07)
UC-07 - Melihat Informasi Kos Actor: Calon Penghuni
Description
Calon penghuni dapat melihat informasi kos seperti aturan kos dan sistem keamanan
kos
Precondition
Calon penghuni membuka halaman halaman informasi kos
Postcondition
Calon penghuni memperoleh informasi terkait kos
Main Flow:
Calon penghuni membuka halaman “Informasi Kos”
Sistem menampilkan aturan kos
Sistem menampilkan informasi keamanan kos
Sistem menampilkan informasi kontak dan lokasi kos
6.2.8. Use Case Description Melakukan Reservasi
Kamar(SKPL-UCD-08)
UC-08 - Melakukan Reservasi
Kamar
Actor: Calon Penghuni
Description
Calon penghuni dapat melakukan reservasi kamar secara online
Precondition

Seluruh isi dan informasi pada template merupakan milik Program Studi Teknik
Informatika (PSTI) PCR dan bersifat rahasia. Dilarang menyalin dan memperbanyak
Spesifikasi Kebutuhan Perangkat Lunak Kebutuhan NonFungsional Lainnya
Calon penghuni login ke website/sistem
Postcondition
Data reservasi tersimpan dalam sistem
Main Flow:

Calon penghuni memilih kamar yang tersedia
Calon penghuni membuka form reservasi
Calon penghuni mengisi data reservasi
Calon penghuni menekan tombol “Kirim”.
Sistem memvalidasi data reservasi
Sistem menyimpan data reservasi
Owner mengkonfirmasi reservasi
Sistem menampilkan status reservasi
Alternative Flow :
5a. Jika data reservasi tidak lengkap, sistem menampilkan pesan kesalahan
6.2.9. Use Case Description Melakukan
Report/Pengaduan(SKPL-UCD-09)
UC-09 - Melakukan
Report/Pengaduan
Actor: Penghuni
Description
Penghuni dapat membuat laporan atau pengaduan terkait fasilitas dan kondisi kos
Precondition
Penghuni sudah login ke sistem
Postcondition
Laporan tersimpan dan dapat dilihat oleh owner
Main Flow:
Penghuni membuka halaman “Report/Pengaduan”
Penghuni mengisi form laporan
Penghuni mengunggah foto bukti
Penghuni menekan tombol “Kirim”
Sistem menyimpan laporan
Sistem mengirim notifikasi laporan kepada owner
Alternative Flow :
3a. Jika foto gagal diunggah, sistem menampilkan pesan gagal kesalahan upload

Seluruh isi dan informasi pada template merupakan milik Program Studi Teknik
Informatika (PSTI) PCR dan bersifat rahasia. Dilarang menyalin dan memperbanyak
Spesifikasi Kebutuhan Perangkat Lunak Kebutuhan Lain

7. Kebutuhan Lain........................................................................................................
Activity diagram merupakan salah satu jenis UML diagram yang paling
penting untuk menggambarkan proses bisnis dan urutan aktivitas
dalam sebuah sistem agar lebih mudah dipahami.
Proses nya berfokus pada serangkaian aktivitas dan bagaimana aktivitas
tersebut dapat berhubungan dengan awal dan akhir secara jelas, serta
terdapat decision (keputusan) yang mungkin terjadi pada sistem.
Activity diagram dibuat berdasarkan use case atau beberapa use case
dalam use case diagram.
7.1. Alur Penggunaan Sistem (Activity Diagram)
7.1.1

Seluruh isi dan informasi pada template merupakan milik Program Studi Teknik
Informatika (PSTI) PCR dan bersifat rahasia. Dilarang menyalin dan memperbanyak

Spesifikasi Kebutuhan Perangkat Lunak Lampiran A: Model Analisis

Appendix A: Model Analisis........................................................................................
<Model analisis yang relevan, dapat berupa class diagram, state-transition
diagram, atau entity-relationalship diagram (ERD) dan sebagainya>

Seluruh isi dan informasi pada template merupakan milik Program Studi Teknik
Informatika (PSTI) PCR dan bersifat rahasia. Dilarang menyalin dan memperbanyak

Spesifikasi Kebutuhan Perangkat Lunak Lampiran B: Daftar Kebutuhan

Appendix B: Daftar Kebutuhan................................................................................
Kode Keterangan

Seluruh isi dan informasi pada template merupakan milik Program Studi Teknik
Informatika (PSTI) PCR dan bersifat rahasia. Dilarang menyalin dan memperbanyak

This is a offline tool, your data stays locally and is not send to any server!
