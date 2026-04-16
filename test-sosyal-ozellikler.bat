@echo off
echo 🎵 H-SOUND PRO - SOSYAL OZELLIKLER TEST
echo =====================================
echo.

echo 📱 UYGULAMA OZELLIKLERI:
echo.
echo 🤝 ARKADAS YONETIMI:
echo   ✅ Arkadas ekleme (kullanici adi ile)
echo   ✅ Arkadas listesi goruntuleme
echo   ✅ Online/offline durum
echo   ✅ Arkadas silme
echo.
echo 💬 MESAJLASMA:
echo   ✅ Gercek zamanli chat
echo   ✅ Mesaj gecmisi
echo   ✅ Zaman damgasi
echo   ✅ Okundu bilgisi
echo.
echo 🎶 MUZIK OZELLIKLERI:
echo   ✅ Muzik paylasimi
echo   ✅ Ortak dinleme
echo   ✅ Muzik indirme
echo   ✅ Cevrim disi mod
echo   ✅ Ortak calma listeleri
echo.
echo 📋 DEMO VERILER:
echo   👥 Arkadas: ahmet_music, elif_beats, can_melody
echo   🎵 Sarki: Sezen Aksu, Tarkan sarkilari
echo   💬 Mesaj: Hazir demo konusmalar
echo.

echo 🚀 TEST BASLATIILIYOR...
echo.
echo 1. Bagimliliklar kontrol ediliyor...
if not exist node_modules (
    echo Bagimliliklar yukleniyor...
    call npm install
)

echo.
echo 2. Expo development server baslatiliyor...
echo.
echo 📱 TELEFONDA TEST ETMEK ICIN:
echo   1. Expo Go uygulamasini indirin
echo   2. QR kodu tarayin
echo   3. Uygulamayi test edin
echo.
echo 🔑 DEMO HESAPLAR:
echo   user / user123
echo   admin / admin123
echo   superadmin / super123
echo.

call npx expo start

pause