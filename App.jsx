import React, { useState, useEffect } from 'react';
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
  BackHandler
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    // Splash screen animasyonu
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    // 3 saniye sonra login kontrolü
    setTimeout(() => {
      checkLoginStatus();
    }, 3000);

    // Android back button
    const backAction = () => {
      if (currentScreen === 'home') {
        BackHandler.exitApp();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const loginStatus = await AsyncStorage.getItem('h_sound_logged_in');
      const savedUsername = await AsyncStorage.getItem('h_sound_username');
      
      if (loginStatus === 'true' && savedUsername) {
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

    try {
      // Firebase auth işlemi burada olacak
      // Şimdilik simulated login
      
      await AsyncStorage.setItem('h_sound_logged_in', 'true');
      await AsyncStorage.setItem('h_sound_username', username);
      
      setIsLoggedIn(true);
      setCurrentScreen('home');
      
      Alert.alert('Başarılı', 'Giriş yapıldı!');
    } catch (error) {
      Alert.alert('Hata', 'Giriş yapılamadı: ' + error.message);
    }
  };

  const handleLogout = async () => {
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
  };

  // Splash Screen
  const SplashScreen = () => (
    <LinearGradient colors={['#667eea', '#764ba2']} style={styles.splashContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#667eea" />
      <Animated.View style={[styles.splashContent, { opacity: fadeAnim }]}>
        <FontAwesome5 name="music" size={80} color="white" />
        <Text style={styles.splashTitle}>H-SOUND</Text>
        <Text style={styles.splashSubtitle}>MUSIC STUDIO</Text>
        <View style={styles.loadingDots}>
          <View style={[styles.dot, styles.dot1]} />
          <View style={[styles.dot, styles.dot2]} />
          <View style={[styles.dot, styles.dot3]} />
        </View>
      </Animated.View>
    </LinearGradient>
  );

  // Login Screen (index.html ile aynı tasarım)
  const LoginScreen = () => (
    <LinearGradient colors={['#1A1A1A', '#0D0D0D']} style={styles.loginContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#1A1A1A" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loginContent}>
          <View style={styles.loginHeader}>
            <FontAwesome5 name="music" size={48} color="#3498DB" />
            <Text style={styles.loginTitle}>H-Sound</Text>
            <Text style={styles.loginSubtitle}>Modern Müzik Çalar</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <FontAwesome5 name="user" size={20} color="#ffeba7" style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                placeholder="Kullanıcı Adı"
                placeholderTextColor="#c4c3ca"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <FontAwesome5 name="lock" size={20} color="#ffeba7" style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                placeholder="Şifre"
                placeholderTextColor="#c4c3ca"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <LinearGradient
                colors={['#3498DB', '#2980B9']}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>GİRİŞ YAP</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );

  // Home Screen
  const HomeScreen = () => (
    <View style={styles.homeContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      {/* Status Bar */}
      <View style={styles.statusBar}>
        <Text style={styles.statusTime}>9:41</Text>
        <Text style={styles.statusApp}>H-Sound</Text>
        <View style={styles.statusIcons}>
          <FontAwesome5 name="wifi" size={14} color="white" />
          <FontAwesome5 name="battery-three-quarters" size={14} color="white" />
        </View>
      </View>

      {/* Header */}
      <LinearGradient colors={['#667eea', '#764ba2']} style={styles.homeHeader}>
        <View>
          <Text style={styles.greeting}>Merhaba, {username}</Text>
          <Text style={styles.subGreeting}>Bugün ne dinlemek istiyorsun?</Text>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
          <FontAwesome5 name="sign-out-alt" size={20} color="white" />
        </TouchableOpacity>
      </LinearGradient>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.actionCard}>
          <FontAwesome5 name="play-circle" size={40} color="#667eea" />
          <Text style={styles.actionText}>Çalmaya Devam Et</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionCard}>
          <FontAwesome5 name="heart" size={40} color="#e74c3c" />
          <Text style={styles.actionText}>Favorilerim</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionCard}>
          <FontAwesome5 name="download" size={40} color="#2ecc71" />
          <Text style={styles.actionText}>İndirilenler</Text>
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <View style={styles.categories}>
        <Text style={styles.categoryTitle}>Kategoriler</Text>
        <View style={styles.categoryGrid}>
          <TouchableOpacity style={[styles.categoryItem, { backgroundColor: '#e74c3c' }]}>
            <Text style={styles.categoryText}>Pop</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.categoryItem, { backgroundColor: '#9b59b6' }]}>
            <Text style={styles.categoryText}>Rock</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.categoryItem, { backgroundColor: '#2ecc71' }]}>
            <Text style={styles.categoryText}>Jazz</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.categoryItem, { backgroundColor: '#f39c12' }]}>
            <Text style={styles.categoryText}>Klasik</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={[styles.navItem, styles.navItemActive]}>
          <FontAwesome5 name="home" size={22} color="#667eea" />
          <Text style={[styles.navText, styles.navTextActive]}>Ana Sayfa</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <FontAwesome5 name="search" size={22} color="#666" />
          <Text style={styles.navText}>Ara</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <FontAwesome5 name="music" size={22} color="#666" />
          <Text style={styles.navText}>Kütüphane</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <FontAwesome5 name="user" size={22} color="#666" />
          <Text style={styles.navText}>Profil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Screen Router
  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen />;
      case 'login':
        return <LoginScreen />;
      case 'home':
        return <HomeScreen />;
      default:
        return <SplashScreen />;
    }
  };

  return renderScreen();
};

