# H-Sound Pro v14.4 - Simple PowerShell HTTP Server
$port = 8000
$url = "http://localhost:$port/"

Write-Host "🚀 H-Sound Pro v14.4 Server Başlatılıyor..." -ForegroundColor Green
Write-Host "📍 Adres: $url" -ForegroundColor Yellow
Write-Host "📁 Klasör: $PWD" -ForegroundColor Cyan
Write-Host "⏹️  Durdurmak için Ctrl+C basın" -ForegroundColor Red
Write-Host ""

# HTTP Listener oluştur
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($url)
$listener.Start()

Write-Host "✅ Server başlatıldı! Tarayıcınızda şu adresi açın:" -ForegroundColor Green
Write-Host "   $url" -ForegroundColor White
Write-Host ""

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        # URL'den dosya yolunu al
        $path = $request.Url.LocalPath
        if ($path -eq "/") { $path = "/index.html" }
        
        $filePath = Join-Path $PWD $path.TrimStart('/')
        
        Write-Host "📥 İstek: $($request.HttpMethod) $path" -ForegroundColor Gray
        
        if (Test-Path $filePath -PathType Leaf) {
            # Dosya var, gönder
            $content = [System.IO.File]::ReadAllBytes($filePath)
            
            # MIME type belirle
            $extension = [System.IO.Path]::GetExtension($filePath).ToLower()
            switch ($extension) {
                ".html" { $response.ContentType = "text/html; charset=utf-8" }
                ".css"  { $response.ContentType = "text/css" }
                ".js"   { $response.ContentType = "application/javascript" }
                ".json" { $response.ContentType = "application/json" }
                ".png"  { $response.ContentType = "image/png" }
                ".jpg"  { $response.ContentType = "image/jpeg" }
                ".ico"  { $response.ContentType = "image/x-icon" }
                default { $response.ContentType = "application/octet-stream" }
            }
            
            $response.StatusCode = 200
            $response.ContentLength64 = $content.Length
            $response.OutputStream.Write($content, 0, $content.Length)
            
            Write-Host "✅ Gönderildi: $filePath ($($content.Length) bytes)" -ForegroundColor Green
        } else {
            # Dosya bulunamadı
            $response.StatusCode = 404
            $errorContent = [System.Text.Encoding]::UTF8.GetBytes("404 - Dosya Bulunamadı: $path")
            $response.ContentLength64 = $errorContent.Length
            $response.OutputStream.Write($errorContent, 0, $errorContent.Length)
            
            Write-Host "❌ Bulunamadı: $filePath" -ForegroundColor Red
        }
        
        $response.Close()
    }
} catch {
    Write-Host "⚠️ Server hatası: $($_.Exception.Message)" -ForegroundColor Red
} finally {
    $listener.Stop()
    Write-Host "🛑 Server durduruldu." -ForegroundColor Yellow
}