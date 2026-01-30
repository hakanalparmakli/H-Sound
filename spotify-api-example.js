// Spotify Web API Örneği - Ücretsiz tier
// Client Credentials Flow kullanarak

class SpotifyAPI {
    constructor(clientId, clientSecret) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.accessToken = null;
    }
    
    async getAccessToken() {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(this.clientId + ':' + this.clientSecret)
            },
            body: 'grant_type=client_credentials'
        });
        
        const data = await response.json();
        this.accessToken = data.access_token;
        return this.accessToken;
    }
    
    async searchTracks(query, limit = 50) {
        if (!this.accessToken) {
            await this.getAccessToken();
        }
        
        const response = await fetch(
            `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=${limit}&market=TR`,
            {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken
                }
            }
        );
        
        const data = await response.json();
        
        return data.tracks.items.map(track => ({
            id: track.id,
            title: track.name,
            artist: track.artists.map(a => a.name).join(', '),
            album: track.album.name,
            thumbnail: track.album.images[0]?.url,
            duration: Math.floor(track.duration_ms / 1000),
            preview_url: track.preview_url, // 30 saniyelik önizleme
            external_urls: track.external_urls.spotify
        }));
    }
}

// Kullanım örneği:
/*
const spotify = new SpotifyAPI('YOUR_CLIENT_ID', 'YOUR_CLIENT_SECRET');
const results = await spotify.searchTracks('türkçe rap');
console.log(results);
*/

// NOT: Spotify sadece 30 saniyelik önizleme sağlar, tam şarkı çalmaz
// Ancak şarkı bilgileri ve metadata için mükemmel