const styles = StyleSheet.create({
  // Splash Screen Styles
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashContent: {
    alignItems: 'center',
  },
  splashTitle: {
    fontSize: 48,
    fontWeight: '900',
    color: 'white',
    letterSpacing: 6,
    marginTop: 20,
  },
  splashSubtitle: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.8)',
    letterSpacing: 2,
    marginTop: 10,
  },
  loadingDots: {
    flexDirection: 'row',
    marginTop: 40,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'white',
    marginHorizontal: 4,
  },

  // Login Screen Styles (index.html ile aynı)
  loginContainer: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  loginContent: {
    flex: 1,
    paddingHorizontal: 35,
    justifyContent: 'center',
  },
  loginHeader: {
    alignItems: 'center',
    marginBottom: 60,
  },
  loginTitle: {
    fontSize: 48,
    fontWeight: '700',
    color: '#3498DB',
    marginTop: 20,
  },
  loginSubtitle: {
    color: '#A9A9A9',
    fontSize: 16,
    marginTop: 10,
  },
  formContainer: {
    marginBottom: 40,
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  inputIcon: {
    position: 'absolute',
    left: 18,
    top: 14,
    zIndex: 2,
  },
  textInput: {
    paddingVertical: 13,
    paddingLeft: 55,
    paddingRight: 20,
    height: 48,
    borderRadius: 4,
    color: '#c4c3ca',
    backgroundColor: '#1f2029',
    fontSize: 16,
  },
  loginButton: {
    marginTop: 20,
    borderRadius: 6,
    overflow: 'hidden',
  },
  buttonGradient: {
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 1,
  },

  // Home Screen Styles
  homeContainer: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  statusBar: {
    height: 44,
    backgroundColor: 'rgba(0,0,0,0.9)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
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
    gap: 8,
  },
  homeHeader: {
    padding: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
  },
  subGreeting: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 5,
  },
  logoutBtn: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 30,
    justifyContent: 'space-between',
  },
  actionCard: {
    backgroundColor: '#2d2d2d',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  actionText: {
    color: 'white',
    fontSize: 12,
    marginTop: 10,
    textAlign: 'center',
  },
  categories: {
    paddingHorizontal: 20,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
    marginBottom: 20,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: (width - 50) / 2,
    height: 80,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  categoryText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: 'rgba(0,0,0,0.95)',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  navItem: {
    alignItems: 'center',
    padding: 8,
  },
  navItemActive: {
    backgroundColor: 'rgba(102,126,234,0.1)',
    borderRadius: 12,
  },
  navText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  navTextActive: {
    color: '#667eea',
  },
});

export default App;