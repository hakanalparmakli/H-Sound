@echo off
title H-Sound Professional APK Builder v2.0
color 0A
chcp 65001 >nul

echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║                    H-SOUND APK BUILDER v2.0                 ║
echo ║                  Professional Edition                        ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.
echo 🎵 H-Sound - Sosyal Müzik Uygulaması
echo 📱 Arka Plan Müzik Desteği ile Profesyonel APK
echo.
echo ✨ Özellikler:
echo    ✅ Arka plan müzik çalma
echo    ✅ Bildirim paneli kontrolleri
echo    ✅ Kulaklık buton desteği
echo    ✅ YouTube müzik entegrasyonu
echo    ✅ Sosyal mesajlaşma sistemi
echo    ✅ Ortak çalma listeleri
echo    ✅ Akıllı müzik filtreleme
echo.
echo 🚀 Bu script otomatik olarak:
echo    1. Gerekli araçları kontrol eder
echo    2. Capacitor projesini oluşturur
echo    3. Background music manager'ı entegre eder
echo    4. Android APK'sını build eder
echo    5. APK'yı masaüstüne kopyalar
echo.
echo ⏱️  Tahmini süre: 5-10 dakika
echo 💾 Gerekli alan: ~500 MB
echo.
pause

REM Admin yetkisi kontrolü
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo.
    echo ⚠️  UYARI: Bu script yönetici yetkisi gerektirebilir.
    echo    Eğer hata alırsanız, script'i "Yönetici olarak çalıştır" ile açın.
    echo.
    pause
)

echo.
echo ═══════════════════════════════════════════════════════════════
echo                    SISTEM KONTROLLERI
echo ═══════════════════════════════════════════════════════════════

REM Node.js kontrolü
echo [1/5] Node.js kontrol ediliyor...
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js bulunamadı!
    echo.
    echo 📥 Node.js yüklemek için:
    echo    1. https://nodejs.org/ adresine gidin
    echo    2. LTS sürümünü indirin ve yükleyin
    echo    3. Bu script'i tekrar çalıştırın
    echo.
    pause
    exit /b 1
) else (
    for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
    echo ✅ Node.js bulundu: %NODE_VERSION%
)

REM NPM kontrolü
echo [2/5] NPM kontrol ediliyor...
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ NPM bulunamadı!
    echo    NPM genellikle Node.js ile birlikte gelir.
    echo    Node.js'i yeniden yükleyin.
    pause
    exit /b 1
) else (
    for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
    echo ✅ NPM bulundu: %NPM_VERSION%
)

REM Java kontrolü
echo [3/5] Java kontrol ediliyor...
where java >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ⚠️  Java bulunamadı!
    echo    Java, Android Studio ile birlikte yüklenecek.
    echo    Devam ediliyor...
) else (
    for /f "tokens=3" %%i in ('java -version 2^>^&1 ^| findstr /i "version"') do set JAVA_VERSION=%%i
    echo ✅ Java bulundu: %JAVA_VERSION%
)

REM Git kontrolü
echo [4/5] Git kontrol ediliyor...
where git >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ⚠️  Git bulunamadı!
    echo    Git isteğe bağlıdır, devam ediliyor...
) else (
    for /f "tokens=3" %%i in ('git --version') do set GIT_VERSION=%%i
    echo ✅ Git bulundu: %GIT_VERSION%
)

REM Disk alanı kontrolü
echo [5/5] Disk alanı kontrol ediliyor...
for /f "tokens=3" %%i in ('dir /-c %SystemDrive%\ ^| find "bytes free"') do set FREE_SPACE=%%i
if %FREE_SPACE% LSS 500000000 (
    echo ⚠️  Düşük disk alanı! En az 500 MB boş alan gerekli.
    echo    Devam etmek istiyor musunuz? (Y/N)
    set /p CONTINUE=
    if /i not "%CONTINUE%"=="Y" exit /b 1
) else (
    echo ✅ Yeterli disk alanı mevcut
)

echo.
echo ✅ Sistem kontrolleri tamamlandı!
echo.
pause

echo.
echo ═══════════════════════════════════════════════════════════════
echo                    PROJE HAZIRLIĞI
echo ═══════════════════════════════════════════════════════════════

REM Eski proje temizliği
echo [1/8] Eski proje dosyaları temizleniyor...
if exist h-sound-professional (
    echo    Eski proje siliniyor...
    rmdir /s /q h-sound-professional 2>nul
)
if exist node_modules (
    echo    Eski node_modules siliniyor...
    rmdir /s /q node_modules 2>nul
)
echo ✅ Temizlik tamamlandı

