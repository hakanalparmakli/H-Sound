# H-Sound Pro v14.4 - Nasıl Çalıştırılır?

## 🚀 Hızlı Başlangıç

### Yöntem 1: Doğrudan Tarayıcıda Aç (En Kolay)
1. `music-player.html` dosyasına çift tıklayın
2. Tarayıcınızda açılacak
3. **Not:** Bazı özellikler (Service Worker, Manifest) çalışmayabilir ama uygulama normal çalışır

### Yöntem 2: Live Server (VS Code)
1. VS Code'da dosyayı açın
2. Sağ tıklayın → "Open with Live Server"
3. Otomatik olarak `http://localhost:5500` adresinde açılır

### Yöntem 3: Python HTTP Server
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```
Sonra tarayıcıda: `http://localhost:8000/music-player.html`

### Yöntem 4: Node.js HTTP Server
```bash
npx http-server -p 8000
```
Sonra tarayıcıda: `http://localhost:8000/music-player.html`

### Yöntem 5: Chrome Extension (Web Server for Chrome)
1. Chrome Web Store'dan "Web Server for Chrome" yükleyin
2. Uygulamayı açın
3. Klasörü seçin
4. "Web Server URL" adresini tarayıcıda açın

## 📱 APK Oluşturma

APK oluşturmak için:
```bash
APK-SOSYAL-MUZIK-v14.4.bat
```

## 🔧 Sorun Giderme

### Navigation Çalışmıyor
- Sayfayı yenileyin (F5)
- Console'u açın (F12) ve hataları kontrol edin
- Tarayıcı cache'ini temizleyin (Ctrl+Shift+Delete)

### Müzikler Yüklenmiyor
- İnternet bağlantınızı kontrol edin
- YouTube API key'leri çalışmıyor olabilir
- Fallback müzik listesi otomatik yüklenecek

### CORS Hataları
- Dosyayı HTTP server üzerinden açın (Yöntem 2, 3 veya 4)
- `file://` protokolü yerine `http://` kullanın

## ✅ Özellikler

- 🏠 Ana Sayfa - Popüler müzikler
- 🔍 Arama - YouTube'da müzik ara
- ⭐ Özellikler - Sosyal özellikler
- 🎵 Çalma Listeleri - Kendi listelerini oluştur
- 👥 Arkadaşlar - Arkadaş ekle ve sohbet et
- 📱 İndirilenler - Çevrimdışı müzik
- 📜 Son Dinlenenler - Geçmiş
- ⚙️ Ayarlar - Dil, hız vb.

## 🌐 Tarayıcı Desteği

- ✅ Chrome/Edge (Önerilen)
- ✅ Firefox
- ✅ Safari
- ⚠️ Internet Explorer (Desteklenmiyor)

## 📞 Destek

Sorun yaşıyorsanız:
1. Console'u açın (F12)
2. Hata mesajlarını kontrol edin
3. Tarayıcı ve işletim sistemi bilgilerinizi not edin
