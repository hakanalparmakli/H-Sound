@echo off
echo Flutter Proje Olusturucu
echo =========================

echo Flutter kurulu mu kontrol ediliyor...
flutter --version
if %errorlevel% neq 0 (
    echo HATA: Flutter kurulu degil!
    echo Lutfen once Flutter'i kurun.
    pause
    exit /b 1
)

echo Flutter projesi olusturuluyor...
flutter create h_sound_mobile

echo Proje klasorune geciliyor...
cd h_sound_mobile

echo Ozel dosyalar kopyalaniyor...
if exist "..\main.dart" (
    copy "..\main.dart" "lib\main.dart"
    echo main.dart kopyalandi
)

if exist "..\pubspec.yaml" (
    copy "..\pubspec.yaml" "pubspec.yaml"
    echo pubspec.yaml kopyalandi
)

echo Bagimliliklar yukleniyor...
flutter pub get

echo Proje hazir!
echo.
echo Kullanim:
echo - flutter run           : Uygulamayi calistir
echo - flutter build apk     : APK olustur
echo.
pause