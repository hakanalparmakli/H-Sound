// Cordova Müzik Kontrolü Entegrasyonu
// Bu dosyayı music-player.html'den önce yükleyin

document.addEventListener('deviceready', function() {
    console.log('📱 Cordova hazır - Müzik kontrolü başlatılıyor...');
    
    // 1. ARKA PLAN MODU AKTİF ET
    if (window.cordova && cordova.plugins && cordova.plugins.backgroundMode) {
        cordova.plugins.backgroundMode.enable();
        cordova.plugins.backgroundMode.setDefaults({
            title: 'H-Sound',
            text: 'Müzik çalıyor...',
            icon: 'icon',
            color: '3498DB',
            resume: true,
            hidden: false,
            bigText: false,
            silent: true
        });
        
        cordova.plugins.backgroundMode.on('activate', function() {
            console.log('🎵 Arka plan modu aktif');
            cordova.plugins.backgroundMode.disableWebViewOptimizations();
        });
        
        console.log('✅ Arka plan modu etkinleştirildi');
    }
    
    // 2. EKRAN AÇIK TUTMA
    if (window.plugins && window.plugins.insomnia) {
        window.plugins.insomnia.keepAwake();
        console.log('✅ Ekran açık tutma etkinleştirildi');
    }
    
    // 3. MÜZİK KONTROL BİLDİRİMİ
    if (window.MusicControls) {
        console.log('✅ Müzik kontrolü mevcut');
        
        // Global fonksiyonlar - music-player.html'den erişilebilir
        window.updateMusicControls = function(song, isPlaying) {
            if (!window.MusicControls) return;
            
            MusicControls.create({
                track: song.title,
                artist: song.title.includes(' - ') ? song.title.split(' - ')[0] : 'Bilinmiyor',
                album: 'H-Sound',
                cover: song.thumbnail,
                isPlaying: isPlaying,
                dismissable: false,
                hasPrev: true,
                hasNext: true,
                hasClose: false,
                
                // iOS
                duration: song.duration || 0,
                elapsed: 0,
                
                // Android
                ticker: 'H-Sound - ' + song.title,
                playIcon: 'media_play',
                pauseIcon: 'media_pause',
                prevIcon: 'media_prev',
                nextIcon: 'media_next',
                closeIcon: 'media_close',
                notificationIcon: 'icon'
            }, function(success) {
                console.log('✅ Müzik kontrolü güncellendi');
            }, function(error) {
                console.error('❌ Müzik kontrolü hatası:', error);
            });
            
            // Kontrol olaylarını dinle
            MusicControls.subscribe(function(action) {
                console.log('🎵 Müzik kontrolü:', action);
                
                const events = {
                    'music-controls-play': () => {
                        if (window.player) window.player.playVideo();
                    },
                    'music-controls-pause': () => {
                        if (window.player) window.player.pauseVideo();
                    },
                    'music-controls-next': () => {
                        if (window.playNext) window.playNext();
                    },
                    'music-controls-previous': () => {
                        if (window.playPrevious) window.playPrevious();
                    },
                    'music-controls-destroy': () => {
                        MusicControls.destroy();
                    }
                };
                
                if (events[action]) {
                    events[action]();
                }
            });
            
            // Dinleme modunu etkinleştir
            MusicControls.listen();
        };
        
        window.destroyMusicControls = function() {
            if (window.MusicControls) {
                MusicControls.destroy();
            }
        };
    }
    
    // 4. TELEFON ÇAĞRISI KONTROLÜ
    if (window.cordova && cordova.plugins && cordova.plugins.backgroundMode) {
        document.addEventListener('pause', function() {
            console.log('📱 Uygulama arka plana alındı');
            // Müzik çalmaya devam et
        });
        
        document.addEventListener('resume', function() {
            console.log('📱 Uygulama ön plana alındı');
        });
    }
    
    console.log('🎉 Cordova müzik kontrolü hazır!');
}, false);

// Cordova yoksa (tarayıcıda test için)
if (!window.cordova) {
    console.log('⚠️ Cordova bulunamadı - Tarayıcı modunda çalışıyor');
    
    // Dummy fonksiyonlar
    window.updateMusicControls = function() {};
    window.destroyMusicControls = function() {};
}
