@echo off
echo 🎵 H-SOUND PRO v14.4 - FINAL APK BUILDER
echo ==========================================

echo 🚀 APK OLUSTURMA BASLATIILIYOR...
echo.

echo 1. Proje hazirlanıyor...
call npm install

echo.
echo 2. EAS Build baslatiliyor...
echo ONEMLI: Bu islem icin Expo hesabi gereklidir!
echo.

echo Lutfen asagidaki adımlari takip edin:
echo.
echo ADIM 1: Expo hesabi olusturun (ucretsiz)
echo   - https://expo.dev adresine gidin
echo   - Sign Up butonuna tiklayin
echo   - E-posta ve sifre ile hesap olusturun
echo.

echo ADIM 2: Terminal'de giris yapin
echo   - npx eas login
echo   - E-posta ve sifrenizi girin
echo.

echo ADIM 3: APK olusturun
echo   - npx eas build --platform android --profile preview
echo   - Build tamamlaninca APK linkini alacaksiniz
echo.

echo 🎯 SIMDILIK DEVELOPMENT SERVER BASLATILIYOR...
echo QR kod ile telefonunuzda test edebilirsiniz!
echo.

call npx @expo/cli start

pause