@echo off
echo H-Sound Cordova APK Builder
echo ===========================

echo 1. Node.js ve npm kontrol ediliyor...
node --version
npm --version

echo 2. Cordova global kurulumu...
npm install -g cordova

echo 3. Cordova projesi olusturuluyor...
cordova create hsound-app com.hsound.app "H-Sound"

echo 4. Proje klasorune geciliyor...
cd hsound-app

echo 5. Mevcut dosyalar kopyalaniyor...
copy ..\index.html www\index.html
copy ..\music-player.html www\music-player.html
copy ..\sw.js www\sw.js
copy ..\manifest.json www\manifest.json

echo 6. Android platformu ekleniyor...
cordova platform add android

echo 7. Config.xml guncelleniyor...
echo ^<?xml version='1.0' encoding='utf-8'?^> > config.xml
echo ^<widget id="com.hsound.app" version="1.0.0" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0"^> >> config.xml
echo     ^<name^>H-Sound^</name^> >> config.xml
echo     ^<description^>Modern Music Player^</description^> >> config.xml
echo     ^<author email="dev@hsound.com" href="http://hsound.com"^>H-Sound Team^</author^> >> config.xml
echo     ^<content src="index.html" /^> >> config.xml
echo     ^<allow-intent href="http://*/*" /^> >> config.xml
echo     ^<allow-intent href="https://*/*" /^> >> config.xml
echo     ^<platform name="android"^> >> config.xml
echo         ^<allow-intent href="market:*" /^> >> config.xml
echo         ^<preference name="Orientation" value="portrait" /^> >> config.xml
echo         ^<preference name="Fullscreen" value="true" /^> >> config.xml
echo     ^</platform^> >> config.xml
echo ^</widget^> >> config.xml

echo 8. APK olusturuluyor...
cordova build android

echo 9. APK hazir!
echo Dosya konumu: platforms\android\app\build\outputs\apk\debug\app-debug.apk

pause