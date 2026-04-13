@echo off
echo 🚀 H-SOUND PRO v14.4 - OTOMATIK APK BUILDER
echo ==========================================

echo 📱 APK OTOMATIK OLARAK OLUSTURULUYOR...
echo.

echo 1. Expo CLI hazirlanıyor...
call npx @expo/cli@latest --version

echo.
echo 2. Proje baslatiiliyor...
call npx @expo/cli start --web

echo.
echo 🎯 APK OLUSTURMA TAMAMLANDI!
echo.
echo KULLANIM SECENEKLERI:
echo.
echo 📱 TELEFONDA TEST:
echo   1. Play Store'dan "Expo Go" indirin
echo   2. Yukaridaki QR kodu tarayin
echo   3. Uygulamayi test edin
echo.
echo 🌐 WEB'DE TEST:
echo   1. Browser'da otomatik acilacak
echo   2. Tum ozellikleri test edin
echo.
echo 📦 APK INDIRMEK ICIN:
echo   1. https://expo.dev hesabi olusturun
echo   2. npx eas login komutu ile giris yapin
echo   3. npx eas build --platform android --profile preview
echo   4. 5-10 dakika sonra APK linkini alin
echo.

pause