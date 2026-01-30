// Piped API Örneği - YouTube'un açık kaynak alternatifi
// Tamamen ücretsiz ve sınırsız

async function searchWithPiped(query) {
    const PIPED_INSTANCES = [
        'https://pipedapi.kavin.rocks',
        'https://api.piped.video',
        'https://pipedapi.adminforge.de',
        'https://api.piped.privacydev.net',
        'https://pipedapi.palveluntarjoaja.eu'
    ];
    
    for (const instance of PIPED_INSTANCES) {
        try {
            const response = await fetch(`${instance}/search?q=${encodeURIComponent(query)}&filter=videos`);
            
            if (response.ok) {
                const data = await response.json();
                
                const videos = data.items.map(item => ({
                    videoId: item.url.split('=')[1], // /watch?v=VIDEO_ID
                    title: item.title,
                    artist: item.uploaderName,
                    thumbnail: item.thumbnail,
                    duration: item.duration || 0
                }));
                
                console.log(`✅ Piped API BAŞARILI: ${videos.length} video`);
                return videos;
            }
        } catch (error) {
            console.log(`❌ Piped instance başarısız: ${error.message}`);
            continue;
        }
    }
    
    return [];
}

// Kullanım örneği:
// const results = await searchWithPiped('türkçe rap');