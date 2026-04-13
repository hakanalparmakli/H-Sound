@echo off
echo 🎵 H-SOUND PRO v14.4 - HIZLI APK BUILDER
echo ==========================================

echo 🚀 HIZLI APK OLUSTURMA YONTEMI:
echo.

echo 1. Expo Go ile test etme:
echo   - Telefona Expo Go uygulamasini indirin
echo   - QR kodu tarayin
echo   - Uygulamayi test edin
echo.

echo 2. APK olusturmak icin:
echo   - https://expo.dev adresinde hesap olusturun
echo   - Terminal'de: npx eas login
echo   - Sonra: npx eas build --platform android --profile preview
echo.

echo 3. Alternatif APK yontemi:
echo   - https://appetize.io kullanin
echo   - Veya https://snack.expo.dev ile test edin
echo.

echo 🎯 SIMDI DEVELOPMENT SERVER BASLATILIYOR...
echo QR kod ile telefonunuzda test edebilirsiniz!
echo.

call npx @expo/cli start

pause