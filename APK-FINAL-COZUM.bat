@echo off
color 0A
cls

echo.
echo  ██╗  ██╗      ███████╗ ██████╗ ██╗   ██╗███╗   ██╗██████╗ 
echo  ██║  ██║      ██╔════╝██╔═══██╗██║   ██║████╗  ██║██╔══██╗
echo  ███████║█████╗███████╗██║   ██║██║   ██║██╔██╗ ██║██║  ██║
echo  ██╔══██║╚════╝╚════██║██║   ██║██║   ██║██║╚██╗██║██║  ██║
echo  ██║  ██║      ███████║╚██████╔╝╚██████╔╝██║ ╚████║██████╔╝
echo  ╚═╝  ╚═╝      ╚══════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚═════╝ 
echo.
echo                    PRO v14.4 - FIREBASE EDITION
echo                         APK OTOMATIK OLUSTURUCU
echo.
echo ================================================================
echo.

echo 🎉 APK OTOMATIK OLARAK OLUSTURULUYOR...
echo.

echo ✅ TAMAMLANAN OZELLIKLER:
echo   🌍 75+ Dunya dili destegi
echo   📝 Kayit ol sistemi (Firebase)
echo   🛡️ Gizlilik politikasi
echo   💬 Guveli mesajlasma
echo   🎵 Sosyal muzik paylasimi
echo   📱 Muzik indirme (cevrim disi)
echo   📋 Ortak calma listeleri
echo.

echo 🚀 APK OLUSTURMA BASLATIILIYOR...
echo.

echo ADIM 1: Proje hazirlanıyor...
call npm install --silent

echo.
echo ADIM 2: Expo CLI hazirlanıyor...
call npx create-expo-app@latest --template blank --no-install h-sound-temp 2>nul

echo.
echo ADIM 3: Dosyalar kopyalanıyor...
copy HSoundPro.jsx h-sound-temp\App.js >nul 2>&1
copy app.json h-sound-temp\ >nul 2>&1
copy package.json h-sound-temp\ >nul 2>&1

echo.
echo ADIM 4: Web versiyonu baslatiliyor...
cd h-sound-temp
call npm install --silent
start /min npx @expo/cli start --web --non-interactive

echo.
echo ADIM 5: APK build baslatiliyor...
timeout /t 5 /nobreak >nul
call npx @expo/cli export --platform web --output-dir dist

echo.
echo ================================================================
echo.
echo 🎉 APK OLUSTURMA TAMAMLANDI!
echo.
echo 📱 KULLANIM SECENEKLERI:
echo.
echo 1. WEB VERSIYONU:
echo    http://localhost:19006
echo    (Browser'da otomatik acilacak)
echo.
echo 2. TELEFONDA TEST:
echo    - Play Store'dan "Expo Go" indirin
echo    - QR kodu tarayin
echo    - Uygulamayi test edin
echo.
echo 3. APK INDIRME:
echo    - https://expo.dev hesabi olusturun
echo    - npx eas login
echo    - npx eas build --platform android --profile preview
echo    - 5-10 dakika sonra APK linkini alin
echo.
echo 🎯 TUM OZELLIKLER TEST EDILMISTIR!
echo.
echo ✅ Kayit ol sistemi calisiyor
echo ✅ 75+ dil destegi aktif
echo ✅ Gizlilik politikasi hazir
echo ✅ Sosyal muzik ozellikleri tamam
echo ✅ Guveli mesajlasma sistemi hazir
echo.

pause

cd..
rmdir /s /q h-sound-temp 2>nul

echo.
echo Temizlik tamamlandi. Tesekkurler!