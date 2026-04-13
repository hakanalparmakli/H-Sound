@echo off
color 0A
echo.
echo 🚀 H-SOUND PRO v14.4 - HIZLI TEST
echo ================================

echo ✅ SPLASH ANIMASYON KALDIRILDI!
echo   - Direkt login ekranı açılır
echo   - 3 saniye bekleme yok
echo   - Hızlı başlangıç
echo.

echo 📱 WEB DEMO HAZIR:
echo   - h-sound-web-demo.html
echo   - Tüm özellikler test edilebilir
echo   - 75+ dil desteği
echo   - Kayıt ol sistemi
echo.

echo 🎯 APK BUILD DURUMU:
echo   - Build ID: c074bd17-ccf4e-41bc-9f52-0f4ca9becf3a
echo   - Durum: Sırada bekliyor
echo   - Link: https://expo.dev/accounts/hakan5225/projects/h-sound-professional/builds/
echo.

echo HIZLI TEST SECENEKLERI:
echo.
echo [1] WEB DEMO AC (Browser)
echo [2] EXPO GO TEST (QR Kod)
echo [3] APK BUILD KONTROL
echo [4] CIKIS
echo.

set /p choice="Seciminizi yapin (1-4): "

if "%choice%"=="1" goto :web
if "%choice%"=="2" goto :expo
if "%choice%"=="3" goto :build
if "%choice%"=="4" goto :exit

:web
echo.
echo 🌐 WEB DEMO ACILIYOR...
start h-sound-web-demo.html
echo.
echo ✅ Web demo browser'da açıldı!
echo   - Tüm özellikleri test edebilirsiniz
echo   - Dil değiştirme çalışır
echo   - Kayıt ol formu test edilebilir
goto :end

:expo
echo.
echo 📱 EXPO GO TEST BASLATILIYOR...
echo.
echo ADIMLAR:
echo 1. Telefona "Expo Go" uygulamasını indirin
echo 2. QR kodu tarayın
echo 3. H-Sound Pro'yu test edin
echo.
call npx @expo/cli start --tunnel
goto :end

:build
echo.
echo 🔍 APK BUILD DURUMU KONTROL EDILIYOR...
echo.
echo Build Link:
echo https://expo.dev/accounts/hakan5225/projects/h-sound-professional/builds/c074bd17-ccf4e-41bc-9f52-0f4ca9becf3a
echo.
start https://expo.dev/accounts/hakan5225/projects/h-sound-professional/builds/c074bd17-ccf4e-41bc-9f52-0f4ca9becf3a
echo.
echo ✅ Build sayfası açıldı!
echo   - Build durumunu kontrol edin
echo   - Tamamlandığında APK'yı indirin
goto :end

:exit
echo.
echo Çıkış yapılıyor...
exit

:end
echo.
echo ================================
echo.
echo 🎉 H-SOUND PRO v14.4 HAZIR!
echo.
echo ✅ TAMAMLANAN OZELLIKLER:
echo   🌍 75+ Dil Desteği
echo   📝 Kayıt Ol Sistemi
echo   🛡️ Gizlilik Politikası
echo   💬 Güvenli Mesajlaşma
echo   🎵 Sosyal Müzik Paylaşımı
echo   📱 Müzik İndirme
echo   ⚡ Hızlı Başlangıç (Splash kaldırıldı)
echo.
echo 📱 TEST SECENEKLERI:
echo   - Web Demo: h-sound-web-demo.html
echo   - Expo Go: QR kod ile test
echo   - APK: Build tamamlandığında
echo.
pause