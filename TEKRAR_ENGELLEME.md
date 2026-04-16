# 🔄 Tekrar Engelleme Sistemi

## ✅ Yapılan Değişiklikler

### 1. Backend Tekrar Engelleme

**Dosya:** `netlify/edge-functions/youtube-proxy.js`

**Eklenen Fonksiyonlar:**
- `normalizeTitle()` - Başlıkları normalize eder
- `removeDuplicates()` - Tekrar eden şarkıları filtreler

### 2. Frontend Tekrar Engelleme

**Dosya:** `music-player.html`

**Eklenen Fonksiyonlar:**
- `normalizeSongTitle()` - Başlıkları normalize eder
- `removeDuplicateSongs()` - Tekrar eden şarkıları filtreler

---

## 🎯 Tekrar Engelleme Mantığı

### Adım 1: Başlık Normalizasyonu

```javascript
// Örnek: "Poizi - Perde (Official Music Video)"
// Normalize: "poizi perde"

// Kaldırılan kelimeler:
- official, music, video, audio, lyrics
- official music video, official video, official audio
- lyric video, music video
- clip, klip, şarkı, müzik
- hd, 4k, 1080p, 720p
- Parantezler: (), [], {}
- Özel karakterler
```

### Adım 2: Benzersiz Anahtar Oluşturma

```javascript
// Anahtar = Sanatçı + Normalize Başlık
const key = `${artist.toLowerCase()}|||${normalizedTitle}`;

// Örnek:
"poizi|||perde"
"lvbel c5|||kime ne"
"ezhel|||geceler"
```

### Adım 3: Tekrar Kontrolü

```javascript
// İlk kez görülüyor mu?
if (!seen.has(key)) {
    seen.set(key, true);
    unique.push(video); // Ekle
} else {
    console.log('Tekrar!'); // Atla
}
```

---

## 📊 Örnek Senaryolar

### ✅ Tekrar Engellenen:

**Örnek 1: Poizi - Perde**
- ✅ "Poizi - Perde (Official Music Video)" → Kabul
- ❌ "Poizi - Perde (Official Audio)" → Tekrar (engellendi)
- ❌ "Poizi - Perde (Lyrics)" → Tekrar (engellendi)
- ❌ "Poizi - Perde [Official Video]" → Tekrar (engellendi)

**Normalize:** `poizi|||perde`

---

**Örnek 2: Lvbel C5 - Kime Ne**
- ✅ "Lvbel C5 - Kime Ne (Official Music Video)" → Kabul
- ❌ "Lvbel C5 - Kime Ne (Lyrics)" → Tekrar (engellendi)
- ❌ "Lvbel C5 - Kime Ne Official Audio" → Tekrar (engellendi)
- ❌ "Lvbel C5 - Kime Ne [HD]" → Tekrar (engellendi)

**Normalize:** `lvbel c5|||kime ne`

---

**Örnek 3: Ezhel - Geceler**
- ✅ "Ezhel - Geceler (Official Video)" → Kabul
- ❌ "Ezhel - Geceler (Lyric Video)" → Tekrar (engellendi)
- ❌ "Ezhel - Geceler Official Music Video" → Tekrar (engellendi)
- ❌ "Ezhel - Geceler [4K]" → Tekrar (engellendi)

**Normalize:** `ezhel|||geceler`

---

**Örnek 4: Ati242 - Gece Gölgenin Rahatına Bak**
- ✅ "Ati242 - Gece Gölgenin Rahatına Bak" → Kabul
- ❌ "Ati242 - Gece Gölgenin Rahatına Bak (Official)" → Tekrar (engellendi)
- ❌ "Ati242 - Gece Gölgenin Rahatına Bak (Audio)" → Tekrar (engellendi)

**Normalize:** `ati242|||gece golgenin rahatina bak`

---

### ✅ Farklı Şarkılar (Kabul):

**Örnek 1: Farklı Şarkılar**
- ✅ "Lvbel C5 - Kime Ne" → Kabul
- ✅ "Lvbel C5 - Kara Sevda" → Kabul (farklı şarkı)
- ✅ "Lvbel C5 - Hayat Kısa" → Kabul (farklı şarkı)

**Normalize:**
- `lvbel c5|||kime ne`
- `lvbel c5|||kara sevda`
- `lvbel c5|||hayat kisa`

---

**Örnek 2: Farklı Sanatçılar**
- ✅ "Ezhel - Geceler" → Kabul
- ✅ "Semicenk - Geceler" → Kabul (farklı sanatçı)

**Normalize:**
- `ezhel|||geceler`
- `semicenk|||geceler`

---

## 🔍 Normalizasyon Detayları

### Kaldırılan Kelimeler:

**İngilizce:**
```
official, music, video, audio, lyrics, lyric,
official music video, official video, official audio,
lyric video, music video, visualizer, visualiser,
hd, 4k, 1080p, 720p, high quality, hq
```

**Türkçe:**
```
clip, klip, şarkı, müzik, resmi, sözleri
```

### Kaldırılan Karakterler:

**Parantezler:**
```
(...) → Kaldırılır
[...] → Kaldırılır
{...} → Kaldırılır
```

**Özel Karakterler:**
```
!, @, #, $, %, ^, &, *, +, =, |, \, /, <, >, ?
```

### Temizleme:

