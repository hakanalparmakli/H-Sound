# 🎵 H-Sound - Sınırsız Müzik Sistemi

H-Sound artık **Railway** üzerinde 7/24 çalışan özel API sunucusu ile **tamamen sınırsız** müzik arama özelliğine sahip!

## 🚀 Production Deployment

### 🚂 Railway (API Server)
- **URL**: https://h-sound-production.up.railway.app
- **Status**: ✅ 7/24 Online
- **Features**: Otomatik restart, HTTPS, ücretsiz

### 🌐 Netlify (Frontend)
- **URL**: https://your-app.netlify.app  
- **Features**: CDN, otomatik deploy, ücretsiz

## 🔧 Teknik Özellikler
- **Backend**: Node.js Express API (Railway)
- **Frontend**: Vanilla JS SPA (Netlify)
- **API**: Çoklu fallback sistemi
- **CORS**: Production domains destekli
- **Restart**: Otomatik hata kurtarma

## 📦 Kurulum

### Local Development
```bash
npm install
npm start
```

### Railway Deploy
```bash
# 1. Railway hesabı aç: https://railway.app
# 2. GitHub repo'yu bağla
# 3. Otomatik deploy
```

## 🔍 API Endpoints

### Müzik Arama
```
GET /api/search?q=query&limit=50
```

**Production Örnek:**
```
https://your-app.railway.app/api/search?q=blok3%20kusura%20bakma&limit=20
```

### Durum Kontrolü
```
GET /api/status
```

## 🎯 Özellikler

### ✅ Tamamlanan
- [x] Railway production deployment
- [x] Netlify frontend hosting  
- [x] 7/24 uptime
- [x] Otomatik HTTPS
- [x] CORS production config
- [x] Çoklu fallback API sistemi
- [x] Türkçe müzik odaklı sistem

### 🎵 Müzik Kaynakları
1. **YouTube Data API v3** - Ana kaynak
2. **Invidious API** - Alternatif
3. **YouTube Scraping** - Fallback
4. **Local Database** - Son çare

## 🌍 Production URLs
- **API**: https://your-railway-app.railway.app
- **Frontend**: https://your-netlify-app.netlify.app

---

**🎵 H-Sound Team tarafından geliştirilmiştir**