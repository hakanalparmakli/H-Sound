@echo off
echo Flutter SDK Duzeltiliyor...
echo ===========================

echo 1. Git kurulumu kontrol ediliyor...
git --version
if %errorlevel% neq 0 (
    echo Git bulunamadi! Git indiriliyor...
    echo https://git-scm.com/download/win adresinden Git indirin
    pause
    exit /b 1
)

echo 2. Flutter PATH ayarlaniyor...
set PATH=C:\flutter\bin;%PATH%
setx PATH "C:\flutter\bin;%PATH%" /M

echo 3. Flutter doctor calistiriliyor...
C:\flutter\bin\flutter.bat doctor

echo 4. Flutter channel stable...
C:\flutter\bin\flutter.bat channel stable

echo 5. Flutter upgrade...
C:\flutter\bin\flutter.bat upgrade

echo 6. Flutter config ayarlaniyor...
C:\flutter\bin\flutter.bat config --enable-web

echo 7. Flutter hazir!
echo Proje olusturmak icin: flutter create h_sound_mobile

pause