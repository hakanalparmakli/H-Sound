# 🎵 Arka Plan Müzik Çalma - Config.xml Güncelleme

## 📝 Adımlar

### 1. Config.xml'i Aç
```powershell
notepad C:\Users\Hakan\hsound\config.xml
```

### 2. Bu Ayarları Ekle/Güncelle

```xml
<?xml version='1.0' encoding='utf-8'?>
<widget id="com.hsound.app" version="1.0.0" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">
    <name>H-Sound</name>
    <description>Modern müzik çalar uygulaması</description>
    <author email="alparmaklih@gmail.com" href="https://h-sound.netlify.app">
        Hakan Yusuf Alparmaklı
    </author>
    
    <content src="index.html" />
    
    <access origin="*" />
    <allow-intent href="http://*/*" />
    <allow-intent href="https://*/*" />
    <allow-navigation href="*" />
    
    <!-- ARKA PLAN ÇALMA İÇİN ÖNEMLİ -->
    <preference name="KeepRunning" value="true" />
    <preference name="DisallowOverscroll" value="true" />
    <preference name="android-minSdkVersion" value="24" />
    <preference name="android-targetSdkVersion" value="33" />
    <preference name="BackupWebStorage" value="local" />
    <preference name="Orientation" value="portrait" />
    <preference name="LoadUrlTimeoutValue" value="700000" />
    
    <!-- Android Platform -->
    <platform name="android">
        <allow-intent href="market:*" />
        
        <!-- Icon'lar -->
        <icon density="ldpi" src="res/icon/android/ldpi.png" />
        <icon density="mdpi" src="res/icon/android/mdpi.png" />
        <icon density="hdpi" src="res/icon/android/hdpi.png" />
        <icon density="xhdpi" src="res/icon/android/xhdpi.png" />
        <icon density="xxhdpi" src="res/icon/android/xxhdpi.png" />
        <icon density="xxxhdpi" src="res/icon/android/xxxhdpi.png" />
        
        <!-- ARKA PLAN MÜZİK İZİNLERİ -->
        <config-file parent="/*" target="AndroidManifest.xml">
            <uses-permission android:name="android.permission.INTERNET" />
            <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
            <uses-permission android:name="android.permission.WAKE_LOCK" />
            <uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
            <uses-permission android:name="android.permission.FOREGROUND_SERVICE_MEDIA_PLAYBACK" />
            <uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
            <uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />
            <uses-permission android:name="android.permission.READ_PHONE_STATE" />
            <uses-permission android:name="android.permission.BLUETOOTH" />
            <uses-permission android:name="android.permission.BLUETOOTH_CONNECT" />
        </config-file>
        
        <!-- Arka plan modu ayarları -->
        <preference name="BackgroundColor" value="0xff1a1a1a" />
        <preference name="AndroidLaunchMode" value="singleTask" />
    </platform>
</widget>
```

### 3. Kaydet ve Kapat

### 4. APK'yı Yeniden Oluştur
```powershell
cd C:\Users\Hakan\hsound
cordova build android
```

---

## 🎯 Önemli İzinler

| İzin | Açıklama |
|------|----------|
| `WAKE_LOCK` | Ekran kapansa bile çalmaya devam eder |
| `FOREGROUND_SERVICE` | Arka planda servis çalıştırır |
| `FOREGROUND_SERVICE_MEDIA_PLAYBACK` | Medya çalma servisi |
| `POST_NOTIFICATIONS` | Bildirim gösterir (oynat/duraklat) |
| `MODIFY_AUDIO_SETTINGS` | Ses ayarlarını kontrol eder |

---

## ✅ Test Et

1. APK'yı yükle
2. Müzik çal
3. Ana ekrana dön veya ekranı kapat
4. Müzik çalmaya devam etmeli! 🎵

**Not:** Bazı telefonlarda "Pil Optimizasyonu"nu kapatman gerekebilir:
- Ayarlar → Uygulamalar → H-Sound → Pil → Optimize Etme
