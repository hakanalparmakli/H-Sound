// H-Sound Mobile App - React Native benzeri yapı
class HSoundApp {
    constructor() {
        this.currentScreen = 'splash';
        this.user = null;
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.showSplashScreen();
    }
    
    // Ekran yönetimi
    showScreen(screenName) {
        const screens = ['splash', 'login', 'home', 'player'];
        screens.forEach(screen => {
            const element = document.getElementById(`${screen}-screen`);
            if (element) {
                element.style.display = screen === screenName ? 'block' : 'none';
            }
        });
        this.currentScreen = screenName;
    }
    
    // Splash Screen
    showSplashScreen() {
        this.renderSplashScreen();
        setTimeout(() => {
            this.checkAuthStatus();
        }, 3000);
    }
    
    renderSplashScreen() {
        const app = document.getElementById('app');
        app.innerHTML = `
            <div id="splash-screen" class="screen splash-screen">
                <div class="splash-content">
                    <div class="logo-container">
                        <i class="fas fa-music logo-icon"></i>
                        <h1 class="app-title">H-Sound</h1>
                        <p class="app-subtitle">Müzik Deneyimini Yaşa</p>
                    </div>
                    <div class="loading-indicator">
                        <div class="loading-dots">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Login Screen
    showLoginScreen() {
        const app = document.getElementById('app');
        app.innerHTML = `
            <div id="login-screen" class="screen login-screen">
                <div class="container">
                    <div class="header">
                        <h2>Hoş Geldin</h2>
                        <p>Müzik yolculuğuna başla</p>
                    </div>
                    
                    <div class="form-container">
                        <div class="input-group">
                            <i class="fas fa-user input-icon"></i>
                            <input type="text" id="username" placeholder="Kullanıcı Adı" class="form-input">
                        </div>
                        
                        <div class="input-group">
                            <i class="fas fa-lock input-icon"></i>
                            <input type="password" id="password" placeholder="Şifre" class="form-input">
                        </div>
                        
                        <button class="primary-btn" onclick="app.handleLogin()">
                            <i class="fas fa-sign-in-alt"></i> Giriş Yap
                        </button>
                        
                        <button class="secondary-btn" onclick="app.showRegisterForm()">
                            Hesabın yok mu? Kayıt ol
                        </button>
                    </div>
                    
                    <div class="social-login">
                        <p>veya</p>
                        <button class="social-btn google-btn">
                            <i class="fab fa-google"></i> Google ile Giriş
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Home Screen
    showHomeScreen() {
        const app = document.getElementById('app');
        app.innerHTML = `
            <div id="home-screen" class="screen home-screen">
                <!-- Status Bar -->
                <div class="status-bar">
                    <span class="time">9:41</span>
                    <span class="app-name">H-Sound</span>
                    <div class="status-icons">
                        <i class="fas fa-wifi"></i>
                        <i class="fas fa-battery-three-quarters"></i>
                    </div>
                </div>
                
                <!-- Header -->
                <div class="home-header">
                    <div class="user-greeting">
                        <h3>Merhaba, ${this.user?.username || 'Kullanıcı'}</h3>
                        <p>Bugün ne dinlemek istiyorsun?</p>
                    </div>
                    <div class="header-actions">
                        <button class="icon-btn" onclick="app.showSearch()">
                            <i class="fas fa-search"></i>
                        </button>
                        <button class="icon-btn" onclick="app.showProfile()">
                            <i class="fas fa-user-circle"></i>
                        </button>
                    </div>
                </div>
                
                <!-- Quick Actions -->
                <div class="quick-actions">
                    <div class="action-card" onclick="app.showPlayer()">
                        <i class="fas fa-play-circle"></i>
                        <span>Çalmaya Devam Et</span>
                    </div>
                    <div class="action-card" onclick="app.showFavorites()">
                        <i class="fas fa-heart"></i>
                        <span>Favorilerim</span>
                    </div>
                    <div class="action-card" onclick="app.showDownloads()">
                        <i class="fas fa-download"></i>
                        <span>İndirilenler</span>
                    </div>
                </div>
                
                <!-- Music Categories -->
                <div class="categories">
                    <h4>Kategoriler</h4>
                    <div class="category-grid">
                        <div class="category-item pop">
                            <span>Pop</span>
                        </div>
                        <div class="category-item rock">
                            <span>Rock</span>
                        </div>
                        <div class="category-item jazz">
                            <span>Jazz</span>
                        </div>
                        <div class="category-item classical">
                            <span>Klasik</span>
                        </div>
                    </div>
                </div>
                
                <!-- Bottom Navigation -->
                <div class="bottom-nav">
                    <div class="nav-item active" onclick="app.showHomeScreen()">
                        <i class="fas fa-home"></i>
                        <span>Ana Sayfa</span>
                    </div>
                    <div class="nav-item" onclick="app.showSearch()">
                        <i class="fas fa-search"></i>
                        <span>Ara</span>
                    </div>
                    <div class="nav-item" onclick="app.showLibrary()">
                        <i class="fas fa-music"></i>
                        <span>Kütüphane</span>
                    </div>
                    <div class="nav-item" onclick="app.showProfile()">
                        <i class="fas fa-user"></i>
                        <span>Profil</span>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Event Listeners
    setupEventListeners() {
        // Back button (Android)
        document.addEventListener('backbutton', this.handleBackButton.bind(this), false);
        
        // Keyboard events
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && this.currentScreen === 'login') {
                this.handleLogin();
            }
        });
        
        // Touch events
        this.setupTouchGestures();
    }
    
    setupTouchGestures() {
        let startY = 0;
        let startX = 0;
        
        document.addEventListener('touchstart', (e) => {
            startY = e.touches[0].clientY;
            startX = e.touches[0].clientX;
        });
        
        document.addEventListener('touchend', (e) => {
            const endY = e.changedTouches[0].clientY;
            const endX = e.changedTouches[0].clientX;
            const diffY = startY - endY;
            const diffX = startX - endX;
            
            // Swipe gestures
            if (Math.abs(diffX) > Math.abs(diffY)) {
                if (diffX > 50) {
                    this.handleSwipeLeft();
                } else if (diffX < -50) {
                    this.handleSwipeRight();
                }
            } else {
                if (diffY > 50) {
                    this.handleSwipeUp();
                } else if (diffY < -50) {
                    this.handleSwipeDown();
                }
            }
        });
    }
    
    // Auth Methods
    async checkAuthStatus() {
        const isLoggedIn = localStorage.getItem('h_sound_logged_in');
        if (isLoggedIn === 'true') {
            this.user = {
                username: localStorage.getItem('h_sound_username'),
                email: localStorage.getItem('h_sound_email')
            };
            this.showHomeScreen();
        } else {
            this.showLoginScreen();
        }
    }
    
    async handleLogin() {
        const username = document.getElementById('username')?.value;
        const password = document.getElementById('password')?.value;
        
        if (!username || !password) {
            this.showAlert('Lütfen tüm alanları doldurun!');
            return;
        }
        
        try {
            // Firebase auth işlemi burada
            this.showLoading('Giriş yapılıyor...');
            
            // Simulated login
            setTimeout(() => {
                this.user = { username, email: 'user@example.com' };
                localStorage.setItem('h_sound_logged_in', 'true');
                localStorage.setItem('h_sound_username', username);
                this.hideLoading();
                this.showHomeScreen();
            }, 2000);
            
        } catch (error) {
            this.hideLoading();
            this.showAlert('Giriş hatası: ' + error.message);
        }
    }
    
    // Navigation Methods
    handleBackButton() {
        switch (this.currentScreen) {
            case 'home':
                // Ana ekrandaysa uygulamayı kapat
                navigator.app?.exitApp();
                break;
            case 'login':
                // Login ekranındaysa uygulamayı kapat
                navigator.app?.exitApp();
                break;
            default:
                this.showHomeScreen();
        }
    }
    
    handleSwipeLeft() {
        // Sol kaydırma - sonraki ekran
        console.log('Swipe left');
    }
    
    handleSwipeRight() {
        // Sağ kaydırma - önceki ekran
        this.handleBackButton();
    }
    
    handleSwipeUp() {
        // Yukarı kaydırma - player açma
        if (this.currentScreen === 'home') {
            this.showPlayer();
        }
    }
    
    handleSwipeDown() {
        // Aşağı kaydırma - refresh
        if (this.currentScreen === 'home') {
            this.refreshContent();
        }
    }
    
    // UI Helper Methods
    showAlert(message) {
        // Native alert veya custom modal
        if (window.Capacitor && window.Capacitor.Plugins.Dialog) {
            window.Capacitor.Plugins.Dialog.alert({
                title: 'H-Sound',
                message: message
            });
        } else {
            alert(message);
        }
    }
    
    showLoading(message = 'Yükleniyor...') {
        const loading = document.createElement('div');
        loading.id = 'loading-overlay';
        loading.innerHTML = `
            <div class="loading-content">
                <div class="spinner"></div>
                <p>${message}</p>
            </div>
        `;
        document.body.appendChild(loading);
    }
    
    hideLoading() {
        const loading = document.getElementById('loading-overlay');
        if (loading) {
            loading.remove();
        }
    }
    
    // Placeholder methods
    showPlayer() { console.log('Player açılıyor...'); }
    showSearch() { console.log('Arama açılıyor...'); }
    showProfile() { console.log('Profil açılıyor...'); }
    showFavorites() { console.log('Favoriler açılıyor...'); }
    showDownloads() { console.log('İndirilenler açılıyor...'); }
    showLibrary() { console.log('Kütüphane açılıyor...'); }
    showRegisterForm() { console.log('Kayıt formu açılıyor...'); }
    refreshContent() { console.log('İçerik yenileniyor...'); }
}

// App başlatma
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new HSoundApp();
});

// Capacitor hazır olduğunda
document.addEventListener('deviceready', () => {
    console.log('Capacitor hazır!');
    // Native özellikler burada kullanılabilir
}, false);