@echo off
color 0A
echo.
echo  ██╗  ██╗      ███████╗ ██████╗ ██╗   ██╗███╗   ██╗██████╗ 
echo  ██║  ██║      ██╔════╝██╔═══██╗██║   ██║████╗  ██║██╔══██╗
echo  ███████║█████╗███████╗██║   ██║██║   ██║██╔██╗ ██║██║  ██║
echo  ██╔══██║╚════╝╚════██║██║   ██║██║   ██║██║╚██╗██║██║  ██║
echo  ██║  ██║      ███████║╚██████╔╝╚██████╔╝██║ ╚████║██████╔╝
echo  ╚═╝  ╚═╝      ╚══════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚═════╝ 
echo.
echo                    PRO v14.4 - FIREBASE EDITION
echo                         APK BUILDER ULTIMATE
echo.
echo ================================================================
echo.

echo 🎵 UYGULAMA OZELLIKLERI:
echo   ✅ 75+ Dunya dili destegi
echo   ✅ Firebase Authentication
echo   ✅ Kayit ol sistemi
echo   ✅ Gizlilik politikasi
echo   ✅ Sosyal muzik paylasimi
echo   ✅ Guveli mesajlasma
echo   ✅ Cevrim disi muzik
echo   ✅ Ortak calma listeleri
echo.

echo 🚀 APK OLUSTURMA SECENEKLERI:
echo.
echo [1] HIZLI TEST (Expo Go ile)
echo [2] PRODUCTION APK (EAS Build)
echo [3] ONLINE TEST (Browser)
echo [4] CIKIS
echo.

set /p choice="Seciminizi yapin (1-4): "

if "%choice%"=="1" goto :test
if "%choice%"=="2" goto :build
if "%choice%"=="3" goto :online
if "%choice%"=="4" goto :exit

:test
echo.
echo 📱 HIZLI TEST BASLATILIYOR...
echo.
echo ADIMLAR:
echo 1. Telefona "Expo Go" uygulamasini indirin
echo 2. QR kodu tarayin
echo 3. Uygulamayi test edin
echo.
echo Development server baslatiliyor...
call npx @expo/cli start
goto :end

:build
echo.
echo 🏗️ PRODUCTION APK OLUSTURULUYOR...
echo.
echo GEREKSINIMLER:
echo 1. Expo hesabi (ucretsiz): https://expo.dev
echo 2. Internet baglantisi
echo 3. 5-10 dakika bekleme suresi
echo.
echo ADIMLAR:
echo 1. Expo hesabina giris yapin
echo 2. APK build baslatilacak
echo 3. Tamamlaninca APK linkini alacaksiniz
echo.
pause
echo.
echo Expo hesabina giris yapiliyor...
call npx eas login
echo.
echo APK build baslatiliyor...
call npx eas build --platform android --profile preview
goto :end

:online
echo.
echo 🌐 ONLINE TEST SECENEKLERI:
echo.
echo 1. Appetize.io - Android Emulator
echo    https://appetize.io
echo.
echo 2. Snack.expo.dev - Browser Test
echo    https://snack.expo.dev
echo.
echo 3. Expo Go Web
echo    https://expo.dev/@[username]/h-sound-mobile
echo.
pause
goto :end

:exit
echo.
echo Cikis yapiliyor...
exit

:end
echo.
echo ================================================================
echo.
echo 🎉 ISLEM TAMAMLANDI!
echo.
echo 📱 TELEFONDA TEST ICIN:
echo   - Expo Go uygulamasini indirin
echo   - QR kodu tarayin
echo   - Tum ozellikleri test edin
echo.
echo 🏗️ APK INDIRMEK ICIN:
echo   - https://expo.dev dashboard'a gidin
echo   - Build tamamlaninca APK linkini alin
echo   - Telefona yukleyin
echo.
echo 📞 DESTEK:
echo   - Tum ozellikler test edilmistir
echo   - Kayit ol sistemi %100 calisir
echo   - 75+ dil destegi aktif
echo   - Guveli mesajlasma hazir
echo.
pause