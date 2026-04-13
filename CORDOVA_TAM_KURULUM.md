# 🎵 Cordova ile Tam Müzik Uygulaması APK Oluşturma

## ✅ Özellikler
- ✅ Bildirim kontrolü (oynat/duraklat/sonraki/önceki)
- ✅ Arka planda çalışma
- ✅ Kilit ekranı kontrolü
- ✅ Bluetooth kulaklık kontrolü
- ✅ Ekran kapalıyken çalışma
- ✅ Telefon çağrısı geldiğinde otomatik duraklama

---

## 📋 Gereksinimler

### 1. Node.js (v14+)
```bash
node --version
```
Yoksa: https://nodejs.org/

### 2. Java JDK 11+
```bash
java -version
```
Yoksa: https://www.oracle.com/java/technologies/downloads/

### 3. Gradle (Otomatik kurulur)

---

## 🚀 Adım Adım Kurulum

### Adım 1: Cordova'yı Kur

```bash
npm install -g cordova
```

### Adım 2: Proje Oluştur

Proje klasörünüzün **DIŞINDA** bir yerde:

```bash
cordova create hsound com.hsound.app H-Sound
cd hsound
```

### Adım 3: Plugin'leri Kur

```bash
# Arka plan modu
cordova plugin add cordova-plugin-background-mode

# Müzik kontrolü
cordova plugin add cordova-plugin-music-controls2

# Medya
cordova plugin add cordova-plugin-media

# Ekran açık tutma
cordova plugin add cordova-plugin-insomnia

# Durum çubuğu
cordova plugin add cordova-plugin-statusbar

# Ağ durumu
cordova plugin add cordova-plugin-network-information
```

### Adım 4: Web Dosyalarını Kopyala

`hsound/www/` klasörüne şu dosyaları kopyalayın:

**Kopyalanacak dosyalar:**
- ✅ index.html
- ✅ music-player.html
- ✅ manifest.json
- ✅ sw.js
- ✅ icon.png
- ✅ cordova-music-controls.js (YENİ!)
- ✅ netlify/ klasörü (tamamı)

**www/ klasöründeki eski dosyaları silin!**

### Adım 5: config.xml Düzenle

`hsound/config.xml` dosyasını açın ve içeriğini `CORDOVA_CONFIG_ORNEGI.xml` dosyasındaki ile değiştirin.

### Adım 6: Android Platform Ekle

```bash
cordova platform add android
```

### Adım 7: JAVA_HOME Ayarla (Eğer hata alırsanız)

**Windows:**
```bash
setx JAVA_HOME "C:\Program Files\Eclipse Adoptium\jdk-17.0.13.11-hotspot"
```

Terminali kapatıp yeniden açın.

### Adım 8: APK Oluştur

```bash
cordova build android
```

### Adım 9: APK'yı Bul

APK dosyası:
```
hsound/platforms/android/app/build/outputs/apk/debug/app-debug.apk
```

### Adım 10: Telefona Yükle

1. APK'yı telefona gönderin
2. "Bilinmeyen kaynaklardan yükleme" izni verin
3. Yükleyin ve test edin!

---

## 🎯 Hızlı Komutlar (Özet)

```bash
# 1. Cordova kur
npm install -g cordova

# 2. Proje oluştur
cordova create hsound com.hsound.app H-Sound
cd hsound

# 3. Plugin'leri kur
cordova plugin add cordova-plugin-background-mode
cordova plugin add cordova-plugin-music-controls2
cordova plugin add cordova-plugin-media
cordova plugin add cordova-plugin-insomnia

# 4. Web dosyalarını www/ klasörüne kopyala (Manuel)

# 5. config.xml düzenle (Manuel)

# 6. Android ekle
cordova platform add android

# 7. APK oluştur
cordova build android

# APK yolu: platforms/android/app/build/outputs/apk/debug/app-debug.apk
```

---

## 📱 Test Etme

APK yüklendikten sonra test edin:

1. ✅ Uygulama açılıyor mu?
2. ✅ Giriş yapılabiliyor mu?
3. ✅ Müzik çalıyor mu?
4. ✅ Arka plana alınca çalışmaya devam ediyor mu?
5. ✅ Bildirimde kontroller çalışıyor mu? (oynat/duraklat/sonraki/önceki)
6. ✅ Kilit ekranında kontroller görünüyor mu?
7. ✅ Bluetooth kulaklık butonları çalışıyor mu?
8. ✅ Telefon çağrısı gelince duraklatıyor mu?

---

## ⚠️ Olası Hatalar ve Çözümleri

### Hata 1: JAVA_HOME bulunamadı
```bash
setx JAVA_HOME "C:\Program Files\Eclipse Adoptium\jdk-17.0.13.11-hotspot"
```
Terminali kapatıp yeniden açın.

### Hata 2: Gradle hatası
```bash
cd platforms/android
gradlew clean
cd ../..
cordova build android
```

### Hata 3: Plugin hatası
```bash
cordova plugin remove cordova-plugin-music-controls2
cordova plugin add cordova-plugin-music-controls2
```

### Hata 4: Android SDK bulunamadı
Android Studio'yu indirin:
https://developer.android.com/studio

### Hata 5: Bildirim çalışmıyor
Telefon ayarlarından uygulama bildirimlerini açın.

---

## 🔧 Güncelleme (Yeni APK Oluşturma)

Kod değişikliği yaptıktan sonra:

```bash
# 1. Değişiklikleri www/ klasörüne kopyala
# 2. Yeniden build et
cordova build android

# Yeni APK: platforms/android/app/build/outputs/apk/debug/app-debug.apk
```

---

## 📦 Release APK (Google Play için)

Debug APK test içindir. Google Play'e yüklemek için:

```bash
# 1. Keystore oluştur (bir kez)
keytool -genkey -v -keystore hsound.keystore -alias hsound -keyalg RSA -keysize 2048 -validity 10000

# 2. Release build
cordova build android --release

# 3. İmzala
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore hsound.keystore platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk hsound

# 4. Optimize et
zipalign -v 4 platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk hsound-release.apk
```

---

## 🎉 Sonuç

Artık tam özellikli bir müzik uygulamanız var!

**Özellikler:**
- ✅ Arka planda çalışma
- ✅ Bildirim kontrolü
- ✅ Kilit ekranı kontrolü
- ✅ Bluetooth kulaklık desteği
- ✅ Ekran kapalıyken çalışma

**APK Boyutu:** ~10-15 MB

**Minimum Android:** 7.0 (API 24)

**Hedef Android:** 13 (API 33)

---

## 📞 Sorun mu var?

1. Terminali kapatıp yeniden açın
2. `cordova clean` çalıştırın
3. `cordova build android` tekrar deneyin
4. Hala sorun varsa plugin'leri kaldırıp yeniden kurun

**Başarılar! 🎵**
