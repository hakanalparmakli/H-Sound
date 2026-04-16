# H-Sound HTTP Server Başlatıcı
Write-Host "🚀 H-Sound HTTP Server başlatılıyor..." -ForegroundColor Green

# Port kontrolü
$port = 8000
$portInUse = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue

if ($portInUse) {
    Write-Host "⚠️ Port $port zaten kullanımda. Farklı port deneniyor..." -ForegroundColor Yellow
    $port = 8080
}

try {
    # Python ile HTTP server başlat
    Write-Host "🐍 Python HTTP server deneniyor..." -ForegroundColor Cyan
    Start-Process python -ArgumentList "-m", "http.server", $port -WindowStyle Minimized
    Start-Sleep 2
    
    Write-Host "✅ HTTP Server başlatıldı!" -ForegroundColor Green
    Write-Host "🌐 Adres: http://localhost:$port" -ForegroundColor White
    Write-Host "📁 Dosya: http://localhost:$port/music-player.html" -ForegroundColor White
    Write-Host "" 
    Write-Host "🎵 Artık müzikler çalacak!" -ForegroundColor Yellow
    Write-Host "🔗 Tarayıcıda bu adresi açın: http://localhost:$port/music-player.html" -ForegroundColor Magenta
    
    # Tarayıcıyı otomatik aç
    Start-Process "http://localhost:$port/music-player.html"
    
} catch {
    Write-Host "❌ Python bulunamadı. Node.js deneniyor..." -ForegroundColor Red
    
    try {
        # Node.js http-server ile dene
        Start-Process npx -ArgumentList "http-server", "-p", $port -WindowStyle Minimized
        Start-Sleep 3
        
        Write-Host "✅ Node.js HTTP Server başlatıldı!" -ForegroundColor Green
        Write-Host "🌐 Adres: http://localhost:$port" -ForegroundColor White
        Write-Host "📁 Dosya: http://localhost:$port/music-player.html" -ForegroundColor White
        
        # Tarayıcıyı otomatik aç
        Start-Process "http://localhost:$port/music-player.html"
        
    } catch {
        Write-Host "❌ Node.js de bulunamadı." -ForegroundColor Red
        Write-Host "💡 Manuel çözüm:" -ForegroundColor Yellow
        Write-Host "   1. Visual Studio Code'da 'Live Server' extension'ı yükleyin" -ForegroundColor White
        Write-Host "   2. music-player.html'e sağ tıklayıp 'Open with Live Server' seçin" -ForegroundColor White
        Write-Host "   3. Veya başka bir HTTP server kullanın" -ForegroundColor White
    }
}

Write-Host ""
Write-Host "📋 Önemli Notlar:" -ForegroundColor Cyan
Write-Host "• file:// protokolünde YouTube API çalışmaz" -ForegroundColor White  
Write-Host "• http://localhost ile açmanız gerekiyor" -ForegroundColor White
Write-Host "• Server çalışırken bu pencereyi kapatmayın" -ForegroundColor White

Read-Host "Press Enter to exit"