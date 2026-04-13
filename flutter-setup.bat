@echo off
echo H-Sound Flutter Projesi Olusturuluyor...
echo ========================================

echo 1. Flutter PATH kontrol ediliyor...
set PATH=C:\flutter\bin;%PATH%

echo 2. Flutter doctor calistiriliyor...
flutter doctor

echo 3. Flutter projesi olusturuluyor...
flutter create h_sound_mobile

echo 4. Proje klasorune geciliyor...
cd h_sound_mobile

echo 5. Ozel dosyalar kopyalaniyor...
copy ..\main.dart lib\main.dart
copy ..\pubspec.yaml pubspec.yaml

echo 6. Dependencies yukleniyor...
flutter pub get

echo 7. Proje hazir!
echo Calistirmak icin: flutter run
echo APK olusturmak icin: flutter build apk --release

pause