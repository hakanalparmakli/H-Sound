# 🎵 Cordova ile Arka Plan Müzik APK

## ✅ Özellikler

- 🎵 Arka planda müzik çalma
- 🔔 Bildirim kontrolü (Çal/Duraklat/İleri/Geri)
- 📱 Ekran kapalı çalışma
- 🔒 Wake Lock
- 📲 Tam native deneyim

---

## 🚀 Kurulum (Adım Adım)

### Adım 1: Node.js Kontrol

```bash
node --version
npm --version
```

Yoksa: https://nodejs.org/ (LTS versiyonu)

---

### Adım 2: Cordova Kur

```bash
npm install -g cordova
```

---

### Adım 3: Proje Oluştur

```bash
cordova create hsound com.hsound.app H-Sound
cd hsound
```

---

### Adım 4: Dosyaları Kopyala

`www/` klasörüne şu dosyaları kopyalayın:
- index.html
- music-player.html
- manifest.json
- sw.js
- icon.png
- admin.html
- superadmin.html
- create-hakan.html
- test-api.html
- (Tüm HTML, CSS, JS dosyaları)

**ÖNEMLİ:** `www/` klasöründeki eski dosyaları silin, sadece sizin dosyalarınız kalsın.

---

### Adım 5: Android Ekle

```bash
cordova platform add android
```

---

### Adım 6: Arka Plan Plugin'leri Ekle

```bash
# Arka plan modu
cordova plugin add cordova-plugin-background-mode

# Müzik kontrolleri (bildirim)
cordova plugin add cordova-plugin-music-controls2

# Wake Lock (ekran kapalı çalışma)
cordova plugin add cordova-plugin-wakeup

# Medya (ses çalma)
cordova plugin add cordova-plugin-media

# Whitelist (güvenlik)
cordova plugin add cordova-plugin-whitelist
```

---

### Adım 7: config.xml Düzenle

`config.xml` dosyasını açın ve düzenleyin:

```xml
<?xml version='1.0' encoding='utf-8'?>
<widget id="com.hsound.app" version="1.0.0" xmlns="http://www.w3.org/ns/widgets">
    <name>H-Sound</name>
    <description>Modern müzik çalar uygulaması</description>
    <author email="alparmaklih@gmail.com" href="https://h-sound.netlify.app">
        Hakan Yusuf Alparmaklı
    </author>
    
    <content src="index.html" />
    
    <!-- Arka plan çalışma izinleri -->
    <preference name="BackgroundColor" value="0xff1a1a1a" />
    <preference name="Orientation" value="portrait" />
    <preference name="DisallowOverscroll" value="true" />
    <preference name="android-minSdkVersion" value="24" />
    <preference name="android-targetSdkVersion" value="33" />
    
    <!-- Arka plan modu ayarları -->
    <preference name="BackgroundModeEnabled" value="true" />
    <preference name="BackgroundModeTitle" value="H-Sound" />
    <preference name="BackgroundModeText" value="Müzik çalıyor..." />
    <preference name="BackgroundModeColor" value="3498DB" />
    <preference name="BackgroundModeIcon" value="icon" />
    <preference name="BackgroundModeSilent" value="false" />
    
    <!-- Network erişimi -->
    <access origin="*" />
    <allow-navigation href="*" />
    <allow-intent href="http://*/*" />
    <allow-intent href="https://*/*" />
    
    <!-- Android izinleri -->
    <platform name="android">
        <icon density="ldpi" src="www/icon.png" />
        <icon density="mdpi" src="www/icon.png" />
        <icon density="hdpi" src="www/icon.png" />
        <icon density="xhdpi" src="www/icon.png" />
        <icon density="xxhdpi" src="www/icon.png" />
        <icon density="xxxhdpi" src="www/icon.png" />
        
        <!-- Arka plan çalışma izinleri -->
        <config-file parent="/*" target="AndroidManifest.xml">
            <uses-permission android:name="android.permission.INTERNET" />
            <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
            <uses-permission android:name="android.permission.WAKE_LOCK" />
            <uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
            <uses-permission android:name="android.permission.REQUEST_IGNORE_BATTERY_OPTIMIZATIONS" />
            <uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
        </config-file>
    </platform>
</widget>
```

---

### Adım 8: Cordova.js Entegrasyonu

`www/music-player.html` dosyasının `<head>` bölümüne ekleyin:

```html
<script type="text/javascript" src="cordova.js"></script>
```

Ve `<script>` bölümünün başına ekleyin:

```javascript
// Cordova hazır olduğunda
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    console.log('✅ Cordova hazır!');
    
    // Arka plan modunu etkinleştir
    if (cordova.plugins.backgroundMode) {
        cordova.plugins.backgroundMode.enable();
        cordova.plugins.backgroundMode.setDefaults({
            title: 'H-Sound',
            text: 'Müzik çalıyor...',
            icon: 'icon',
            color: '3498DB',
            resume: true,
            hidden: false,
            bigText: false,
            silent: false
        });
        
        console.log('✅ Arka plan modu aktif');
    }
    
    // Müzik kontrollerini ayarla
    if (MusicControls) {
        setupMusicControls();
    }
}

// Müzik kontrolleri (bildirim)
function setupMusicControls() {
    MusicControls.create({
        track: 'Şarkı Adı',
        artist: 'Sanatçı',
        cover: 'https://i.ytimg.com/vi/videoId/mqdefault.jpg',
        isPlaying: true,
        dismissable: false,
        hasPrev: true,
        hasNext: true,
        hasClose: false,
        
        // iOS
        album: 'H-Sound',
        duration: 0,
        elapsed: 0,
        
        // Android
        ticker: 'H-Sound - Müzik Çalıyor'
    }, onSuccess, onError);
    
    // Kontrol butonları
    MusicControls.subscribe(function(action) {
        const message = JSON.parse(action).message;
        
        switch(message) {
            case 'music-controls-play':
                // Çal
                playPauseBtn.click();
                break;
            case 'music-controls-pause':
                // Duraklat
                playPauseBtn.click();
                break;
            case 'music-controls-next':
                // Sonraki
                nextBtn.click();
                break;
            case 'music-controls-previous':
                // Önceki
                prevBtn.click();
                break;
        }
    });
    
    // Bildirim kapatıldığında
    MusicControls.listen();
}

function onSuccess() {
    console.log('✅ Müzik kontrolleri hazır');
}

function onError(err) {
    console.error('❌ Müzik kontrolleri hatası:', err);
}

// Şarkı değiştiğinde bildirimi güncelle
function updateMusicControls(song) {
    if (MusicControls) {
        MusicControls.updateIsPlaying(true);
        MusicControls.updateMetadata({
            track: song.title,
            artist: song.artist,
            cover: song.thumbnail
        });
    }
}
```

