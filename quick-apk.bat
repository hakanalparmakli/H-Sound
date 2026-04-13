@echo off
echo H-Sound Flutter APK Builder
echo ===========================

echo 1. Flutter PATH ayarlaniyor...
set PATH=C:\flutter\bin;%PATH%

echo 2. Yeni Flutter projesi olusturuluyor...
C:\flutter\bin\flutter.bat create --project-name h_sound --org com.hsound h_sound_app

echo 3. Proje klasorune geciliyor...
cd h_sound_app

echo 4. Main.dart dosyasi guncelleniyor...
echo Dosya kopyalaniyor...

echo 5. Dependencies yukleniyor...
C:\flutter\bin\flutter.bat pub get

echo 6. APK olusturuluyor...
C:\flutter\bin\flutter.bat build apk --release

echo 7. APK hazir!
echo Dosya konumu: build\app\outputs\flutter-apk\app-release.apk

pause