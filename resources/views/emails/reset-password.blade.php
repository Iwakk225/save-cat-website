<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kode Verifikasi</title>
    <style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .code { font-size: 32px; font-weight: bold; color: #f59e0b; letter-spacing: 5px; text-align: center; margin: 20px 0; }
        .footer { margin-top: 30px; font-size: 12px; color: #888888; text-align: center; }
    </style>
</head>
<body>
    <div class="container">
        <h2>Halo!</h2>
        <p>Gunakan kode berikut untuk memverifikasi email Anda:</p>
        
        <div class="code">{{ $code }}</div>
        
        <p>Kode ini akan kedaluwarsa dalam <strong>10 menit</strong>.</p>
        <p>Jika Anda tidak merasa melakukan pendaftaran, abaikan email ini.</p>
        
        <div class="footer">
            <p>&copy; {{ date('Y') }} SaveCat Community. All rights reserved.</p>
        </div>
    </div>
</body>
</html>