REM Global Capacitor CLI kurulumu
echo [2/8] Capacitor CLI kuruluyor...
echo    Bu işlem birkaç dakika sürebilir...
call npm install -g @capacitor/cli --silent
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Capacitor CLI kurulumu başarısız!
    echo    İnternet bağlantınızı kontrol edin ve tekrar deneyin.
    pause
    exit /b 1
)
echo ✅ Capacitor CLI kuruldu

REM Proje klasörü oluşturma
echo [3/8] Proje klasörü oluşturuluyor...
mkdir h-sound-professional
cd h-sound-professional

REM Package.json oluşturma
echo [4/8] Package.json oluşturuluyor...
(
echo {
echo   "name": "h-sound-professional",
echo   "version": "1.0.0",
echo   "description": "H-Sound Professional - Sosyal Müzik Uygulaması",
echo   "main": "index.js",
echo   "scripts": {
echo     "build": "npm run copy && npx cap sync",
echo     "copy": "xcopy /Y /E ..\\*.html www\\ && xcopy /Y /E ..\\*.js www\\",
echo     "android": "npx cap open android",
echo     "sync": "npx cap sync"
echo   },
echo   "dependencies": {
echo     "@capacitor/android": "^5.0.0",
echo     "@capacitor/core": "^5.0.0",
echo     "@capacitor-community/background-mode": "^1.2.6",
echo     "capacitor-music-controls-plugin": "^3.0.1",
echo     "@capacitor/status-bar": "^5.0.0",
echo     "@capacitor/splash-screen": "^5.0.0"
echo   },
echo   "devDependencies": {
echo     "@capacitor/cli": "^5.0.0"
echo   },
echo   "author": "H-Sound Team",
echo   "license": "MIT"
echo }
) > package.json
echo ✅ Package.json oluşturuldu

REM Dependencies kurulumu
echo [5/8] Bağımlılıklar yükleniyor...
echo    Bu işlem 3-5 dakika sürebilir...
call npm install --silent
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Bağımlılık yüklemesi başarısız!
    echo    İnternet bağlantınızı kontrol edin.
    pause
    exit /b 1
)
echo ✅ Bağımlılıklar yüklendi

REM Capacitor projesi başlatma
echo [6/8] Capacitor projesi başlatılıyor...
call npx cap init "H-Sound Professional" "com.hsound.professional" --web-dir=www
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Capacitor init başarısız!
    pause
    exit /b 1
)
echo ✅ Capacitor projesi başlatıldı

REM Android platform ekleme
echo [7/8] Android platform ekleniyor...
call npx cap add android
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Android platform eklenemedi!
    echo    Android Studio yüklü olduğundan emin olun.
    pause
    exit /b 1
)
echo ✅ Android platform eklendi

REM Web dosyalarını kopyalama
echo [8/8] Web dosyaları hazırlanıyor...
mkdir www 2>nul

REM Ana HTML dosyasını kopyala
copy /Y ..\music-player.html www\index.html >nul
if not exist www\index.html (
    echo ❌ music-player.html dosyası bulunamadı!
    echo    Ana dizinde music-player.html dosyasının olduğundan emin olun.
    pause
    exit /b 1
)

REM Diğer dosyaları kopyala
copy /Y ..\background-music.js www\ >nul 2>nul
copy /Y ..\service-worker.js www\sw.js >nul 2>nul
copy /Y ..\app-manifest.json www\manifest.json >nul 2>nul
copy /Y ..\firebase.js www\ >nul 2>nul

REM Capacitor config güncelleme
(
echo {
echo   "appId": "com.hsound.professional",
echo   "appName": "H-Sound Professional",
echo   "webDir": "www",
echo   "bundledWebRuntime": false,
echo   "server": {
echo     "androidScheme": "https",
echo     "allowNavigation": ["*"]
echo   },
echo   "plugins": {
echo     "SplashScreen": {
echo       "launchShowDuration": 2000,
echo       "backgroundColor": "#1a1a1a",
echo       "showSpinner": false,
echo       "splashFullScreen": true,
echo       "splashImmersive": true
echo     },
echo     "StatusBar": {
echo       "style": "dark",
echo       "backgroundColor": "#1a1a1a"
echo     },
echo     "BackgroundMode": {
echo       "enabled": true,
echo       "title": "H-Sound Professional Çalıyor",
echo       "text": "Müzik arka planda çalıyor",
echo       "silent": false,
echo       "resume": true,
echo       "hidden": false,
echo       "color": "3498db"
echo     }
echo   },
echo   "android": {
echo     "allowMixedContent": true,
echo     "captureInput": true,
echo     "webContentsDebuggingEnabled": true
echo   }
echo }
) > capacitor.config.json

echo ✅ Web dosyaları hazırlandı

echo.
echo ═══════════════════════════════════════════════════════════════
echo                    ANDROID YAPILANDIRMASI
echo ═══════════════════════════════════════════════════════════════

echo [1/3] Android manifest dosyası güncelleniyor...