---

### Adım 9: APK Oluştur

```bash
cordova build android
```

**APK Yolu:**
```
platforms/android/app/build/outputs/apk/debug/app-debug.apk
```

---

### Adım 10: Telefona Yükle

**USB ile:**
```bash
adb install platforms/android/app/build/outputs/apk/debug/app-debug.apk
```

**Manuel:**
1. APK'yı telefona gönder
2. Dosya yöneticisinden aç
3. "Bilinmeyen kaynaklardan yükleme" izni ver
4. Yükle

---

## 🎵 Özellikler

### ✅ Arka Plan Çalışma
- Uygulama kapatılsa bile müzik çalar
- Ekran kapansa bile çalar
- Diğer uygulamalar açılsa bile çalar

### ✅ Bildirim Kontrolü
- ▶️ Çal/Duraklat butonu
- ⏭️ Sonraki şarkı
- ⏮️ Önceki şarkı
- 🎵 Şarkı adı ve sanatçı
- 🖼️ Albüm kapağı

### ✅ Pil Optimizasyonu
- Arka planda verimli çalışır
- Gereksiz kaynak kullanmaz

---

## 🔧 Sorun Giderme

### "Arka planda çalışmıyor"

**Çözüm 1: Pil Optimizasyonunu Kapat**
```
Ayarlar → Uygulamalar → H-Sound → Pil → Optimize edilmesin
```

**Çözüm 2: Arka Plan Kısıtlamasını Kaldır**
```
Ayarlar → Uygulamalar → H-Sound → Pil → Arka plan kısıtlaması yok
```

**Çözüm 3: Otomatik Başlatmayı Aç**
```
Ayarlar → Uygulamalar → H-Sound → Otomatik başlatma → Aç
```

---

### "Bildirim görünmüyor"

**Çözüm:**
```
Ayarlar → Uygulamalar → H-Sound → Bildirimler → Aç
```

---

### "Müzik durduruluyor"

**Çözüm:**
```javascript
// music-player.html'de
cordova.plugins.backgroundMode.on('activate', function() {
    cordova.plugins.backgroundMode.disableWebViewOptimizations();
});
```

---

## 📝 Tam Entegrasyon Kodu

`www/music-player.html` dosyasına eklenecek kod:

```javascript
// Cordova hazır
document.addEventListener('deviceready', function() {
    console.log('✅ Cordova hazır');
    
    // Arka plan modu
    if (cordova.plugins.backgroundMode) {
        cordova.plugins.backgroundMode.enable();
        cordova.plugins.backgroundMode.setDefaults({
            title: 'H-Sound',
            text: 'Müzik çalıyor...',
            icon: 'icon',
            color: '3498DB'
        });
        
        // Arka planda optimizasyonları kapat
        cordova.plugins.backgroundMode.on('activate', function() {
            cordova.plugins.backgroundMode.disableWebViewOptimizations();
        });
    }
    
    // Müzik kontrolleri
    if (typeof MusicControls !== 'undefined') {
        MusicControls.create({
            track: 'H-Sound',
            artist: 'Müzik Çalar',
            cover: 'www/icon.png',
            isPlaying: false,
            dismissable: false,
            hasPrev: true,
            hasNext: true,
            hasClose: false
        });
        
        MusicControls.subscribe(function(action) {
            const message = JSON.parse(action).message;
            
            if (message === 'music-controls-play' || message === 'music-controls-pause') {
                document.getElementById('play-pause-btn').click();
            } else if (message === 'music-controls-next') {
                document.getElementById('next-btn').click();
            } else if (message === 'music-controls-previous') {
                document.getElementById('prev-btn').click();
            }
        });
        
        MusicControls.listen();
    }
}, false);

// Şarkı çalarken bildirimi güncelle
function updateNotification(song, isPlaying) {
    if (typeof MusicControls !== 'undefined') {
        MusicControls.updateIsPlaying(isPlaying);
        MusicControls.updateMetadata({
            track: song.title,
            artist: song.artist,
            cover: song.thumbnail
        });
    }
}
```

---

## ✨ Sonuç

Bu kurulumla:
- ✅ Arka planda çalışır
- ✅ Bildirim kontrolü var
- ✅ Ekran kapalı çalışır
- ✅ Pil dostu
- ✅ Tam native deneyim

**APK oluşturun ve test edin!**

---

## 📞 Yardım

Hangi adımda takıldınız?
- Plugin kurulumu?
- config.xml düzenleme?
- Kod entegrasyonu?
- APK oluşturma?

Söyleyin, yardımcı olayım!
