# 📱 H-Sound Android APK Yapımı

## 🎯 Seçenekler

### ✅ Yöntem 1: Capacitor (Önerilen - Profesyonel)

**Avantajlar:**
- Arka planda müzik çalma desteği
- Native Android özellikleri
- Push notification desteği
- Offline çalışma
- Google Play Store'a yüklenebilir

**Kurulum:**

```bash
# 1. Node.js ve npm kurulu olmalı
npm install -g @capacitor/cli

# 2. Proje klasöründe Capacitor başlat
npm init -y
npm install @capacitor/core @capacitor/cli
npx cap init "H-Sound" "com.hsound.app"

# 3. Android platformu ekle
npm install @capacitor/android
npx cap add android

# 4. Arka plan müzik çalma için plugin
npm install capacitor-music-controls-plugin
npm install @capacitor/background-task

# 5. Web dosyalarını kopyala
npx cap copy android

# 6. Android Studio'da aç
npx cap open android
```

**capacitor.config.json:**
```json
{
  "appId": "com.hsound.app",
  "appName": "H-Sound",
  "webDir": ".",
  "bundledWebRuntime": false,
  "server": {
    "url": "https://your-netlify-url.netlify.app",
    "cleartext": true
  }
}
```

---

### ✅ Yöntem 2: PWA Builder (En Kolay - Hızlı)

**Avantajlar:**
- Çok kolay, kod yazmaya gerek yok
- Otomatik APK oluşturma
- PWA özelliklerini kullanır

**Adımlar:**

1. **PWA Hazırlığı (Zaten var!):**
   - ✅ `manifest.json` mevcut
   - ✅ Service Worker ekleyin (aşağıda)

2. **PWABuilder.com'a git:**
   - https://www.pwabuilder.com/
   - Netlify URL'nizi girin
   - "Build My PWA" tıklayın
   - Android seçin ve APK indir

---

### ✅ Yöntem 3: Apache Cordova (Klasik)

**Kurulum:**

```bash
# 1. Cordova kur
npm install -g cordova

# 2. Proje oluştur
cordova create hsound com.hsound.app H-Sound
cd hsound

# 3. Android platform ekle
cordova platform add android

# 4. Web dosyalarını www/ klasörüne kopyala
# (index.html, music-player.html, vb.)

# 5. Arka plan müzik için plugin
cordova plugin add cordova-plugin-music-controls
cordova plugin add cordova-plugin-background-mode

# 6. APK oluştur
cordova build android --release
```

---

## 🎵 Arka Plan Müzik Çalma

### Service Worker Ekleyin (PWA için)

**sw.js dosyası oluşturun:**

```javascript
// Service Worker - Arka plan desteği
self.addEventListener('install', (event) => {
    console.log('Service Worker yüklendi');
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker aktif');
});

// Arka planda çalışma
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

// Media Session API - Bildirim kontrolü
self.addEventListener('message', (event) => {
    if (event.data.type === 'PLAY') {
        // Müzik çal
    } else if (event.data.type === 'PAUSE') {
        // Müzik duraklat
    }
});
```

**index.html'e ekleyin:**

```html
<script>
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(reg => console.log('Service Worker kayıtlı'))
        .catch(err => console.log('Service Worker hatası:', err));
}
</script>
```

---

## 📦 APK İmzalama (Google Play için)

```bash
# 1. Keystore oluştur
keytool -genkey -v -keystore hsound.keystore -alias hsound -keyalg RSA -keysize 2048 -validity 10000

# 2. APK imzala
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore hsound.keystore app-release-unsigned.apk hsound

# 3. Zipalign
zipalign -v 4 app-release-unsigned.apk hsound-release.apk
```

---

## 🎯 Önerilen Yol (Hızlı Başlangıç)

### 1. PWA Builder ile APK Oluştur (5 dakika)

```bash
# 1. Service Worker ekle
# sw.js dosyasını oluştur (yukarıdaki kod)

# 2. index.html'e service worker kaydı ekle

# 3. Netlify'e deploy et

# 4. https://www.pwabuilder.com/ adresine git
# 5. Netlify URL'ini gir
# 6. Android APK indir
```

### 2. Capacitor ile Profesyonel APK (30 dakika)

```bash
# Tam kurulum için yukarıdaki Capacitor adımlarını takip et
# Android Studio gerekli
```

---

## 🔧 Gereksinimler

### PWA Builder için:
- ✅ Manifest.json (var)
- ✅ Service Worker (eklenecek)
- ✅ HTTPS (Netlify'de var)
- ✅ İkonlar (var)

### Capacitor/Cordova için:
- Node.js (v14+)
- Android Studio
- Java JDK 11+
- Android SDK

---

## 📱 Test Etme

### APK'yı telefona yükle:

```bash
# USB ile bağla
adb install hsound-release.apk

# Veya APK dosyasını telefona gönder ve manuel yükle
```

---

## 🎵 Arka Plan Müzik için Önemli Notlar

1. **Media Session API kullanın** (music-player.html'de zaten var olabilir)
2. **Wake Lock API** - Ekran kapansa bile çalsın
3. **Background Fetch API** - Arka planda veri çekme
4. **Notification API** - Müzik kontrolü için bildirim

**music-player.html'e ekleyin:**

```javascript
// Media Session API - Bildirim kontrolü
if ('mediaSession' in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
        title: 'Şarkı Adı',
        artist: 'Sanatçı',
        album: 'H-Sound',
        artwork: [
            { src: 'icon.png', sizes: '512x512', type: 'image/png' }
        ]
    });

    navigator.mediaSession.setActionHandler('play', () => {
        // Çal
    });

    navigator.mediaSession.setActionHandler('pause', () => {
        // Duraklat
    });

    navigator.mediaSession.setActionHandler('previoustrack', () => {
        // Önceki
    });

    navigator.mediaSession.setActionHandler('nexttrack', () => {
        // Sonraki
    });
}

// Wake Lock - Ekran kapansa bile çalsın
let wakeLock = null;
async function requestWakeLock() {
    try {
        wakeLock = await navigator.wakeLock.request('screen');
        console.log('Wake Lock aktif');
    } catch (err) {
        console.error('Wake Lock hatası:', err);
    }
}
```

---

## 🚀 Hızlı Başlangıç (Şimdi Yapılacaklar)

1. **Service Worker ekle** (sw.js)
2. **Media Session API ekle** (music-player.html)
3. **PWABuilder.com'da APK oluştur**
4. **Test et!**

---

## 📞 Yardım

- Capacitor: https://capacitorjs.com/docs
- PWA Builder: https://www.pwabuilder.com/
- Cordova: https://cordova.apache.org/docs/

---

## ✨ Sonuç

**En kolay yol:** PWA Builder (5 dakika)
**En profesyonel:** Capacitor (30 dakika + Android Studio)
**Klasik yol:** Cordova (15 dakika)

Hangisini tercih ederseniz, arka planda müzik çalma için **Media Session API** ve **Service Worker** şart!