**Fazla Boşluklar:**
```
"Poizi  -  Perde" → "poizi perde"
```

**Büyük/Küçük Harf:**
```
"POIZI - PERDE" → "poizi perde"
```

---

## 📈 Performans

### Önceki Sistem (Tekrar Engelleme Yok):

**Gelen 40 video:**
- 30 benzersiz şarkı ✅
- 10 tekrar (aynı şarkının farklı versiyonları) ❌

**Sonuç:** 40 video gösterilir (10 tekrar)

### Yeni Sistem (Tekrar Engelleme Var):

**Gelen 40 video:**
- 30 benzersiz şarkı ✅
- 10 tekrar (filtrelendi) ✅

**Sonuç:** 30 video gösterilir (0 tekrar)

### İyileştirme:

- ✅ %100 tekrar engelleme
- ✅ Daha temiz liste
- ✅ Daha çeşitli içerik
- ✅ Daha iyi kullanıcı deneyimi

---

## 🎵 Gerçek Dünya Örnekleri

### Senaryo 1: Popüler Şarkı Araması

**Arama:** "lvbel c5 kime ne"

**YouTube Sonuçları:**
1. Lvbel C5 - Kime Ne (Official Music Video) ✅
2. Lvbel C5 - Kime Ne (Official Audio) ❌
3. Lvbel C5 - Kime Ne (Lyrics) ❌
4. Lvbel C5 - Kime Ne [Official Video] ❌
5. Lvbel C5 - Kime Ne (Lyric Video) ❌
6. Lvbel C5 - Kime Ne Official ❌

**Filtrelenmiş Sonuç:**
1. Lvbel C5 - Kime Ne (Official Music Video) ✅

**Tekrar:** 5 video engellendi

---

### Senaryo 2: Sanatçı Araması

**Arama:** "ezhel"

**YouTube Sonuçları:**
1. Ezhel - Geceler (Official Video) ✅
2. Ezhel - Geceler (Lyric Video) ❌
3. Ezhel - Şehrimin Tadı (Official) ✅
4. Ezhel - Şehrimin Tadı (Audio) ❌
5. Ezhel - Aya (Official Music Video) ✅
6. Ezhel - Aya (Lyrics) ❌

**Filtrelenmiş Sonuç:**
1. Ezhel - Geceler (Official Video) ✅
2. Ezhel - Şehrimin Tadı (Official) ✅
3. Ezhel - Aya (Official Music Video) ✅

**Tekrar:** 3 video engellendi

---

### Senaryo 3: Genel Müzik Araması

**Arama:** "türkçe rap 2024"

**YouTube Sonuçları:**
1. Poizi - Perde (Official Music Video) ✅
2. Poizi - Perde (Official Audio) ❌
3. Sefo - Yine Yeni Yeniden (Official) ✅
4. Sefo - Yine Yeni Yeniden (Lyrics) ❌
5. Ati242 - Gece Gölgenin (Official) ✅
6. Ati242 - Gece Gölgenin (Audio) ❌

**Filtrelenmiş Sonuç:**
1. Poizi - Perde (Official Music Video) ✅
2. Sefo - Yine Yeni Yeniden (Official) ✅
3. Ati242 - Gece Gölgenin (Official) ✅

**Tekrar:** 3 video engellendi

---

## 🧪 Test Senaryoları

### Test 1: Aynı Şarkı Farklı Versiyonlar

**Beklenen:**
- İlk versiyon kabul edilir
- Diğer versiyonlar engellenir

### Test 2: Farklı Şarkılar Aynı Sanatçı

**Beklenen:**
- Tüm farklı şarkılar kabul edilir
- Aynı şarkının tekrarları engellenir

### Test 3: Aynı Şarkı Adı Farklı Sanatçılar

**Beklenen:**
- Her sanatçının şarkısı kabul edilir
- Çünkü anahtar farklı (sanatçı + şarkı)

---

## 🔧 Özelleştirme

### Daha Sıkı Filtreleme:

```javascript
// Sadece başlığa göre filtrele (sanatçı önemsiz)
const key = normalizedTitle;
```

### Daha Gevşek Filtreleme:

```javascript
// Sadece çok benzer başlıkları filtrele
// Levenshtein distance kullan
```

### Yeni Kelime Ekle:

```javascript
// Kaldırılacak yeni kelime
removeWords.push('yeni_kelime');
```

---

## ✨ Sonuç

### Tekrar Engelleme:

- ✅ Aynı şarkının farklı versiyonları engellenir
- ✅ Official, Audio, Lyrics versiyonları
- ✅ Parantez içi bilgiler temizlenir
- ✅ Özel karakterler temizlenir
- ✅ Büyük/küçük harf farkı yok

### Kullanıcı Deneyimi:

- 🎵 Her şarkıdan sadece 1 versiyon
- 🚫 Tekrar yok
- 🚫 Gereksiz versiyonlar yok
- 😊 Temiz ve çeşitli liste

### Örnek Sonuç:

**Öncesi:**
- Poizi - Perde (Official Music Video)
- Poizi - Perde (Official Audio)
- Poizi - Perde (Lyrics)
- Poizi - Perde [Official Video]

**Sonrası:**
- Poizi - Perde (Official Music Video)

**Artık tekrar eden şarkılar gösterilmeyecek!** 🎉
