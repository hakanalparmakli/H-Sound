# 🚀 APK Oluşturma - Basit Çözüm

## Sorun
Gradle 8.13 JNI library hatası veriyor. Windows Defender veya antivirüs engelliyor olabilir.

## ✅ Çözüm: Android Studio Kullan

### 1. Android Studio'yu Aç
```
C:\Program Files\Android\Android Studio\bin\studio64.exe
```

### 2. Projeyi Aç
- **File → Open**
- `C:\Users\Hakan\hsound\platforms\android` klasörünü seç
- **OK** tıkla

### 3. Gradle Sync Bekle
- Alt tarafta "Gradle sync" otomatik başlayacak
- 2-3 dakika bekle

### 4. APK Oluştur
- **Build → Build Bundle(s) / APK(s) → Build APK(s)**
- Veya **Build → Make Project** (Ctrl+F9)

### 5. APK Dosyası
```
C:\Users\Hakan\hsound\platforms\android\app\build\outputs\apk\debug\app-debug.apk
```

---

## 🎯 Alternatif: Gradle Wrapper'ı Düzelt

Eğer Android Studio yoksa:

```powershell
# 1. Gradle wrapper klasörünü sil
Remove-Item -Recurse -Force C:\Users\Hakan\.gradle\wrapper

# 2. Gradle daemon'ları durdur
taskkill /F /IM java.exe

# 3. Tekrar dene
cd C:\Users\Hakan\hsound
cordova build android
```

---

## 📱 APK'yı Telefona Yükle

1. APK dosyasını telefona at (WhatsApp, USB, vb.)
2. Telefonda dosyayı aç
3. "Bilinmeyen kaynaklardan yükleme" iznini ver
4. Yükle

---

## ✅ Özet

**En kolay yöntem:** Android Studio ile build et!

- ✅ Version 14.4
- ✅ 4 API Key
- ✅ Arka plan çalma izinleri
- ✅ Custom icon'lar
- ✅ Android SDK 34

**APK hazır olunca test et!** 🎵
