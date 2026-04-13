@echo off
echo 🎵 H-SOUND PRO v14.4 - FIREBASE EDITION APK BUILDER
echo ===================================================

echo 🌍 YENI OZELLIKLER v14.4:
echo ✅ 75+ Dunya dili destegi
echo ✅ Firebase Authentication entegrasyonu
echo ✅ Kayit ol ozelligi eklendi
echo ✅ Gizlilik politikasi modali
echo ✅ Guveli mesajlasma sistemi
echo ✅ Demo hesaplar kaldirildi
echo.

echo 🎵 SOSYAL MUZIK OZELLIKLERI:
echo ✅ Arkadas ekleme ve yonetimi
echo ✅ Gercek zamanli mesajlasma
echo ✅ Ortak muzik calma
echo ✅ Ortak calma listeleri  
echo ✅ Muzik indirme ve cevrim disi
echo ✅ Mesajda muzik paylasimi
echo.

echo 🔧 APK OLUSTURMA ADIMLARI:
echo.

echo 1. EAS CLI kurulumu...
call npm install -g @expo/cli eas-cli

echo 2. Bagimliliklar yukleniyor...
call npm install

echo 3. EAS projesi yapilandiriliyor...
call npx eas build:configure

echo 4. Android APK olusturuluyor...
echo Bu islem 5-10 dakika surebilir...
call npx eas build --platform android --profile preview

echo.
echo 🎉 APK HAZIR!
echo APK dosyasi EAS dashboard'dan indirilebilir.
echo Link: https://expo.dev/accounts/[username]/projects/h-sound-mobile/builds
echo.

pause