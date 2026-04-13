# 🎵 Popüler Müzik Listesi Güncellendi

## ✅ Yapılan Değişiklik

Ana sayfadaki "Popüler Müzikler" bölümü artık **Türkçe Rap/Hip-Hop** sanatçılarını gösteriyor.

## 🎤 Eklenen Sanatçılar

### Türkçe Rap/Hip-Hop
- **Lvbel C5** - Kime Ne, Kara Sevda
- **Ati242** - Gece Gölgenin Rahatına Bak
- **Sefo** - Yine Yeni Yeniden
- **Poizi (Porçöz)** - Yalan
- **Reynmen** - Derdim Olsun
- **Ezhel** - Geceler, Şehrimin Tadı
- **Ceza** - Holocaust
- **Sagopa Kajmer** - Bir Dizi İz
- **Norm Ender** - Aura
- **Khontkar** - Ters
- **Motive** - Kayıp
- **Murda & Ezhel** - Aya
- **Semicenk** - Geceler
- **Uzi** - Kan
- **Baneva** - Yalan
- **Şehinşah** - Karma
- **Gazapizm** - Heyecanı Yok

### Arabesk/Türk Sanat Müziği
- **Müslüm Gürses** - İtirazım Var, Affet, Esrarlı, Nilüfer

## 🔍 Arama Terimleri

Popüler müzikler yüklenirken şu arama terimleri kullanılıyor:

1. Sanatçı özel şarkıları (örn: "lvbel c5 kime ne")
2. Genel türkçe rap aramaları (örn: "türkçe rap 2024")
3. Alt türler (örn: "türkçe drill", "underground türkçe rap")

## 🎯 Nasıl Çalışıyor?

1. Kullanıcı ana sayfayı açtığında
2. Sistem otomatik olarak listeden bir arama terimi seçer
3. Netlify Edge Functions üzerinden YouTube'da arama yapar
4. Sonuçları "Popüler Müzikler" başlığı altında gösterir
5. Her yenilemede farklı bir arama terimi kullanılır

## 📝 Teknik Detaylar

- **Dosya:** `music-player.html`
- **Değişken:** `POPULAR_SEARCH_TERMS`
- **Toplam Arama Terimi:** 35 adet
- **API:** Netlify Edge Functions (`/api/youtube-search`)

## ✨ Sonuç

Artık ana sayfada eski türkçe pop yerine **Türkçe Rap/Hip-Hop** ve **Müslüm Gürses** gibi sanatçıların şarkıları görünecek!
