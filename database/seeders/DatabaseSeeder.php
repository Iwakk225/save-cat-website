<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Report;
use App\Models\ReportImage;
use App\Models\Comment;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Seed Users
        $usersData = [
            [
                'id' => 1,
                'name' => 'Rian Kurniawan',
                'email' => 'rian.kurniawan@gmail.com',
                'telp' => '081234567890',
                'is_admin' => true,
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ],
            [
                'id' => 2,
                'name' => 'Siti Rahmawati',
                'email' => 'siti.rahma@gmail.com',
                'telp' => '085712345678',
                'is_admin' => false,
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ],
            [
                'id' => 3,
                'name' => 'Budi Santoso',
                'email' => 'budi.santoso@yahoo.com',
                'telp' => '089698765432',
                'is_admin' => false,
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ],
            [
                'id' => 4,
                'name' => 'Dewi Lestari',
                'email' => 'dewi.lestari@outlook.com',
                'telp' => '082133445566',
                'is_admin' => false,
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ],
            [
                'id' => 5,
                'name' => 'Andi Wijaya',
                'email' => 'andi.wijaya@gmail.com',
                'telp' => '087855667788',
                'is_admin' => false,
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ],
            [
                'id' => 6,
                'name' => 'Lia Ananda',
                'email' => 'lia.ananda@gmail.com',
                'telp' => '081399887766',
                'is_admin' => false,
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ],
            [
                'id' => 7,
                'name' => 'Fikri Hidayat',
                'email' => 'fikri.h@gmail.com',
                'telp' => '085211223344',
                'is_admin' => false,
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ],
            [
                'id' => 8,
                'name' => 'Putri Amelia',
                'email' => 'putri.amel@yahoo.com',
                'telp' => '081277665544',
                'is_admin' => false,
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ],
            [
                'id' => 9,
                'name' => 'Rudi Hermawan',
                'email' => 'rudi.herm@gmail.com',
                'telp' => '089944556677',
                'is_admin' => false,
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ],
            [
                'id' => 10,
                'name' => 'Mega Wahyuni',
                'email' => 'mega.wahyuni@gmail.com',
                'telp' => '085699887766',
                'is_admin' => false,
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ],
            [
                'id' => 11,
                'name' => 'Yusuf Maulana',
                'email' => 'yusuf.m@gmail.com',
                'telp' => '081311223300',
                'is_admin' => false,
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ],
            [
                'id' => 12,
                'name' => 'Diana Sari',
                'email' => 'diana.sari@gmail.com',
                'telp' => '087812998877',
                'is_admin' => false,
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        ];

        foreach ($usersData as $userData) {
            User::create($userData);
        }

        // 2. Seed Reports
        $reportsData = [
            [
                'id' => 1,
                'user_id' => 3, // Budi Santoso
                'title' => 'Kucing terluka parah di depan minimarket Jl. Sudirman',
                'category' => 'terluka',
                'urgency' => 'tinggi',
                'status' => 'aktif',
                'location' => 'Jl. Sudirman No. 45, Jakarta Pusat',
                'description' => 'Ditemukan seekor kucing oranye jantan dengan luka di kaki belakang kiri, sepertinya tertabrak kendaraan. Kucing masih sadar tapi tidak bisa berdiri. Butuh bantuan segera dari relawan atau dokter hewan terdekat.',
                'contact' => '08123456789',
                'tags' => ['Luka Fisik', 'Butuh Segera'],
                'created_at' => '2026-06-25 08:30:00',
            ],
            [
                'id' => 2,
                'user_id' => 2, // Siti Rahmawati
                'title' => 'Anak kucing terlantar ditemukan di kolong jembatan',
                'category' => 'terlantar',
                'urgency' => 'sedang',
                'status' => 'aktif',
                'location' => 'Kolong Jembatan Semanggi, Jakarta Selatan',
                'description' => 'Ada 3 anak kucing kecil sekitar 2-3 minggu, belum bisa buka mata sepenuhnya. Kemungkinan ditinggal induknya. Perlu susu khusus bayi kucing dan tempat yang hangat segera.',
                'contact' => '08234567890',
                'tags' => ['Bayi Kucing', '3 Ekor'],
                'created_at' => '2026-06-25 10:15:00',
            ],
            [
                'id' => 3,
                'user_id' => 3, // Budi Santoso
                'title' => 'Kucing sakit keras, mata berair dan tidak mau makan',
                'category' => 'sakit',
                'urgency' => 'tinggi',
                'status' => 'aktif',
                'location' => 'Perumahan Griya Asri Blok C No. 12, Depok',
                'description' => 'Kucing kampung putih betina, ditemukan lemas di depan rumah sejak 2 hari lalu. Matanya berair terus, hidung meler, dan tidak mau makan sama sekali. Diduga flu kucing parah.',
                'contact' => '08345678901',
                'tags' => ['Flu Kucing', 'Lemas'],
                'created_at' => '2026-06-24 16:00:00',
            ],
            [
                'id' => 4,
                'user_id' => 4, // Dewi Lestari
                'title' => 'Kucing terjebak di dalam saluran drainase',
                'category' => 'terjebak',
                'urgency' => 'tinggi',
                'status' => 'selesai',
                'location' => 'Jl. Kebon Jeruk Raya, Jakarta Barat',
                'description' => 'Seekor kucing abu-abu terjebak di dalam saluran air sempit. Sudah meraung-raung sejak pagi. Perlu alat bantu untuk mengeluarkannya. Sudah dicoba dengan tongkat tapi gagal.',
                'contact' => '08456789012',
                'tags' => ['Terjebak', 'Perlu Alat'],
                'created_at' => '2026-06-24 09:00:00',
            ],
            [
                'id' => 5,
                'user_id' => 7, // Fikri Hidayat
                'title' => 'Kucing kondisi darurat setelah disiram air panas',
                'category' => 'darurat',
                'urgency' => 'tinggi',
                'status' => 'aktif',
                'location' => 'Gang Mawar No. 3, Tangerang',
                'description' => 'Kucing belang hitam putih ditemukan dengan luka bakar di punggung dan ekor. Diduga disiram air panas oleh oknum tidak bertanggung jawab. Perlu penanganan dokter hewan SEGERA.',
                'contact' => '08567890123',
                'tags' => ['Darurat', 'Luka Bakar', 'Kasus Kekerasan'],
                'created_at' => '2026-06-23 14:30:00',
            ],
            [
                'id' => 6,
                'user_id' => 10, // Mega Wahyuni
                'title' => 'Kucing terlantar sangat kurus butuh adopsi',
                'category' => 'terlantar',
                'urgency' => 'rendah',
                'status' => 'aktif',
                'location' => 'Pasar Minggu, Jakarta Selatan',
                'description' => 'Kucing kuning betina sangat kurus, tulang rusuknya kelihatan. Sudah diberi makan sementara oleh warga sekitar tapi butuh adopsi permanen. Sudah divaksin dasar.',
                'contact' => '08678901234',
                'tags' => ['Siap Adopsi', 'Sudah Vaksin'],
                'created_at' => '2026-06-23 11:00:00',
            ],
            [
                'id' => 7,
                'user_id' => 12, // Diana Sari
                'title' => 'Tiga ekor kucing kampung butuh tempat tinggal sementara',
                'category' => 'terlantar',
                'urgency' => 'sedang',
                'status' => 'aktif',
                'location' => 'Jl. Fatmawati, Jakarta Selatan',
                'description' => 'Induk kucing dan 2 anaknya kehilangan tempat tinggal karena renovasi gedung. Butuh foster sementara atau adopsi. Sudah jinak dan mudah bergaul.',
                'contact' => '08789012345',
                'tags' => ['Butuh Foster', '3 Ekor'],
                'created_at' => '2026-06-22 08:00:00',
            ],
        ];

        foreach ($reportsData as $reportData) {
            Report::create($reportData);
        }

        // 3. Seed Report Images
        $imagesData = [
            ['report_id' => 1, 'image_path' => 'https://placecats.com/400/300'],
            ['report_id' => 2, 'image_path' => 'https://placecats.com/401/300'],
            ['report_id' => 3, 'image_path' => 'https://placecats.com/402/300'],
            ['report_id' => 4, 'image_path' => 'https://placecats.com/403/300'],
            ['report_id' => 5, 'image_path' => 'https://placecats.com/404/300'],
            ['report_id' => 6, 'image_path' => 'https://placecats.com/405/300'],
            ['report_id' => 7, 'image_path' => 'https://placecats.com/406/300'],
        ];

        foreach ($imagesData as $imageData) {
            ReportImage::create($imageData);
        }

        // 4. Seed Comments
        $commentsData = [
            [
                'report_id' => 1,
                'user_id' => 2, // Siti Rahmawati
                'comment_text' => 'Ya ampun kasihan banget kak. Lokasi detailnya di mana? Saya ada kandang di rumah dekat Juanda Depok, kalau belum ada yang evakuasi kabari ya, saya bisa meluncur sore ini.',
                'created_at' => '2026-06-20 15:05:00',
            ],
            [
                'report_id' => 1,
                'user_id' => 1, // Rian Kurniawan
                'comment_text' => 'Terima kasih kak Siti! Lokasinya persis di halte bus arah Jakarta, di samping tukang jualan koran/majalah. Kucingnya bersembunyi di bawah bangku halte.',
                'created_at' => '2026-06-20 15:12:30',
            ],
            [
                'report_id' => 1,
                'user_id' => 2, // Siti Rahmawati
                'comment_text' => 'Oke kak Rian, saya siap-siap jalan ke sana bawa kandang jinjing dan makanan basah buat pancing.',
                'created_at' => '2026-06-20 15:20:00',
            ],
            [
                'report_id' => 2,
                'user_id' => 5, // Andi Wijaya
                'comment_text' => 'Lucu-lucu banget kittennya kak, pengen adopsi yang warna abu-abu tapi sayang di rumah kontrakan saya tidak diperbolehkan pelihara hewan. Semoga cepat dapat adopter yang baik!',
                'created_at' => '2026-06-22 10:30:15',
            ],
            [
                'report_id' => 2,
                'user_id' => 6, // Lia Ananda
                'comment_text' => 'Kak, adopsinya syaratnya apa aja ya? Saya tinggal di Kemang, rumah pribadi ada halaman berpagar. Apakah boleh survei lokasi?',
                'created_at' => '2026-06-22 11:15:00',
            ],
            [
                'report_id' => 2,
                'user_id' => 1, // Rian Kurniawan
                'comment_text' => 'Boleh banget kak Lia, silakan DM nomor WhatsApp kakak ya untuk koordinasi lebih lanjut. Syaratnya cukup bersedia berkomitmen steril ketika umurnya sudah cukup dan bersedia mengirimkan update berkala.',
                'created_at' => '2026-06-22 11:32:00',
            ],
        ];

        foreach ($commentsData as $commentData) {
            Comment::create($commentData);
        }
    }
}