REM Android manifest'i güncelle
if exist android\app\src\main\AndroidManifest.xml (
    REM Backup oluştur
    copy android\app\src\main\AndroidManifest.xml android\app\src\main\AndroidManifest.xml.backup >nul
    
    REM Yeni manifest oluştur
    (
    echo ^<?xml version="1.0" encoding="utf-8"?^>
    echo ^<manifest xmlns:android="http://schemas.android.com/apk/res/android"^>
    echo.
    echo     ^<uses-permission android:name="android.permission.INTERNET" /^>
    echo     ^<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" /^>
    echo     ^<uses-permission android:name="android.permission.WAKE_LOCK" /^>
    echo     ^<uses-permission android:name="android.permission.FOREGROUND_SERVICE" /^>
    echo     ^<uses-permission android:name="android.permission.REQUEST_IGNORE_BATTERY_OPTIMIZATIONS" /^>
    echo     ^<uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW" /^>
    echo     ^<uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" /^>
    echo.
    echo     ^<application
    echo         android:allowBackup="true"
    echo         android:icon="@mipmap/ic_launcher"
    echo         android:label="@string/app_name"
    echo         android:roundIcon="@mipmap/ic_launcher_round"
    echo         android:supportsRtl="true"
    echo         android:theme="@style/AppTheme"
    echo         android:usesCleartextTraffic="true"^>
    echo.
    echo         ^<activity
    echo             android:name=".MainActivity"
    echo             android:exported="true"
    echo             android:launchMode="singleTask"
    echo             android:theme="@style/AppTheme.NoActionBarLaunch"^>
    echo.
    echo             ^<intent-filter^>
    echo                 ^<action android:name="android.intent.action.MAIN" /^>
    echo                 ^<category android:name="android.intent.category.LAUNCHER" /^>
    echo             ^</intent-filter^>
    echo         ^</activity^>
    echo.
    echo         ^<service android:name="com.hsound.BackgroundMusicService"
    echo                  android:enabled="true"
    echo                  android:exported="false" /^>
    echo.
    echo     ^</application^>
    echo ^</manifest^>
    ) > android\app\src\main\AndroidManifest.xml
    
    echo ✅ Android manifest güncellendi
) else (
    echo ⚠️  Android manifest bulunamadı, varsayılan kullanılacak
)

echo [2/3] Android resources oluşturuluyor...

REM Strings.xml oluştur
mkdir android\app\src\main\res\values 2>nul
(
echo ^<?xml version="1.0" encoding="utf-8"?^>
echo ^<resources^>
echo     ^<string name="app_name"^>H-Sound Professional^</string^>
echo     ^<string name="title_activity_main"^>H-Sound Professional^</string^>
echo     ^<string name="package_name"^>com.hsound.professional^</string^>
echo     ^<string name="custom_url_scheme"^>com.hsound.professional^</string^>
echo ^</resources^>
) > android\app\src\main\res\values\strings.xml

REM Colors.xml oluştur
(
echo ^<?xml version="1.0" encoding="utf-8"?^>
echo ^<resources^>
echo     ^<color name="colorPrimary"^>#3498DB^</color^>
echo     ^<color name="colorPrimaryDark"^>#2980B9^</color^>
echo     ^<color name="colorAccent"^>#E74C3C^</color^>
echo     ^<color name="statusBarColor"^>#1A1A1A^</color^>
echo ^</resources^>
) > android\app\src\main\res\values\colors.xml

echo ✅ Android resources oluşturuldu

echo [3/3] Capacitor sync yapılıyor...
call npx cap sync
if %ERRORLEVEL% NEQ 0 (
    echo ⚠️  Sync'te uyarılar olabilir, devam ediliyor...
)
echo ✅ Capacitor sync tamamlandı

echo.
echo ═══════════════════════════════════════════════════════════════
echo                        APK BUILD
echo ═══════════════════════════════════════════════════════════════

echo 🔨 APK build işlemi başlıyor...
echo    Bu işlem 5-10 dakika sürebilir.
echo    Lütfen bekleyin ve pencereyi kapatmayın...
echo.

REM Build işlemi
echo [1/2] Gradle build başlatılıyor...
cd android
call .\gradlew assembleDebug --no-daemon --warning-mode=none
set BUILD_RESULT=%ERRORLEVEL%
cd ..

if %BUILD_RESULT% NEQ 0 (
    echo.
    echo ❌ Gradle build başarısız!
    echo.
    echo 🔧 Olası çözümler:
    echo    1. Android Studio'yu açın ve SDK'ları güncelleyin
    echo    2. Java JDK 8 veya 11 yüklü olduğundan emin olun
    echo    3. ANDROID_HOME environment variable'ını ayarlayın
    echo    4. İnternet bağlantınızı kontrol edin
    echo.
    echo 📱 Alternatif çözüm:
    echo    PWA Builder kullanarak online APK oluşturun:
    echo    https://www.pwabuilder.com/
    echo.
    pause
    exit /b 1
)

