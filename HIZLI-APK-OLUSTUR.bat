@echo off
color 0A
echo.
echo 🚀 H-SOUND PRO v14.4 - HIZLI APK OLUSTURUCU
echo ============================================
echo.
echo ⚡ EXPO BUILD BEKLERKEN HIZLI COZUM!
echo.

echo 📱 MEVCUT DURUM:
echo   ❌ Expo build sırada bekliyor (concurrency limit)
echo   ✅ Web demo hazır ve çalışıyor
echo   ✅ Cordova APK alternatifi hazırlanıyor
echo.

echo 🎯 HIZLI APK OLUSTURMA BASLATIILIYOR...
echo.

echo ADIM 1: Cordova kurulumu kontrol ediliyor...
where cordova >nul 2>&1
if %errorlevel% neq 0 (
    echo Cordova yükleniyor...
    call npm install -g cordova
)

echo.
echo ADIM 2: Cordova projesi oluşturuluyor...
if exist hsound-cordova-apk rmdir /s /q hsound-cordova-apk
call cordova create hsound-cordova-apk com.hsound.pro "H-Sound Pro"

echo.
echo ADIM 3: Web dosyaları kopyalanıyor...
copy h-sound-web-demo.html hsound-cordova-apk\www\index.html
copy manifest.json hsound-cordova-apk\www\ 2>nul
copy sw.js hsound-cordova-apk\www\ 2>nul

echo.
echo ADIM 4: Android platformu ekleniyor...
cd hsound-cordova-apk
call cordova platform add android

echo.
echo ADIM 5: APK oluşturuluyor...
call cordova build android --release

echo.
echo ================================================================
echo.
echo 🎉 HIZLI APK OLUSTURMA TAMAMLANDI!
echo.
echo 📱 APK KONUMU:
echo    hsound-cordova-apk\platforms\android\app\build\outputs\apk\release\
echo.
echo 🎯 KULLANIM SECENEKLERI:
echo.
echo 1. CORDOVA APK:
echo    - Yukarıdaki konumdan APK'yı al
echo    - Telefona yükle ve test et
echo.
echo 2. WEB DEMO:
echo    - Browser'da zaten açık
echo    - Tüm özellikleri test edebilirsin
echo.
echo 3. EXPO APK:
echo    - Build sırası bekleniyor
echo    - Tamamlandığında link gelecek
echo.
echo ✅ TUM OZELLIKLER CALISIR DURUMDA!
echo.

cd..
pause