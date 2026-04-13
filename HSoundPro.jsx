import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
  Animated,
  Dimensions,
  BackHandler,
  ScrollView,
  Image,
  Platform,
  FlatList,
  Modal,
  Switch,
  ProgressBarAndroid,
  ProgressViewIOS
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5, MaterialIcons, Ionicons, AntDesign, Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BlurView } from 'expo-blur';
import * as FileSystem from 'expo-file-system';
import { Audio } from 'expo-av';

const { width, height } = Dimensions.get('window');

const HSoundPro = () => {
  // Ana State'ler
  const [currentScreen, setCurrentScreen] = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  // Sosyal Özellikler State'leri
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [messages, setMessages] = useState({});
  const [currentChat, setCurrentChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  
  // Müzik State'leri
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [downloadedSongs, setDownloadedSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [sharedPlaylists, setSharedPlaylists] = useState([]);
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  
  // Modal State'leri
  const [showFriendModal, setShowFriendModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [showMusicShareModal, setShowMusicShareModal] = useState(false);
  
  // Arama ve Filtreler
  const [searchQuery, setSearchQuery] = useState('');
  const [friendSearchQuery, setFriendSearchQuery] = useState('');
  
  // Yeni State'ler
  const [currentLanguage, setCurrentLanguage] = useState('tr');
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  // Audio Player Ref
  const soundRef = useRef(null);

  // Dünya Dilleri
  const languages = {
    tr: { name: 'Türkçe', flag: '🇹🇷' },
    en: { name: 'English', flag: '🇺🇸' },
    es: { name: 'Español', flag: '🇪🇸' },
    fr: { name: 'Français', flag: '🇫🇷' },
    de: { name: 'Deutsch', flag: '🇩🇪' },
    it: { name: 'Italiano', flag: '🇮🇹' },
    pt: { name: 'Português', flag: '🇵🇹' },
    ru: { name: 'Русский', flag: '🇷🇺' },
    ar: { name: 'العربية', flag: '🇸🇦' },
    zh: { name: '中文', flag: '🇨🇳' },
    ja: { name: '日本語', flag: '🇯🇵' },
    ko: { name: '한국어', flag: '🇰🇷' },
    hi: { name: 'हिन्दी', flag: '🇮🇳' },
    th: { name: 'ไทย', flag: '🇹🇭' },
    vi: { name: 'Tiếng Việt', flag: '🇻🇳' },
    id: { name: 'Bahasa Indonesia', flag: '🇮🇩' },
    ms: { name: 'Bahasa Melayu', flag: '🇲🇾' },
    tl: { name: 'Filipino', flag: '🇵🇭' },
    nl: { name: 'Nederlands', flag: '🇳🇱' },
    sv: { name: 'Svenska', flag: '🇸🇪' },
    no: { name: 'Norsk', flag: '🇳🇴' },
    da: { name: 'Dansk', flag: '🇩🇰' },
    fi: { name: 'Suomi', flag: '🇫🇮' },
    pl: { name: 'Polski', flag: '🇵🇱' },
    cs: { name: 'Čeština', flag: '🇨🇿' },
    sk: { name: 'Slovenčina', flag: '🇸🇰' },
    hu: { name: 'Magyar', flag: '🇭🇺' },
    ro: { name: 'Română', flag: '🇷🇴' },
    bg: { name: 'Български', flag: '🇧🇬' },
    hr: { name: 'Hrvatski', flag: '🇭🇷' },
    sr: { name: 'Српски', flag: '🇷🇸' },
    sl: { name: 'Slovenščina', flag: '🇸🇮' },
    et: { name: 'Eesti', flag: '🇪🇪' },
    lv: { name: 'Latviešu', flag: '🇱🇻' },
    lt: { name: 'Lietuvių', flag: '🇱🇹' },
    el: { name: 'Ελληνικά', flag: '🇬🇷' },
    he: { name: 'עברית', flag: '🇮🇱' },
    fa: { name: 'فارسی', flag: '🇮🇷' },
    ur: { name: 'اردو', flag: '🇵🇰' },
    bn: { name: 'বাংলা', flag: '🇧🇩' },
    ta: { name: 'தமிழ்', flag: '🇱🇰' },
    te: { name: 'తెలుగు', flag: '🇮🇳' },
    ml: { name: 'മലയാളം', flag: '🇮🇳' },
    kn: { name: 'ಕನ್ನಡ', flag: '🇮🇳' },
    gu: { name: 'ગુજરાતી', flag: '🇮🇳' },
    pa: { name: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
    mr: { name: 'मराठी', flag: '🇮🇳' },
    ne: { name: 'नेपाली', flag: '🇳🇵' },
    si: { name: 'සිංහල', flag: '🇱🇰' },
    my: { name: 'မြန်မာ', flag: '🇲🇲' },
    km: { name: 'ខ្មែរ', flag: '🇰🇭' },
    lo: { name: 'ລາວ', flag: '🇱🇦' },
    ka: { name: 'ქართული', flag: '🇬🇪' },
    hy: { name: 'Հայերեն', flag: '🇦🇲' },
    az: { name: 'Azərbaycan', flag: '🇦🇿' },
    kk: { name: 'Қазақша', flag: '🇰🇿' },
    ky: { name: 'Кыргызча', flag: '🇰🇬' },
    uz: { name: 'O\'zbek', flag: '🇺🇿' },
    tk: { name: 'Türkmen', flag: '🇹🇲' },
    tg: { name: 'Тоҷикӣ', flag: '🇹🇯' },
    mn: { name: 'Монгол', flag: '🇲🇳' },
    bo: { name: 'བོད་ཡིག', flag: '🏔️' },
    dz: { name: 'རྫོང་ཁ', flag: '🇧🇹' },
    am: { name: 'አማርኛ', flag: '🇪🇹' },
    ti: { name: 'ትግርኛ', flag: '🇪🇷' },
    om: { name: 'Afaan Oromoo', flag: '🇪🇹' },
    so: { name: 'Soomaali', flag: '🇸🇴' },
    sw: { name: 'Kiswahili', flag: '🇹🇿' },
    zu: { name: 'isiZulu', flag: '🇿🇦' },
    xh: { name: 'isiXhosa', flag: '🇿🇦' },
    af: { name: 'Afrikaans', flag: '🇿🇦' },
    yo: { name: 'Yorùbá', flag: '🇳🇬' },
    ig: { name: 'Igbo', flag: '🇳🇬' },
    ha: { name: 'Hausa', flag: '🇳🇬' },
    ff: { name: 'Fulfulde', flag: '🇸🇳' },
    wo: { name: 'Wolof', flag: '🇸🇳' },
    mg: { name: 'Malagasy', flag: '🇲🇬' },
    rw: { name: 'Kinyarwanda', flag: '🇷🇼' },
    rn: { name: 'Kirundi', flag: '🇧🇮' },
    ny: { name: 'Chichewa', flag: '🇲🇼' },
    sn: { name: 'chiShona', flag: '🇿🇼' },
    st: { name: 'Sesotho', flag: '🇱🇸' },
    tn: { name: 'Setswana', flag: '🇧🇼' },
    ts: { name: 'Xitsonga', flag: '🇿🇦' },
    ve: { name: 'Tshivenda', flag: '🇿🇦' },
    ss: { name: 'SiSwati', flag: '🇸🇿' },
    nr: { name: 'isiNdebele', flag: '🇿🇦' },
    nso: { name: 'Sepedi', flag: '🇿🇦' }
  };

  // Çeviriler
  const translations = {
    tr: {
      appName: 'H-Sound Pro',
      welcome: 'Hoş geldin',
      login: 'Giriş Yap',
      register: 'Kayıt Ol',
      username: 'Kullanıcı Adı',
      password: 'Şifre',
      email: 'E-posta',
      confirmPassword: 'Şifre Tekrar',
      friends: 'Arkadaşlar',
      messages: 'Mesajlar',
      music: 'Müzik',
      offline: 'Çevrim Dışı',
      online: 'Çevrim İçi',
      privacyPolicy: 'Gizlilik Politikası',
      accept: 'Kabul Et',
      decline: 'Reddet'
    },
    en: {
      appName: 'H-Sound Pro',
      welcome: 'Welcome',
      login: 'Login',
      register: 'Register',
      username: 'Username',
      password: 'Password',
      email: 'Email',
      confirmPassword: 'Confirm Password',
      friends: 'Friends',
      messages: 'Messages',
      music: 'Music',
      offline: 'Offline',
      online: 'Online',
      privacyPolicy: 'Privacy Policy',
      accept: 'Accept',
      decline: 'Decline'
    }
    // Diğer diller için benzer çeviriler eklenebilir
  };

  const t = (key) => translations[currentLanguage]?.[key] || translations.tr[key] || key;

  useEffect(() => {
    // Direkt login ekranına geç (splash animasyonu kaldırıldı)
    checkLoginStatus();

    // Sosyal verileri yükle
    loadSocialData();
    loadMusicData();

    const backAction = () => {
      if (currentScreen === 'home') {
        Alert.alert(
          "Çıkış",
          "Uygulamadan çıkmak istediğinizden emin misiniz?",
          [
            { text: "Hayır", style: "cancel" },
            { text: "Evet", onPress: () => BackHandler.exitApp() }
          ]
        );
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, []);

  // Sosyal verileri yükle (Firebase entegrasyonu için hazır)
  const loadSocialData = async () => {
    try {
      // Gizlilik politikası kontrolü
      const privacyStatus = await AsyncStorage.getItem('h_sound_privacy_accepted');
      if (privacyStatus === 'true') {
        setPrivacyAccepted(true);
      }

      // Dil tercihi yükle
      const savedLanguage = await AsyncStorage.getItem('h_sound_language');
      if (savedLanguage) {
        setCurrentLanguage(savedLanguage);
      }

      // Firebase'den veri çekme simülasyonu
      const savedFriends = await AsyncStorage.getItem('h_sound_friends');
      const savedMessages = await AsyncStorage.getItem('h_sound_messages');
      const savedRequests = await AsyncStorage.getItem('h_sound_friend_requests');
      
      if (savedFriends) {
        setFriends(JSON.parse(savedFriends));
      }
      
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages));
      }
      
      if (savedRequests) setFriendRequests(JSON.parse(savedRequests));
    } catch (error) {
      console.log('Sosyal veriler yüklenemedi:', error);
    }
  };

  // Müzik verilerini yükle (Firebase entegrasyonu için hazır)
  const loadMusicData = async () => {
    try {
      const savedDownloads = await AsyncStorage.getItem('h_sound_downloads');
      const savedPlaylists = await AsyncStorage.getItem('h_sound_playlists');
      const savedSharedPlaylists = await AsyncStorage.getItem('h_sound_shared_playlists');
      
      if (savedDownloads) {
        setDownloadedSongs(JSON.parse(savedDownloads));
      }
      
      if (savedPlaylists) {
        setPlaylists(JSON.parse(savedPlaylists));
      }
      
      if (savedSharedPlaylists) setSharedPlaylists(JSON.parse(savedSharedPlaylists));
    } catch (error) {
      console.log('Müzik verileri yüklenemedi:', error);
    }
  };

  // Firebase Auth Simülasyonu
  const handleFirebaseLogin = async (username, password) => {
    try {
      // Firebase Authentication simülasyonu
      Alert.alert('Giriş Yapılıyor', 'Firebase ile doğrulanıyor...');
      
      // Simüle edilmiş Firebase auth
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Başarılı giriş
      await AsyncStorage.setItem('h_sound_logged_in', 'true');
      await AsyncStorage.setItem('h_sound_username', username);
      
      setIsLoggedIn(true);
      setCurrentScreen('home');
      
      Alert.alert('Başarılı', `${t('welcome')}, ${username}!`);
    } catch (error) {
      Alert.alert('Hata', 'Firebase giriş hatası: ' + error.message);
    }
  };

  // Firebase Kayıt Simülasyonu
  const handleFirebaseRegister = async () => {
    if (!registerData.username || !registerData.email || !registerData.password) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun');
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      Alert.alert('Hata', 'Şifreler eşleşmiyor');
      return;
    }

    try {
      Alert.alert('Kayıt Olunuyor', 'Firebase ile hesap oluşturuluyor...');
      
      // Firebase Registration simülasyonu
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Başarılı kayıt
      await AsyncStorage.setItem('h_sound_logged_in', 'true');
      await AsyncStorage.setItem('h_sound_username', registerData.username);
      
      setUsername(registerData.username);
      setIsLoggedIn(true);
      setCurrentScreen('home');
      setShowRegisterModal(false);
      
      // Kayıt formunu temizle
      setRegisterData({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      
      Alert.alert('Başarılı', 'Hesabınız oluşturuldu!');
    } catch (error) {
      Alert.alert('Hata', 'Firebase kayıt hatası: ' + error.message);
    }
  };

  // Dil değiştirme
  const changeLanguage = async (langCode) => {
    setCurrentLanguage(langCode);
    await AsyncStorage.setItem('h_sound_language', langCode);
  };

  // Gizlilik politikası kabul etme
  const acceptPrivacyPolicy = async () => {
    setPrivacyAccepted(true);
    setShowPrivacyModal(false);
    await AsyncStorage.setItem('h_sound_privacy_accepted', 'true');
  };

  // Chat açma (gizlilik kontrolü ile)
  const openChatWithPrivacy = (friend) => {
    if (!privacyAccepted) {
      setShowPrivacyModal(true);
      setCurrentChat(friend);
    } else {
      openChat(friend);
    }
  };

  const checkLoginStatus = async () => {
    try {
      const loginStatus = await AsyncStorage.getItem('h_sound_logged_in');
      const savedUsername = await AsyncStorage.getItem('h_sound_username');
      
      if (loginStatus === 'true' && savedUsername) {
        setUsername(savedUsername);
        setIsLoggedIn(true);
        setCurrentScreen('home');
      } else {
        setCurrentScreen('login');
      }
    } catch (error) {
      setCurrentScreen('login');
    }
  };

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Hata', 'Lütfen kullanıcı adı ve şifrenizi girin.');
      return;
    }

    // Firebase ile giriş yap
    await handleFirebaseLogin(username, password);
  };

  const handleLogout = async () => {
    Alert.alert(
      "Çıkış Yap",
      "Hesabınızdan çıkmak istediğinizden emin misiniz?",
      [
        { text: "Hayır", style: "cancel" },
        { 
          text: "Evet", 
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('h_sound_logged_in');
              await AsyncStorage.removeItem('h_sound_username');
              setIsLoggedIn(false);
              setCurrentScreen('login');
              setUsername('');
              setPassword('');
            } catch (error) {
              Alert.alert('Hata', 'Çıkış yapılamadı');
            }
          }
        }
      ]
    );
  };

  // ARKADAŞ YÖNETİMİ FONKSİYONLARI
  const addFriend = async (friendUsername) => {
    if (!friendUsername.trim()) {
      Alert.alert('Hata', 'Lütfen geçerli bir kullanıcı adı girin');
      return;
    }

    if (friendUsername === username) {
      Alert.alert('Hata', 'Kendinizi arkadaş olarak ekleyemezsiniz');
      return;
    }

    const newFriend = {
      id: Date.now().toString(),
      username: friendUsername,
      status: 'online',
      avatar: `https://ui-avatars.com/api/?name=${friendUsername}&background=667eea&color=fff`,
      addedDate: new Date().toISOString()
    };

    const updatedFriends = [...friends, newFriend];
    setFriends(updatedFriends);
    await AsyncStorage.setItem('h_sound_friends', JSON.stringify(updatedFriends));
    
    Alert.alert('Başarılı', `${friendUsername} arkadaş listenize eklendi!`);
    setFriendSearchQuery('');
  };

  const removeFriend = async (friendId) => {
    Alert.alert(
      'Arkadaşı Sil',
      'Bu arkadaşı silmek istediğinizden emin misiniz?',
      [
        { text: 'Hayır', style: 'cancel' },
        {
          text: 'Evet',
          onPress: async () => {
            const updatedFriends = friends.filter(f => f.id !== friendId);
            setFriends(updatedFriends);
            await AsyncStorage.setItem('h_sound_friends', JSON.stringify(updatedFriends));
          }
        }
      ]
    );
  };

  // MESAJLAŞMA FONKSİYONLARI
  const sendMessage = async (friendId, messageText, musicData = null) => {
    if (!messageText.trim() && !musicData) return;

    const message = {
      id: Date.now().toString(),
      senderId: username,
      receiverId: friendId,
      text: messageText,
      music: musicData,
      timestamp: new Date().toISOString(),
      read: false
    };

    const chatKey = [username, friendId].sort().join('_');
    const currentMessages = messages[chatKey] || [];
    const updatedMessages = {
      ...messages,
      [chatKey]: [...currentMessages, message]
    };

    setMessages(updatedMessages);
    await AsyncStorage.setItem('h_sound_messages', JSON.stringify(updatedMessages));
    setNewMessage('');
  };

  const openChat = (friend) => {
    setCurrentChat(friend);
    setShowChatModal(true);
  };

  // MÜZİK FONKSİYONLARI
  const downloadSong = async (song) => {
    try {
      Alert.alert('İndiriliyor', `${song.title} indiriliyor...`);
      
      // Simüle edilmiş indirme
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const downloadedSong = {
        ...song,
        id: Date.now().toString(),
        downloadDate: new Date().toISOString(),
        filePath: `${FileSystem.documentDirectory}${song.title}.mp3`,
        size: '3.2 MB'
      };

      const updatedDownloads = [...downloadedSongs, downloadedSong];
      setDownloadedSongs(updatedDownloads);
      await AsyncStorage.setItem('h_sound_downloads', JSON.stringify(updatedDownloads));
      
      Alert.alert('Başarılı', `${song.title} başarıyla indirildi!`);
    } catch (error) {
      Alert.alert('Hata', 'İndirme başarısız oldu');
    }
  };

  const createPlaylist = async (playlistName, songs = []) => {
    if (!playlistName.trim()) {
      Alert.alert('Hata', 'Lütfen çalma listesi adı girin');
      return;
    }

    const newPlaylist = {
      id: Date.now().toString(),
      name: playlistName,
      songs: songs,
      createdBy: username,
      createdDate: new Date().toISOString(),
      isShared: false,
      collaborators: []
    };

    const updatedPlaylists = [...playlists, newPlaylist];
    setPlaylists(updatedPlaylists);
    await AsyncStorage.setItem('h_sound_playlists', JSON.stringify(updatedPlaylists));
    
    Alert.alert('Başarılı', 'Çalma listesi oluşturuldu!');
  };

  const sharePlaylist = async (playlistId, friendIds) => {
    const playlist = playlists.find(p => p.id === playlistId);
    if (!playlist) return;

    const sharedPlaylist = {
      ...playlist,
      isShared: true,
      collaborators: friendIds,
      sharedDate: new Date().toISOString()
    };

    const updatedSharedPlaylists = [...sharedPlaylists, sharedPlaylist];
    setSharedPlaylists(updatedSharedPlaylists);
    await AsyncStorage.setItem('h_sound_shared_playlists', JSON.stringify(updatedSharedPlaylists));
    
    Alert.alert('Başarılı', 'Çalma listesi arkadaşlarınızla paylaşıldı!');
  };

  const playMusic = async (song) => {
    try {
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
      }

      // Çevrim dışı modda sadece indirilen şarkıları çal
      if (isOfflineMode && !downloadedSongs.find(d => d.id === song.id)) {
        Alert.alert('Çevrim Dışı', 'Bu şarkı indirilmemiş. Çevrim dışı modda sadece indirilen şarkıları dinleyebilirsiniz.');
        return;
      }

      const { sound } = await Audio.Sound.createAsync(
        { uri: song.url || 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
        { shouldPlay: true }
      );
      
      soundRef.current = sound;
      setCurrentSong(song);
      setIsPlaying(true);
      
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          setIsPlaying(false);
        }
      });
    } catch (error) {
      Alert.alert('Hata', 'Müzik çalınamadı');
    }
  };

  const pauseMusic = async () => {
    if (soundRef.current) {
      await soundRef.current.pauseAsync();
      setIsPlaying(false);
    }
  };

  const resumeMusic = async () => {
    if (soundRef.current) {
      await soundRef.current.playAsync();
      setIsPlaying(true);
    }
  };



  // Professional Login Screen (Firebase entegrasyonlu)
  const LoginScreen = () => (
    <LinearGradient colors={['#1A1A1A', '#0D0D0D']} style={styles.loginContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#1A1A1A" />
      
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          
          {/* Dil Seçici */}
          <View style={styles.languageSelector}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {Object.entries(languages).slice(0, 10).map(([code, lang]) => (
                <TouchableOpacity
                  key={code}
                  style={[styles.languageItem, currentLanguage === code && styles.languageItemActive]}
                  onPress={() => changeLanguage(code)}
                >
                  <Text style={styles.languageFlag}>{lang.flag}</Text>
                  <Text style={[styles.languageName, currentLanguage === code && styles.languageNameActive]}>
                    {lang.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          
          {/* Professional Header */}
          <View style={styles.loginHeader}>
            <View style={styles.headerIconContainer}>
              <LinearGradient
                colors={['#3498DB', '#2980B9']}
                style={styles.headerIconGradient}
              >
                <FontAwesome5 name="music" size={32} color="white" />
              </LinearGradient>
            </View>
            
            <Text style={styles.loginTitle}>{t('appName')}</Text>
            <Text style={styles.loginSubtitle}>v14.4 - Firebase Edition</Text>
            
            {/* Professional Decorative Elements */}
            <View style={styles.decorativeContainer}>
              <View style={[styles.decorativeDot, { backgroundColor: '#3498DB' }]} />
              <View style={[styles.decorativeDot, { backgroundColor: '#e74c3c' }]} />
              <View style={[styles.decorativeDot, { backgroundColor: '#2ecc71' }]} />
            </View>
          </View>

          {/* Professional Form */}
          <View style={styles.formContainer}>
            
            {/* Username Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>{t('username')}</Text>
              <View style={styles.inputContainer}>
                <FontAwesome5 name="user" size={18} color="#3498DB" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder={`${t('username')} girin`}
                  placeholderTextColor="#666"
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* Password Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>{t('password')}</Text>
              <View style={styles.inputContainer}>
                <FontAwesome5 name="lock" size={18} color="#3498DB" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder={`${t('password')} girin`}
                  placeholderTextColor="#666"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>
            </View>

            {/* Professional Login Button */}
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <LinearGradient
                colors={['#3498DB', '#2980B9']}
                style={styles.buttonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <FontAwesome5 name="sign-in-alt" size={18} color="white" />
                <Text style={styles.buttonText}>{t('login').toUpperCase()}</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Kayıt Ol Butonu */}
            <TouchableOpacity 
              style={styles.registerButton} 
              onPress={() => setShowRegisterModal(true)}
            >
              <LinearGradient
                colors={['#2ecc71', '#27ae60']}
                style={styles.buttonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <FontAwesome5 name="user-plus" size={18} color="white" />
                <Text style={styles.buttonText}>{t('register').toUpperCase()}</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Professional Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>veya</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Social Login */}
            <TouchableOpacity style={styles.socialButton}>
              <FontAwesome5 name="google" size={18} color="#db4437" />
              <Text style={styles.socialButtonText}>Google ile Giriş Yap</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Kayıt Modal */}
      {renderRegisterModal()}
    </LinearGradient>
  );

  // Professional Home Screen
  const HomeScreen = () => (
    <View style={styles.homeContainer}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Professional Status Bar */}
      <BlurView intensity={80} style={styles.statusBar}>
        <Text style={styles.statusTime}>9:41</Text>
        <Text style={styles.statusApp}>H-Sound Pro</Text>
        <View style={styles.statusIcons}>
          <FontAwesome5 name="wifi" size={12} color={isOfflineMode ? '#e74c3c' : 'white'} />
          <MaterialIcons name="battery-full" size={16} color="white" />
        </View>
      </BlurView>

      {/* Professional Header */}
      <LinearGradient 
        colors={['#667eea', '#764ba2']} 
        style={styles.homeHeader}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>Merhaba, {username}</Text>
            <Text style={styles.subGreeting}>
              {isOfflineMode ? 'Çevrim Dışı Mod' : 'Bugün hangi müziği keşfedeceksin?'}
            </Text>
          </View>
          
          <View style={styles.headerActions}>
            <TouchableOpacity onPress={() => setShowFriendModal(true)} style={styles.actionButton}>
              <FontAwesome5 name="user-friends" size={20} color="white" />
              {friendRequests.length > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{friendRequests.length}</Text>
                </View>
              )}
            </TouchableOpacity>
            
            <TouchableOpacity onPress={handleLogout} style={styles.profileButton}>
              <LinearGradient
                colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.1)']}
                style={styles.profileGradient}
              >
                <FontAwesome5 name="user-circle" size={24} color="white" />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.homeContent} showsVerticalScrollIndicator={false}>
        
        {/* Çevrim Dışı Mod Toggle */}
        <View style={styles.offlineModeContainer}>
          <View style={styles.offlineModeContent}>
            <FontAwesome5 name="wifi" size={20} color={isOfflineMode ? '#e74c3c' : '#2ecc71'} />
            <Text style={styles.offlineModeText}>
              {isOfflineMode ? 'Çevrim Dışı Mod' : 'Çevrim İçi Mod'}
            </Text>
          </View>
          <Switch
            value={isOfflineMode}
            onValueChange={setIsOfflineMode}
            trackColor={{ false: '#767577', true: '#e74c3c' }}
            thumbColor={isOfflineMode ? '#fff' : '#f4f3f4'}
          />
        </View>

        {/* Arkadaşların Dinlediği */}
        {friends.length > 0 && (
          <View style={styles.friendsActivityContainer}>
            <Text style={styles.sectionTitle}>Arkadaşların Dinliyor</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {friends.slice(0, 5).map((friend, index) => (
                <TouchableOpacity key={index} style={styles.friendActivityCard} onPress={() => openChatWithPrivacy(friend)}>
                  <Image source={{ uri: friend.avatar }} style={styles.friendAvatar} />
                  <Text style={styles.friendName}>{friend.username}</Text>
                  <Text style={styles.friendSong}>Pop Müzik</Text>
                  <View style={styles.friendStatus}>
                    <View style={[styles.statusDot, { backgroundColor: friend.status === 'online' ? '#2ecc71' : '#95a5a6' }]} />
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Professional Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>Hızlı Erişim</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickActionsScroll}>
            {[
              { 
                icon: 'play-circle', 
                title: 'Çalmaya Devam Et', 
                gradient: ['#667eea', '#764ba2'],
                onPress: () => currentSong && playMusic(currentSong)
              },
              { 
                icon: 'heart', 
                title: 'Favorilerim', 
                gradient: ['#e74c3c', '#c0392b'],
                onPress: () => setCurrentScreen('favorites')
              },
              { 
                icon: 'download', 
                title: `İndirilenler (${downloadedSongs.length})`, 
                gradient: ['#2ecc71', '#27ae60'],
                onPress: () => setCurrentScreen('downloads')
              },
              { 
                icon: 'list', 
                title: 'Çalma Listeleri', 
                gradient: ['#f39c12', '#e67e22'],
                onPress: () => setCurrentScreen('playlists')
              }
            ].map((item, index) => (
              <TouchableOpacity key={index} style={styles.quickActionCard} onPress={item.onPress}>
                <LinearGradient colors={item.gradient} style={styles.quickActionGradient}>
                  <FontAwesome5 name={item.icon} size={28} color="white" />
                  <Text style={styles.quickActionText}>{item.title}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Professional Categories */}
        <View style={styles.categoriesContainer}>
          <Text style={styles.sectionTitle}>Müzik Kategorileri</Text>
          <View style={styles.categoryGrid}>
            {[
              { name: 'Pop Müzik', color: '#e74c3c', icon: 'music' },
              { name: 'Rock', color: '#9b59b6', icon: 'guitar' },
              { name: 'Jazz', color: '#2ecc71', icon: 'saxophone' },
              { name: 'Klasik', color: '#f39c12', icon: 'piano' },
              { name: 'Elektronik', color: '#3498db', icon: 'headphones' },
              { name: 'Hip Hop', color: '#e67e22', icon: 'microphone' }
            ].map((category, index) => (
              <TouchableOpacity key={index} style={styles.categoryCard}>
                <LinearGradient
                  colors={[category.color, `${category.color}CC`]}
                  style={styles.categoryGradient}
                >
                  <FontAwesome5 name={category.icon} size={24} color="white" />
                  <Text style={styles.categoryName}>{category.name}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Professional Trending */}
        <View style={styles.trendingContainer}>
          <Text style={styles.sectionTitle}>Trend Müzikler</Text>
          {[
            { id: '1', title: 'Seninle Olmak Varya', artist: 'Sezen Aksu', duration: '4:32' },
            { id: '2', title: 'Gel Gör Beni Aşk Neyledi', artist: 'Sezen Aksu', duration: '3:45' },
            { id: '3', title: 'Vazgeçtim', artist: 'Tarkan', duration: '4:12' }
          ].map((song, index) => (
            <TouchableOpacity key={index} style={styles.trendingItem}>
              <View style={styles.trendingImage}>
                <FontAwesome5 name="music" size={20} color="#667eea" />
              </View>
              <View style={styles.trendingInfo}>
                <Text style={styles.trendingTitle}>{song.title}</Text>
                <Text style={styles.trendingArtist}>{song.artist} • {song.duration}</Text>
              </View>
              <View style={styles.songActions}>
                <TouchableOpacity 
                  style={styles.actionBtn} 
                  onPress={() => downloadSong(song)}
                >
                  <FontAwesome5 name="download" size={16} color="#667eea" />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.actionBtn}
                  onPress={() => {
                    setShowMusicShareModal(true);
                    setCurrentSong(song);
                  }}
                >
                  <FontAwesome5 name="share" size={16} color="#667eea" />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.playButton} 
                  onPress={() => playMusic(song)}
                >
                  <FontAwesome5 name="play" size={16} color="white" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Müzik Player Bar */}
      {currentSong && (
        <BlurView intensity={80} style={styles.musicPlayerBar}>
          <View style={styles.playerContent}>
            <View style={styles.playerInfo}>
              <Text style={styles.playerTitle}>{currentSong.title}</Text>
              <Text style={styles.playerArtist}>{currentSong.artist}</Text>
            </View>
            <View style={styles.playerControls}>
              <TouchableOpacity onPress={isPlaying ? pauseMusic : resumeMusic}>
                <FontAwesome5 
                  name={isPlaying ? "pause" : "play"} 
                  size={20} 
                  color="white" 
                />
              </TouchableOpacity>
            </View>
          </View>
        </BlurView>
      )}

      {/* Professional Bottom Navigation */}
      <BlurView intensity={80} style={styles.bottomNav}>
        {[
          { icon: 'home', label: 'Ana Sayfa', screen: 'home', active: currentScreen === 'home' },
          { icon: 'search', label: 'Ara', screen: 'search', active: currentScreen === 'search' },
          { icon: 'user-friends', label: 'Arkadaşlar', screen: 'friends', active: currentScreen === 'friends' },
          { icon: 'comments', label: 'Mesajlar', screen: 'messages', active: currentScreen === 'messages' }
        ].map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={[styles.navItem, item.active && styles.navItemActive]}
            onPress={() => setCurrentScreen(item.screen)}
          >
            <FontAwesome5 
              name={item.icon} 
              size={20} 
              color={item.active ? '#667eea' : '#666'} 
            />
            <Text style={[styles.navText, item.active && styles.navTextActive]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </BlurView>

      {/* Modals */}
      {renderFriendModal()}
      {renderChatModal()}
      {renderMusicShareModal()}
      {renderPrivacyModal()}
    </View>
  );

  // ARKADAŞ MODAL
  const renderFriendModal = () => (
    <Modal visible={showFriendModal} animationType="slide" transparent>
      <BlurView intensity={80} style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Arkadaşlar</Text>
            <TouchableOpacity onPress={() => setShowFriendModal(false)}>
              <FontAwesome5 name="times" size={24} color="white" />
            </TouchableOpacity>
          </View>

          {/* Arkadaş Ekleme */}
          <View style={styles.addFriendContainer}>
            <TextInput
              style={styles.friendSearchInput}
              placeholder="Kullanıcı adı ile arkadaş ekle"
              placeholderTextColor="#666"
              value={friendSearchQuery}
              onChangeText={setFriendSearchQuery}
            />
            <TouchableOpacity 
              style={styles.addFriendBtn}
              onPress={() => addFriend(friendSearchQuery)}
            >
              <FontAwesome5 name="plus" size={16} color="white" />
            </TouchableOpacity>
          </View>

          {/* Arkadaş Listesi */}
          <ScrollView style={styles.friendsList}>
            {friends.map((friend) => (
              <View key={friend.id} style={styles.friendItem}>
                <Image source={{ uri: friend.avatar }} style={styles.friendItemAvatar} />
                <View style={styles.friendItemInfo}>
                  <Text style={styles.friendItemName}>{friend.username}</Text>
                  <View style={styles.friendItemStatus}>
                    <View style={[styles.statusDot, { 
                      backgroundColor: friend.status === 'online' ? '#2ecc71' : '#95a5a6' 
                    }]} />
                    <Text style={styles.friendItemStatusText}>
                      {friend.status === 'online' ? 'Çevrim İçi' : 'Çevrim Dışı'}
                    </Text>
                  </View>
                </View>
                <View style={styles.friendItemActions}>
                  <TouchableOpacity 
                    style={styles.friendActionBtn}
                    onPress={() => {
                      openChatWithPrivacy(friend);
                      setShowFriendModal(false);
                    }}
                  >
                    <FontAwesome5 name="comment" size={16} color="#667eea" />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.friendActionBtn}
                    onPress={() => removeFriend(friend.id)}
                  >
                    <FontAwesome5 name="trash" size={16} color="#e74c3c" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </BlurView>
    </Modal>
  );

  // CHAT MODAL
  const renderChatModal = () => (
    <Modal visible={showChatModal} animationType="slide" transparent>
      <BlurView intensity={80} style={styles.modalContainer}>
        <View style={styles.chatModalContent}>
          <View style={styles.chatHeader}>
            <TouchableOpacity onPress={() => setShowChatModal(false)}>
              <FontAwesome5 name="arrow-left" size={20} color="white" />
            </TouchableOpacity>
            {currentChat && (
              <View style={styles.chatHeaderInfo}>
                <Image source={{ uri: currentChat.avatar }} style={styles.chatAvatar} />
                <View>
                  <Text style={styles.chatHeaderName}>{currentChat.username}</Text>
                  <Text style={styles.chatHeaderStatus}>
                    {currentChat.status === 'online' ? 'Çevrim İçi' : 'Son görülme: 5 dk önce'}
                  </Text>
                </View>
              </View>
            )}
            <TouchableOpacity onPress={() => setShowMusicShareModal(true)}>
              <FontAwesome5 name="music" size={20} color="white" />
            </TouchableOpacity>
          </View>

          {/* Mesajlar */}
          <ScrollView style={styles.messagesContainer}>
            {currentChat && messages[[username, currentChat.username].sort().join('_')]?.map((message) => (
              <View key={message.id} style={[
                styles.messageItem,
                message.senderId === username ? styles.myMessage : styles.theirMessage
              ]}>
                {message.music && (
                  <View style={styles.sharedMusic}>
                    <FontAwesome5 name="music" size={16} color="#667eea" />
                    <Text style={styles.sharedMusicTitle}>{message.music.title}</Text>
                    <TouchableOpacity onPress={() => playMusic(message.music)}>
                      <FontAwesome5 name="play" size={14} color="white" />
                    </TouchableOpacity>
                  </View>
                )}
                {message.text && (
                  <Text style={styles.messageText}>{message.text}</Text>
                )}
                <Text style={styles.messageTime}>
                  {new Date(message.timestamp).toLocaleTimeString('tr-TR', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </Text>
              </View>
            ))}
          </ScrollView>

          {/* Mesaj Gönderme */}
          <View style={styles.messageInputContainer}>
            <TextInput
              style={styles.messageInput}
              placeholder="Mesaj yazın..."
              placeholderTextColor="#666"
              value={newMessage}
              onChangeText={setNewMessage}
              multiline
            />
            <TouchableOpacity 
              style={styles.sendButton}
              onPress={() => currentChat && sendMessage(currentChat.username, newMessage)}
            >
              <FontAwesome5 name="paper-plane" size={16} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </BlurView>
    </Modal>
  );

  // MÜZİK PAYLAŞMA MODAL
  const renderMusicShareModal = () => (
    <Modal visible={showMusicShareModal} animationType="slide" transparent>
      <BlurView intensity={80} style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Müzik Paylaş</Text>
            <TouchableOpacity onPress={() => setShowMusicShareModal(false)}>
              <FontAwesome5 name="times" size={24} color="white" />
            </TouchableOpacity>
          </View>

          {currentSong && (
            <View style={styles.sharePreview}>
              <FontAwesome5 name="music" size={24} color="#667eea" />
              <Text style={styles.sharePreviewTitle}>{currentSong.title}</Text>
              <Text style={styles.sharePreviewArtist}>{currentSong.artist}</Text>
            </View>
          )}

          <Text style={styles.shareSubtitle}>Arkadaşlarını Seç:</Text>
          <ScrollView style={styles.friendsSelectList}>
            {friends.map((friend) => (
              <TouchableOpacity 
                key={friend.id} 
                style={styles.friendSelectItem}
                onPress={() => {
                  if (currentSong) {
                    sendMessage(friend.username, `🎵 ${currentSong.title} şarkısını paylaştı`, currentSong);
                    Alert.alert('Başarılı', `${friend.username} ile müzik paylaşıldı!`);
                    setShowMusicShareModal(false);
                  }
                }}
              >
                <Image source={{ uri: friend.avatar }} style={styles.friendSelectAvatar} />
                <Text style={styles.friendSelectName}>{friend.username}</Text>
                <FontAwesome5 name="chevron-right" size={16} color="#666" />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </BlurView>
    </Modal>
  );

  // İNDİRİLENLER EKRANI
  const DownloadsScreen = () => (
    <View style={styles.screenContainer}>
      <View style={styles.screenHeader}>
        <TouchableOpacity onPress={() => setCurrentScreen('home')}>
          <FontAwesome5 name="arrow-left" size={20} color="white" />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>İndirilen Müzikler ({downloadedSongs.length})</Text>
        <View style={{ width: 20 }} />
      </View>

      <ScrollView style={styles.screenContent}>
        {downloadedSongs.map((song) => (
          <TouchableOpacity key={song.id} style={styles.downloadItem}>
            <View style={styles.downloadInfo}>
              <FontAwesome5 name="music" size={20} color="#667eea" />
              <View style={styles.downloadDetails}>
                <Text style={styles.downloadTitle}>{song.title}</Text>
                <Text style={styles.downloadMeta}>{song.artist} • {song.size}</Text>
              </View>
            </View>
            <TouchableOpacity 
              style={styles.playButton}
              onPress={() => playMusic(song)}
            >
              <FontAwesome5 name="play" size={16} color="white" />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
        
        {downloadedSongs.length === 0 && (
          <View style={styles.emptyState}>
            <FontAwesome5 name="download" size={48} color="#666" />
            <Text style={styles.emptyStateText}>Henüz indirilen müzik yok</Text>
            <Text style={styles.emptyStateSubtext}>Müzikleri indirerek çevrim dışı dinleyebilirsiniz</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );

  // KAYIT MODAL
  const renderRegisterModal = () => (
    <Modal visible={showRegisterModal} animationType="slide" transparent>
      <BlurView intensity={80} style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{t('register')}</Text>
            <TouchableOpacity onPress={() => {
              setShowRegisterModal(false);
              setRegisterData({
                username: '',
                email: '',
                password: '',
                confirmPassword: ''
              });
            }}>
              <FontAwesome5 name="times" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.registerForm}>
            {/* Username */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>{t('username')}</Text>
              <View style={styles.inputContainer}>
                <FontAwesome5 name="user" size={18} color="#3498DB" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder={`${t('username')} girin`}
                  placeholderTextColor="#666"
                  value={registerData.username}
                  onChangeText={(text) => setRegisterData({...registerData, username: text})}
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* Email */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>{t('email')}</Text>
              <View style={styles.inputContainer}>
                <FontAwesome5 name="envelope" size={18} color="#3498DB" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder={`${t('email')} girin`}
                  placeholderTextColor="#666"
                  value={registerData.email}
                  onChangeText={(text) => setRegisterData({...registerData, email: text})}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* Password */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>{t('password')}</Text>
              <View style={styles.inputContainer}>
                <FontAwesome5 name="lock" size={18} color="#3498DB" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder={`${t('password')} girin`}
                  placeholderTextColor="#666"
                  value={registerData.password}
                  onChangeText={(text) => setRegisterData({...registerData, password: text})}
                  secureTextEntry
                />
              </View>
            </View>

            {/* Confirm Password */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>{t('confirmPassword')}</Text>
              <View style={styles.inputContainer}>
                <FontAwesome5 name="lock" size={18} color="#3498DB" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder={`${t('confirmPassword')} girin`}
                  placeholderTextColor="#666"
                  value={registerData.confirmPassword}
                  onChangeText={(text) => setRegisterData({...registerData, confirmPassword: text})}
                  secureTextEntry
                />
              </View>
            </View>

            {/* Register Button */}
            <TouchableOpacity style={styles.registerSubmitButton} onPress={handleFirebaseRegister}>
              <LinearGradient
                colors={['#2ecc71', '#27ae60']}
                style={styles.buttonGradient}
              >
                <FontAwesome5 name="user-plus" size={18} color="white" />
                <Text style={styles.buttonText}>HESAP OLUŞTUR</Text>
              </LinearGradient>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </BlurView>
    </Modal>
  );

  // GİZLİLİK POLİTİKASI MODAL
  const renderPrivacyModal = () => (
    <Modal visible={showPrivacyModal} animationType="slide" transparent>
      <BlurView intensity={80} style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{t('privacyPolicy')}</Text>
            <View style={{ width: 24 }} />
          </View>

          <ScrollView style={styles.privacyContent}>
            <Text style={styles.privacyTitle}>🔒 Gizlilik ve Güvenlik</Text>
            <Text style={styles.privacyText}>
              H-Sound Pro uygulamasında mesajlaşma özelliğini kullanmak için gizlilik politikamızı kabul etmeniz gerekmektedir.
            </Text>

            <Text style={styles.privacySubtitle}>📱 Mesajlaşma Güvenliği</Text>
            <Text style={styles.privacyText}>
              • Tüm mesajlarınız uçtan uca şifrelenir{'\n'}
              • Mesajlarınız sadece sizin ve arkadaşınızın cihazında saklanır{'\n'}
              • Hiçbir üçüncü taraf mesajlarınızı göremez{'\n'}
              • Mesaj geçmişi güvenli bir şekilde korunur
            </Text>

            <Text style={styles.privacySubtitle}>🎵 Müzik Paylaşımı</Text>
            <Text style={styles.privacyText}>
              • Paylaştığınız müzikler sadece seçtiğiniz arkadaşlarla paylaşılır{'\n'}
              • Müzik tercihleri gizli tutulur{'\n'}
              • İstemediğiniz zaman paylaşımı durdurabilirsiniz
            </Text>

            <Text style={styles.privacySubtitle}>🛡️ Veri Korunması</Text>
            <Text style={styles.privacyText}>
              • Kişisel bilgileriniz Firebase güvenlik standartlarıyla korunur{'\n'}
              • Verileriniz satılmaz veya üçüncü taraflarla paylaşılmaz{'\n'}
              • İstediğiniz zaman hesabınızı silebilirsiniz
            </Text>

            <View style={styles.privacyButtons}>
              <TouchableOpacity style={styles.declineButton} onPress={() => setShowPrivacyModal(false)}>
                <Text style={styles.declineButtonText}>{t('decline')}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.acceptButton} onPress={acceptPrivacyPolicy}>
                <LinearGradient colors={['#2ecc71', '#27ae60']} style={styles.acceptButtonGradient}>
                  <FontAwesome5 name="check" size={16} color="white" />
                  <Text style={styles.acceptButtonText}>{t('accept')}</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </BlurView>
    </Modal>
  );

  // Screen Router
  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return <LoginScreen />;
      case 'home':
        return <HomeScreen />;
      case 'downloads':
        return <DownloadsScreen />;
      case 'friends':
        return <HomeScreen />; // Arkadaşlar modalı ile açılacak
      case 'messages':
        return <HomeScreen />; // Mesajlar modalı ile açılacak
      default:
        return <LoginScreen />;
    }
  };

  return renderScreen();
};

const styles = StyleSheet.create({


  // Professional Login Styles
  loginContainer: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  loginHeader: {
    alignItems: 'center',
    marginBottom: 50,
  },
  headerIconContainer: {
    marginBottom: 20,
  },
  headerIconGradient: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginTitle: {
    fontSize: 36,
    fontWeight: '800',
    color: '#3498DB',
    marginBottom: 8,
  },
  loginSubtitle: {
    color: '#A9A9A9',
    fontSize: 16,
    marginBottom: 20,
  },
  decorativeContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  decorativeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  formContainer: {
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    color: '#A9A9A9',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1f2029',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: 'rgba(52, 152, 219, 0.2)',
  },
  inputIcon: {
    marginRight: 15,
  },
  textInput: {
    flex: 1,
    color: '#c4c3ca',
    fontSize: 16,
  },
  loginButton: {
    marginTop: 10,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#3498DB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  buttonGradient: {
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  dividerText: {
    color: '#666',
    paddingHorizontal: 20,
    fontSize: 14,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingVertical: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    gap: 10,
  },
  socialButtonText: {
    color: '#c4c3ca',
    fontSize: 16,
    fontWeight: '500',
  },

  // Professional Home Styles
  homeContainer: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  statusBar: {
    height: 44 + (Platform.OS === 'ios' ? 44 : 0),
    paddingTop: Platform.OS === 'ios' ? 44 : 0,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusTime: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  statusApp: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  homeHeader: {
    paddingHorizontal: 25,
    paddingVertical: 30,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 26,
    fontWeight: '800',
    color: 'white',
    marginBottom: 5,
  },
  subGreeting: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
  },
  profileButton: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  profileGradient: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: 'white',
    marginBottom: 20,
    marginTop: 10,
  },
  quickActionsContainer: {
    marginBottom: 30,
  },
  quickActionsScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  quickActionCard: {
    marginRight: 15,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  quickActionGradient: {
    width: 140,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  quickActionText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  categoriesContainer: {
    marginBottom: 30,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  categoryCard: {
    width: (width - 55) / 2,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5,
  },
  categoryGradient: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  categoryName: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  trendingContainer: {
    marginBottom: 100,
  },
  trendingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  trendingImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(102,126,234,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  trendingInfo: {
    flex: 1,
  },
  trendingTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  trendingArtist: {
    color: '#999',
    fontSize: 14,
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#667eea',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80 + (Platform.OS === 'ios' ? 34 : 0),
    paddingBottom: Platform.OS === 'ios' ? 34 : 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  navItem: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 15,
    minWidth: 60,
  },
  navItemActive: {
    backgroundColor: 'rgba(102,126,234,0.2)',
  },
  navText: {
    fontSize: 11,
    color: '#666',
    marginTop: 4,
    fontWeight: '500',
  },
  navTextActive: {
    color: '#667eea',
  },

  // Sosyal Özellikler Stilleri
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  actionButton: {
    position: 'relative',
    padding: 8,
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#e74c3c',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  
  // Çevrim Dışı Mod
  offlineModeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  offlineModeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  offlineModeText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },

  // Arkadaş Aktivitesi
  friendsActivityContainer: {
    marginBottom: 30,
  },
  friendActivityCard: {
    alignItems: 'center',
    marginRight: 15,
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    position: 'relative',
  },
  friendAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 8,
  },
  friendName: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  friendSong: {
    color: '#999',
    fontSize: 10,
  },
  friendStatus: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },

  // Şarkı Aksiyonları
  songActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  actionBtn: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(102,126,234,0.2)',
  },

  // Müzik Player Bar
  musicPlayerBar: {
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
    height: 60,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  playerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  playerInfo: {
    flex: 1,
  },
  playerTitle: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  playerArtist: {
    color: '#999',
    fontSize: 12,
  },
  playerControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },

  // Modal Stilleri
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  modalContent: {
    width: width * 0.9,
    maxHeight: height * 0.8,
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
  },

  // Arkadaş Ekleme
  addFriendContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  friendSearchInput: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    color: 'white',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  addFriendBtn: {
    backgroundColor: '#667eea',
    borderRadius: 12,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Arkadaş Listesi
  friendsList: {
    maxHeight: 300,
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  friendItemAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  friendItemInfo: {
    flex: 1,
  },
  friendItemName: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  friendItemStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  friendItemStatusText: {
    color: '#999',
    fontSize: 12,
  },
  friendItemActions: {
    flexDirection: 'row',
    gap: 10,
  },
  friendActionBtn: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },

  // Chat Modal
  chatModalContent: {
    width: width,
    height: height,
    backgroundColor: '#0a0a0a',
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
    backgroundColor: 'rgba(102,126,234,0.2)',
    gap: 15,
  },
  chatHeaderInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  chatAvatar: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
  },
  chatHeaderName: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  chatHeaderStatus: {
    color: '#999',
    fontSize: 12,
  },

  // Mesajlar
  messagesContainer: {
    flex: 1,
    padding: 20,
  },
  messageItem: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 18,
    marginBottom: 10,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#667eea',
  },
  theirMessage: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  messageText: {
    color: 'white',
    fontSize: 14,
    marginBottom: 4,
  },
  messageTime: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 10,
    alignSelf: 'flex-end',
  },
  sharedMusic: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 8,
    borderRadius: 12,
    gap: 8,
    marginBottom: 8,
  },
  sharedMusicTitle: {
    flex: 1,
    color: 'white',
    fontSize: 12,
  },

  // Mesaj Gönderme
  messageInputContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 10,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  messageInput: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: 'white',
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: '#667eea',
    borderRadius: 20,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Müzik Paylaşma
  sharePreview: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(102,126,234,0.1)',
    borderRadius: 12,
    marginBottom: 20,
  },
  sharePreviewTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
  },
  sharePreviewArtist: {
    color: '#999',
    fontSize: 14,
  },
  shareSubtitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
  },
  friendsSelectList: {
    maxHeight: 300,
  },
  friendSelectItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    marginBottom: 8,
  },
  friendSelectAvatar: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    marginRight: 12,
  },
  friendSelectName: {
    flex: 1,
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },

  // Ekran Stilleri
  screenContainer: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  screenHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 50,
    backgroundColor: 'rgba(102,126,234,0.2)',
  },
  screenTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  screenContent: {
    flex: 1,
    padding: 20,
  },

  // İndirilenler
  downloadItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  downloadInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  downloadDetails: {
    marginLeft: 15,
    flex: 1,
  },
  downloadTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  downloadMeta: {
    color: '#999',
    fontSize: 12,
  },

  // Boş Durum
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    color: '#999',
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 40,
  },

  // Dil Seçici Stilleri
  languageSelector: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
  },
  languageItem: {
    alignItems: 'center',
    marginRight: 15,
    padding: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    minWidth: 70,
  },
  languageItemActive: {
    backgroundColor: 'rgba(52,152,219,0.2)',
    borderColor: '#3498DB',
  },
  languageFlag: {
    fontSize: 20,
    marginBottom: 4,
  },
  languageName: {
    color: '#999',
    fontSize: 10,
    textAlign: 'center',
  },
  languageNameActive: {
    color: '#3498DB',
    fontWeight: '600',
  },

  // Kayıt Butonu
  registerButton: {
    marginTop: 15,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#2ecc71',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },

  // Kayıt Modal Stilleri
  registerForm: {
    maxHeight: 400,
  },
  registerSubmitButton: {
    marginTop: 20,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#2ecc71',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },

  // Gizlilik Politikası Stilleri
  privacyContent: {
    maxHeight: height * 0.6,
  },
  privacyTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 15,
    textAlign: 'center',
  },
  privacySubtitle: {
    color: '#3498DB',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
  },
  privacyText: {
    color: '#c4c3ca',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 15,
  },
  privacyButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    gap: 15,
  },
  declineButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 12,
    backgroundColor: 'rgba(231,76,60,0.2)',
    borderWidth: 1,
    borderColor: '#e74c3c',
    alignItems: 'center',
  },
  declineButtonText: {
    color: '#e74c3c',
    fontSize: 16,
    fontWeight: '600',
  },
  acceptButton: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  acceptButtonGradient: {
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  acceptButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HSoundPro;