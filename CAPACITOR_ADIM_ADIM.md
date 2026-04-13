# 📱 Capacitor ile APK Oluşturma (Tamamen Ücretsiz)

## ✅ Gereksinimler

### 1. Node.js (Ücretsiz)
- İndir: https://nodejs.org/
- LTS versiyonu indirin (örn: 20.x)
- Kurulum: Next, Next, Finish

### 2. Android Studio (Ücretsiz)
- İndir: https://developer.android.com/studio
- Kurulum: ~10 dakika
- İlk açılışta SDK'ları indirecek (~5 GB)

### 3. Java JDK (Ücretsiz)
- Android Studio ile birlikte gelir
- Veya: https://adoptium.net/

---

## 🚀 Adım Adım Kurulum

### Adım 1: Node.js Kontrol

Terminal/CMD açın:
```bash
node --version
npm --version
```

Versiyon numaraları görünmeli. Görmüyorsanız Node.js kurun.

---

### Adım 2: Proje Klasörü

```bash
# Masaüstünde klasör oluşturun
cd Desktop
mkdir hsound-app
cd hsound-app
```

---

### Adım 3: Temel Dosyaları Kopyalayın

Şu dosyaları `hsound-app` klasörüne kopyalayın:
- index.html
- music-player.html
- manifest.json
- sw.js
- icon.png
- (Diğer tüm HTML dosyaları)

---

### Adım 4: Capacitor Kurulumu

Terminal'de (hsound-app klasöründe):

```bash
# package.json oluştur
npm init -y

# Capacitor kur
npm install @capacitor/core @capacitor/cli

# Capacitor başlat
npx cap init
```

**Sorular:**
```
? App name: H-Sound
? App package ID: com.hsound.app
? Web asset directory: . (nokta yazın)
```

---

### Adım 5: Android Ekle

```bash
# Android platform ekle
npm install @capacitor/android
npx cap add android
```

---

### Adım 6: Config Düzenle

`capacitor.config.json` dosyasını açın ve düzenleyin:

```json
{
  "appId": "com.hsound.app",
  "appName": "H-Sound",
  "webDir": ".",
  "server": {
    "url": "https://h-sound.netlify.app",
    "cleartext": true
  },
  "android": {
    "allowMixedContent": true,
    "backgroundColor": "#1A1A1A"
  }
}
```

---

### Adım 7: Sync

```bash
npx cap sync
```

Bu komut web dosyalarını Android projesine kopyalar.

---

### Adım 8: Android Studio'da Aç

```bash
npx cap open android
```

Android Studio açılacak. İlk açılışta:
- Gradle sync yapacak (~5 dakika)
- SDK'ları kontrol edecek
- Bekleyin

---

### Adım 9: APK Oluştur

Android Studio'da:

1. **Menüden:** Build → Build Bundle(s) / APK(s) → Build APK(s)
2. **Bekleyin:** ~5 dakika
3. **Bildirim gelecek:** "APK(s) generated successfully"
4. **"locate" tıklayın**

**APK Yolu:**
```
android/app/build/outputs/apk/debug/app-debug.apk
```

---

### Adım 10: Telefona Yükle

**USB ile:**
```bash
adb install app-debug.apk
```

**Manuel:**
1. APK'yı telefona gönderin (WhatsApp, Email, vb.)
2. Dosya yöneticisinden açın
3. "Bilinmeyen kaynaklardan yükleme" izni verin
4. Yükleyin

---

## 🔧 Sorun Giderme

### "Android Studio bulunamadı"

**Windows:**
```bash
set ANDROID_HOME=C:\Users\YourName\AppData\Local\Android\Sdk
set PATH=%PATH%;%ANDROID_HOME%\tools;%ANDROID_HOME%\platform-tools
```

**Mac/Linux:**
```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
```

---

### "Gradle sync failed"

Android Studio'da:
1. File → Invalidate Caches / Restart
2. Restart
3. Tekrar deneyin

---

### "SDK not found"

Android Studio'da:
1. Tools → SDK Manager
2. Android 13.0 (API 33) seçin
3. Apply → OK

---

## 📝 Alternatif: Cordova (Daha Basit)

Eğer Android Studio kurmak istemiyorsanız:

```bash
# Cordova kur
npm install -g cordova

# Proje oluştur
cordova create hsound com.hsound.app H-Sound
cd hsound

# Dosyaları www/ klasörüne kopyalayın
# (index.html, music-player.html, vb.)

# Android ekle
cordova platform add android

# APK oluştur
cordova build android
```

**APK Yolu:**
```
platforms/android/app/build/outputs/apk/debug/app-debug.apk
```

**Avantaj:** Android Studio açmadan APK oluşturur!

---

## 🎯 Hangi Yöntem?

### Capacitor:
- ✅ Modern
- ✅ Daha iyi performans
- ✅ Native özellikler
- ❌ Android Studio gerekli

### Cordova:
- ✅ Daha basit
- ✅ Android Studio gerekmez
- ✅ Komut satırından APK
- ❌ Eski teknoloji

**Önerim: Cordova ile başlayın (daha kolay)**

---

## 🚀 Cordova Hızlı Başlangıç

### 1. Cordova Kur

```bash
npm install -g cordova
```

### 2. Proje Oluştur

```bash
cordova create hsound com.hsound.app H-Sound
cd hsound
```

### 3. Dosyaları Kopyala

`www/` klasörüne şu dosyaları kopyalayın:
- index.html
- music-player.html
- manifest.json
- sw.js
- icon.png
- (Diğer tüm dosyalar)

### 4. Android Ekle

```bash
cordova platform add android
```

### 5. APK Oluştur

```bash
cordova build android
```

### 6. APK Bul

```
platforms/android/app/build/outputs/apk/debug/app-debug.apk
```

**Toplam Süre: 10 dakika**

---

## ✨ Cordova Ek Özellikler

### Arka Plan Müzik

```bash
cordova plugin add cordova-plugin-music-controls
cordova plugin add cordova-plugin-background-mode
```

### Bildirimler

```bash
cordova plugin add cordova-plugin-local-notification
```

### Dosya Erişimi

```bash
cordova plugin add cordova-plugin-file
```

---

## 📊 Karşılaştırma

| Özellik | Capacitor | Cordova |
|---------|-----------|---------|
| Kurulum | Orta | Kolay |
| Android Studio | Gerekli | Gerekmez |
| APK Oluşturma | GUI | CLI |
| Süre | 30 dk | 10 dk |
| Performans | Daha iyi | İyi |
| Önerilen | Profesyonel | Hızlı test |

---

## 🎉 Sonuç

**En Kolay Yol: Cordova**

```bash
# 1. Cordova kur
npm install -g cordova

# 2. Proje oluştur
cordova create hsound com.hsound.app H-Sound
cd hsound

# 3. Dosyaları www/ klasörüne kopyala

# 4. Android ekle
cordova platform add android

# 5. APK oluştur
cordova build android

# 6. APK bul
# platforms/android/app/build/outputs/apk/debug/app-debug.apk
```

**Toplam: 10 dakika, tamamen ücretsiz!**

---

## 📞 Yardım

Hangi adımda takıldınız?
- Node.js kurulumu?
- Cordova kurulumu?
- APK oluşturma?
- Telefona yükleme?

Söyleyin, yardımcı olayım!
