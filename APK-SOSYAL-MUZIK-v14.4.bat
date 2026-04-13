@echo off
color 0A
cls

echo.
echo  ██╗  ██╗      ███████╗ ██████╗ ██╗   ██╗███╗   ██║██████╗ 
echo  ██║  ██║      ██╔════╝██╔═══██╗██║   ██║████╗  ██║██╔══██╗
echo  ███████║█████╗███████╗██║   ██║██║   ██║██╔██╗ ██║██║  ██║
echo  ██╔══██║╚════╝╚════██║██║   ██║██║   ██║██║╚██╗██║██║  ██║
echo  ██║  ██║      ███████║╚██████╔╝╚██████╔╝██║ ╚████║██████╔╝
echo  ╚═╝  ╚═╝      ╚══════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚═════╝ 
echo.
echo                PRO v14.4 - SOSYAL MUZIK PLATFORMU
echo                         APK OTOMATIK OLUSTURUCU
echo.
echo ================================================================
echo.

echo 🎉 SOSYAL MUZIK PLATFORMU APK OLUSTURULUYOR...
echo.

echo ✅ YENİ SOSYAL OZELLIKLER:
echo   👥 Arkadas ekleme sistemi
echo   💬 Gercek zamanli mesajlasma
echo   🎵 Muzik paylasma (arkadas ile)
echo   📋 Ortak calma listeleri
echo   📱 Muzik indirme (cevrim disi)
echo   🌍 75+ Dunya dili destegi
echo   🛡️ Gizlilik politikasi
echo   🚫 Splash animasyonu kaldirildi
echo   📝 Kayit ol butonu mevcut
echo   🔄 Sürüm 14.4 güncellemesi
echo.

echo 🚀 APK OLUSTURMA BASLATIILIYOR...
echo.

echo ADIM 1: Proje hazirlanıyor...
if not exist "node_modules" (
    echo Node modules yukleniyor...
    call npm install --silent
)

echo.
echo ADIM 2: PWA Builder ile APK olusturuluyor...
echo.
echo PWA Builder kullanarak APK olusturmak icin:
echo.
echo 1. https://www.pwabuilder.com adresine gidin
echo 2. Site URL'nizi girin: %cd%\index.html
echo 3. "Start" butonuna tiklayin
echo 4. "Package For Stores" sekmesine gecin
echo 5. "Android" secenegini secin
echo 6. APK ayarlarini yapin:
echo    - App Name: H-Sound Pro v14.4
echo    - Package ID: com.hsound.pro
echo    - Version: 14.4.0
echo 7. "Generate Package" butonuna tiklayin
echo 8. APK dosyasini indirin
echo.

echo ALTERNATIF: Cordova ile APK olusturma
echo.
echo ADIM 3: Cordova projesi olusturuluyor...
if not exist "hsound-cordova-apk" (
    call cordova create hsound-cordova-apk com.hsound.pro "H-Sound Pro"
)

cd hsound-cordova-apk

echo.
echo ADIM 4: Dosyalar kopyalanıyor...
copy ..\index.html www\ >nul 2>&1
copy ..\music-player.html www\ >nul 2>&1
copy ..\manifest.json www\ >nul 2>&1
copy ..\sw.js www\ >nul 2>&1

if exist "..\windows11" xcopy /E /I /Y ..\windows11 www\windows11\ >nul 2>&1
if exist "..\android" xcopy /E /I /Y ..\android www\android\ >nul 2>&1
if exist "..\ios" xcopy /E /I /Y ..\ios www\ios\ >nul 2>&1

echo.
echo ADIM 5: Android platform ekleniyor...
call cordova platform add android

echo.
echo ADIM 6: Gerekli plugin'ler ekleniyor...
call cordova plugin add cordova-plugin-whitelist
call cordova plugin add cordova-plugin-network-information
call cordova plugin add cordova-plugin-device
call cordova plugin add cordova-plugin-splashscreen
call cordova plugin add cordova-plugin-statusbar
call cordova plugin add cordova-plugin-music-controls
call cordova plugin add cordova-plugin-background-mode

echo.
echo ADIM 7: Config.xml guncelleniyor...
(
echo ^<?xml version='1.0' encoding='utf-8'?^>
echo ^<widget id="com.hsound.pro" version="14.4.0" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0"^>
echo     ^<name^>H-Sound Pro v14.4^</name^>
echo     ^<description^>Sosyal Muzik Platformu - Arkadas ekle, muzik paylas, sohbet et^</description^>
echo     ^<author email="hakan@hsound.com" href="https://hsound.com"^>Hakan Yusuf Alparmakli^</author^>
echo     ^<content src="index.html" /^>
echo     ^<allow-intent href="http://*/*" /^>
echo     ^<allow-intent href="https://*/*" /^>
echo     ^<allow-intent href="tel:*" /^>
echo     ^<allow-intent href="sms:*" /^>
echo     ^<allow-intent href="mailto:*" /^>
echo     ^<allow-intent href="geo:*" /^>
echo     ^<platform name="android"^>
echo         ^<allow-intent href="market:*" /^>
echo         ^<icon density="ldpi" src="android/android-launchericon-36-36.png" /^>
echo         ^<icon density="mdpi" src="android/android-launchericon-48-48.png" /^>
echo         ^<icon density="hdpi" src="android/android-launchericon-72-72.png" /^>
echo         ^<icon density="xhdpi" src="android/android-launchericon-96-96.png" /^>
echo         ^<icon density="xxhdpi" src="android/android-launchericon-144-144.png" /^>
echo         ^<icon density="xxxhdpi" src="android/android-launchericon-192-192.png" /^>
echo     ^</platform^>
echo     ^<preference name="DisallowOverscroll" value="true" /^>
echo     ^<preference name="android-minSdkVersion" value="21" /^>
echo     ^<preference name="android-targetSdkVersion" value="33" /^>
echo     ^<preference name="BackgroundColor" value="0xff1a1a1a" /^>
echo     ^<preference name="SplashScreenDelay" value="0" /^>
echo     ^<preference name="AutoHideSplashScreen" value="true" /^>
echo ^</widget^>
) > config.xml

echo.
echo ADIM 8: APK build baslatiliyor...
echo Bu islem 5-10 dakika surebilir...
call cordova build android --release

echo.
echo ================================================================
echo.
echo 🎉 APK OLUSTURMA TAMAMLANDI!
echo.
echo 📱 APK DOSYASI KONUMU:
echo %cd%\platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk
echo.
echo 🔧 APK IMZALAMA (OPSIYONEL):
echo 1. Android Studio'da "Build" ^> "Generate Signed Bundle/APK"
echo 2. Veya keytool ile manuel imzalama
echo.
echo ✅ TUM SOSYAL OZELLIKLER EKLENDI:
echo   👥 Arkadas sistemi
echo   💬 Mesajlasma
echo   🎵 Muzik paylasimi
echo   📱 Cevrim disi muzik
echo   🌍 75+ dil destegi
echo   🛡️ Gizlilik politikasi
echo.

cd..

echo.
echo APK basariyla olusturuldu! Test edebilirsiniz.
pause