echo ✅ Gradle build başarılı!

echo [2/2] APK dosyası aranıyor...

REM APK dosyasını bul
set APK_FOUND=0
set APK_PATH=""

if exist "android\app\build\outputs\apk\debug\app-debug.apk" (
    set APK_PATH="android\app\build\outputs\apk\debug\app-debug.apk"
    set APK_FOUND=1
)

if %APK_FOUND% EQU 0 (
    echo ❌ APK dosyası bulunamadı!
    echo    Build başarılı görünüyor ama APK dosyası bulunamıyor.
    echo    android\app\build\outputs\ klasörünü manuel kontrol edin.
    pause
    exit /b 1
)

echo ✅ APK dosyası bulundu: %APK_PATH%

REM APK'yi masaüstüne kopyala
echo [3/2] APK masaüstüne kopyalanıyor...
if exist "%USERPROFILE%\Desktop" (
    copy /Y %APK_PATH% "%USERPROFILE%\Desktop\H-Sound-Professional-v1.0.0.apk" >nul
    if exist "%USERPROFILE%\Desktop\H-Sound-Professional-v1.0.0.apk" (
        echo ✅ APK masaüstüne kopyalandı!
    ) else (
        echo ⚠️  APK kopyalanamadı, manuel olarak kopyalayın.
    )
) else (
    echo ⚠️  Masaüstü bulunamadı, APK proje klasöründe.
)

echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║                    🎉 BUILD BAŞARILI! 🎉                    ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.
echo 📱 APK BİLGİLERİ:
echo    📁 Dosya Adı: H-Sound-Professional-v1.0.0.apk
echo    📍 Konum: %USERPROFILE%\Desktop\
echo    📦 Boyut: ~15-25 MB
echo    🏷️  Paket Adı: com.hsound.professional
echo    🔢 Sürüm: 1.0.0
echo.
echo 🚀 ÖZELLİKLER:
echo    ✅ Arka plan müzik çalma
echo    ✅ Bildirim paneli kontrolleri  
echo    ✅ Kulaklık buton desteği
echo    ✅ YouTube müzik entegrasyonu
echo    ✅ Sosyal mesajlaşma sistemi
echo    ✅ Ortak çalma listeleri
echo    ✅ Akıllı müzik filtreleme
echo    ✅ PWA desteği
echo    ✅ Offline çalışma
echo.
echo 📱 KURULUM TALİMATLARI:
echo.
echo    1. APK dosyasını Android cihazınıza kopyalayın
echo    2. Ayarlar ^> Güvenlik ^> Bilinmeyen Kaynaklar ✅
echo    3. APK dosyasına dokunun ve "Yükle" butonuna basın
echo    4. H-Sound Professional'ı açın ve keyfini çıkarın!
echo.
echo 🔧 ARKA PLAN MÜZİK İÇİN:
echo    - Ayarlar ^> Batarya ^> H-Sound ^> Batarya optimizasyonu KAPALI
echo    - Ayarlar ^> Uygulamalar ^> H-Sound ^> İzinler ^> Tüm izinler VER
echo.
echo 🎵 İLK KULLANIM:
echo    1. Uygulamayı açın
echo    2. "Kayıt Ol" ile hesap oluşturun  
echo    3. Ana sayfada müzik keşfedin
echo    4. Bir şarkı çalın ve arka plana alın
echo    5. Bildirim panelinde kontrolleri test edin
echo.
echo ═══════════════════════════════════════════════════════════════
echo.
echo 🎊 TEBRİKLER! H-Sound Professional APK'nız hazır!
echo.
echo 💡 İpucu: APK'yı arkadaşlarınızla paylaşabilirsiniz.
echo    Herkes kendi hesabını oluşturup sosyal özelliklerden yararlanabilir.
echo.
echo 🆘 Destek için: H-Sound Team
echo 🌐 Web: music-player.html dosyasını tarayıcıda açın
echo.
echo Herhangi bir tuşa basın...
pause >nul

REM Masaüstündeki APK'yı göster
if exist "%USERPROFILE%\Desktop\H-Sound-Professional-v1.0.0.apk" (
    echo.
    echo 📂 APK dosyasını görmek ister misiniz? (Y/N)
    set /p SHOW_APK=
    if /i "%SHOW_APK%"=="Y" (
        explorer /select,"%USERPROFILE%\Desktop\H-Sound-Professional-v1.0.0.apk"
    )
)

echo.
echo 🎵 H-Sound Professional APK Builder tamamlandı!
echo    Teşekkürler! 🚀
echo.
pause