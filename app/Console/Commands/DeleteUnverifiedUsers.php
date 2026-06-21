<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class DeleteUnverifiedUsers extends Command
{
    protected $signature = 'users:cleanup';
    protected $description = 'Hapus user yang belum verifikasi email';

    public function handle()
    {
        $deleted = User::whereNull('email_verified_at')
            ->where('created_at', '<', now()->subHours(24))
            ->delete();

        $this->info("$deleted user yang belum verifikasi berhasil dihapus.");
        
        return 0;
    }
}