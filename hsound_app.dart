// H-Sound Mobile App - Tek dosyada tüm uygulama
// Bu dosyayı Flutter projesinin lib/main.dart dosyasına kopyalayın

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'dart:async';

void main() {
  runApp(HSoundApp());
}

class HSoundApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'H-Sound',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: SplashScreen(),
      debugShowCheckedModeBanner: false,
    );
  }
}

// Splash Screen - index.html ile aynı animasyon
class SplashScreen extends StatefulWidget {
  @override
  _SplashScreenState createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> with TickerProviderStateMixin {
  late AnimationController _fadeController;
  late AnimationController _scaleController;
  late Animation<double> _fadeAnimation;
  late Animation<double> _scaleAnimation;

  @override
  void initState() {
    super.initState();
    
    _fadeController = AnimationController(duration: Duration(seconds: 2), vsync: this);
    _scaleController = AnimationController(duration: Duration(milliseconds: 1500), vsync: this);
    
    _fadeAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _fadeController, curve: Curves.easeInOut)
    );
    
    _scaleAnimation = Tween<double>(begin: 0.5, end: 1.0).animate(
      CurvedAnimation(parent: _scaleController, curve: Curves.elasticOut)
    );

    // Animasyonları başlat
    _fadeController.forward();
    _scaleController.forward();
    
    // 3 saniye sonra login ekranına geç
    Timer(Duration(seconds: 3), () {
      Navigator.pushReplacement(
        context,
        PageRouteBuilder(
          pageBuilder: (context, animation, secondaryAnimation) => LoginScreen(),
          transitionsBuilder: (context, animation, secondaryAnimation, child) {
            return FadeTransition(opacity: animation, child: child);
          },
        ),
      );
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [Color(0xFF667eea), Color(0xFF764ba2)],
          ),
        ),
        child: Center(
          child: AnimatedBuilder(
            animation: Listenable.merge([_fadeAnimation, _scaleAnimation]),
            builder: (context, child) {
              return Opacity(
                opacity: _fadeAnimation.value,
                child: Transform.scale(
                  scale: _scaleAnimation.value,
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      // Logo
                      Container(
                        width: 120,
                        height: 120,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          gradient: LinearGradient(
                            colors: [Colors.white24, Colors.white10],
                          ),
                          boxShadow: [
                            BoxShadow(
                              color: Colors.black26,
                              blurRadius: 20,
                              spreadRadius: 5,
                            ),
                          ],
                        ),
                        child: Icon(
                          Icons.music_note,
                          size: 60,
                          color: Colors.white,
                        ),
                      ),
                      SizedBox(height: 30),
                      
                      // Title
                      Text(
                        'H-SOUND',
                        style: TextStyle(
                          fontSize: 48,
                          fontWeight: FontWeight.w900,
                          color: Colors.white,
                          letterSpacing: 6,
                          shadows: [
                            Shadow(
                              color: Colors.black26,
                              offset: Offset(2, 2),
                              blurRadius: 4,
                            ),
                          ],
                        ),
                      ),
                      SizedBox(height: 10),
                      
                      // Subtitle
                      Text(
                        'MUSIC STUDIO',
                        style: TextStyle(
                          fontSize: 18,
                          color: Colors.white70,
                          letterSpacing: 2,
                          fontWeight: FontWeight.w300,
                        ),
                      ),
                      SizedBox(height: 50),
                      
                      // Loading indicator
                      SizedBox(
                        width: 50,
                        height: 50,
                        child: CircularProgressIndicator(
                          valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
                          strokeWidth: 3,
                        ),
                      ),
                    ],
                  ),
                ),
              );
            },
          ),
        ),
      ),
    );
  }

  @override
  void dispose() {
    _fadeController.dispose();
    _scaleController.dispose();
    super.dispose();
  }
}

// Login Screen - index.html tasarımı ile birebir aynı
class LoginScreen extends StatefulWidget {
  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _usernameController = TextEditingController();
  final _passwordController = TextEditingController();
  bool _isLoading = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [Color(0xFF1A1A1A), Color(0xFF0D0D0D)],
          ),
        ),
        child: SafeArea(
          child: SingleChildScrollView(
            padding: EdgeInsets.symmetric(horizontal: 35),
            child: Container(
              height: MediaQuery.of(context).size.height - MediaQuery.of(context).padding.top,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  // Header - index.html ile aynı
                  Column(
                    children: [
                      Icon(
                        Icons.music_note,
                        size: 48,
                        color: Color(0xFF3498DB),
                      ),
                      SizedBox(height: 20),
                      Text(
                        'H-Sound',
                        style: TextStyle(
                          fontSize: 48,
                          fontWeight: FontWeight.w700,
                          color: Color(0xFF3498DB),
                        ),
                      ),
                      SizedBox(height: 10),
                      Text(
                        'Modern Müzik Çalar',
                        style: TextStyle(
                          color: Color(0xFFA9A9A9),
                          fontSize: 16,
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: 60),
                  
                  // Form - index.html stili
                  Column(
                    children: [
                      // Username Input
                      _buildInputField(
                        controller: _usernameController,
                        hintText: 'Kullanıcı Adı',
                        icon: Icons.person,
                        isPassword: false,
                      ),
                      SizedBox(height: 20),
                      
                      // Password Input
                      _buildInputField(
                        controller: _passwordController,
                        hintText: 'Şifre',
                        icon: Icons.lock,
                        isPassword: true,
                      ),
                      SizedBox(height: 30),
                      
                      // Login Button
                      Container(
                        width: double.infinity,
                        height: 50,
                        child: ElevatedButton(
                          onPressed: _isLoading ? null : _handleLogin,
                          style: ElevatedButton.styleFrom(
                            backgroundColor: Color(0xFF3498DB),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(6),
                            ),
                            elevation: 8,
                          ),
                          child: _isLoading
                              ? CircularProgressIndicator(color: Colors.white)
                              : Text(
                                  'GİRİŞ YAP',
                                  style: TextStyle(
                                    color: Colors.white,
                                    fontSize: 16,
                                    fontWeight: FontWeight.w600,
                                    letterSpacing: 1,
                                  ),
                                ),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildInputField({
    required TextEditingController controller,
    required String hintText,
    required IconData icon,
    required bool isPassword,
  }) {
    return Container(
      height: 48,
      decoration: BoxDecoration(
        color: Color(0xFF1f2029),
        borderRadius: BorderRadius.circular(4),
      ),
      child: Row(
        children: [
          SizedBox(width: 18),
          Icon(icon, color: Color(0xFFffeba7), size: 20),
          SizedBox(width: 17),
          Expanded(
            child: TextFormField(
              controller: controller,
              obscureText: isPassword,
              style: TextStyle(color: Color(0xFFc4c3ca)),
              decoration: InputDecoration(
                hintText: hintText,
                hintStyle: TextStyle(color: Color(0xFFc4c3ca)),
                border: InputBorder.none,
                contentPadding: EdgeInsets.symmetric(vertical: 13),
              ),
            ),
          ),
          SizedBox(width: 20),
        ],
      ),
    );
  }

  _handleLogin() async {
    String username = _usernameController.text.trim();
    String password = _passwordController.text.trim();

    if (username.isEmpty || password.isEmpty) {
      _showAlert('Lütfen kullanıcı adı ve şifrenizi girin.');
      return;
    }

    setState(() {
      _isLoading = true;
    });

    // Simulated login delay
    await Future.delayed(Duration(seconds: 2));

    setState(() {
      _isLoading = false;
    });

    // Navigate to home
    Navigator.pushReplacement(
      context,
      MaterialPageRoute(builder: (context) => HomeScreen(username: username)),
    );
  }

  _showAlert(String message) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: Color(0xFF2d2d2d),
        title: Text('H-Sound', style: TextStyle(color: Colors.white)),
        content: Text(message, style: TextStyle(color: Colors.white70)),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text('Tamam', style: TextStyle(color: Color(0xFF3498DB))),
          ),
        ],
      ),
    );
  }
}

// Home Screen - Modern mobil tasarım
class HomeScreen extends StatelessWidget {
  final String username;

  HomeScreen({required this.username});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFF1a1a1a),
      body: Column(
        children: [
          // Status Bar
          Container(
            height: 44,
            color: Colors.black87,
            padding: EdgeInsets.symmetric(horizontal: 20),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text('9:41', style: TextStyle(color: Colors.white, fontWeight: FontWeight.w600, fontSize: 14)),
                Text('H-Sound', style: TextStyle(color: Colors.white, fontWeight: FontWeight.w600, fontSize: 14)),
                Row(
                  children: [
                    Icon(Icons.wifi, color: Colors.white, size: 14),
                    SizedBox(width: 8),
                    Icon(Icons.battery_full, color: Colors.white, size: 14),
                  ],
                ),
              ],
            ),
          ),
          
          // Header
          Container(
            padding: EdgeInsets.all(30),
            decoration: BoxDecoration(
              gradient: LinearGradient(
                colors: [Color(0xFF667eea), Color(0xFF764ba2)],
              ),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Merhaba, $username',
                        style: TextStyle(
                          fontSize: 24,
                          fontWeight: FontWeight.w700,
                          color: Colors.white,
                        ),
                      ),
                      SizedBox(height: 5),
                      Text(
                        'Bugün ne dinlemek istiyorsun?',
                        style: TextStyle(
                          fontSize: 16,
                          color: Colors.white70,
                        ),
                      ),
                    ],
                  ),
                ),
                IconButton(
                  onPressed: () => _logout(context),
                  icon: Container(
                    padding: EdgeInsets.all(8),
                    decoration: BoxDecoration(
                      color: Colors.white24,
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Icon(Icons.logout, color: Colors.white, size: 20),
                  ),
                ),
              ],
            ),
          ),
          
          // Quick Actions
          Padding(
            padding: EdgeInsets.all(20),
            child: Row(
              children: [
                Expanded(child: _buildActionCard(Icons.play_circle_fill, 'Çalmaya\nDevam Et', Color(0xFF667eea))),
                SizedBox(width: 15),
                Expanded(child: _buildActionCard(Icons.favorite, 'Favorilerim', Color(0xFFe74c3c))),
                SizedBox(width: 15),
                Expanded(child: _buildActionCard(Icons.download, 'İndirilenler', Color(0xFF2ecc71))),
              ],
            ),
          ),
          
          // Categories
          Expanded(
            child: Padding(
              padding: EdgeInsets.symmetric(horizontal: 20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Kategoriler',
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.w700,
                      color: Colors.white,
                    ),
                  ),
                  SizedBox(height: 20),
                  Expanded(
                    child: GridView.count(
                      crossAxisCount: 2,
                      crossAxisSpacing: 15,
                      mainAxisSpacing: 15,
                      childAspectRatio: 2.5,
                      children: [
                        _buildCategoryItem('Pop', Color(0xFFe74c3c)),
                        _buildCategoryItem('Rock', Color(0xFF9b59b6)),
                        _buildCategoryItem('Jazz', Color(0xFF2ecc71)),
                        _buildCategoryItem('Klasik', Color(0xFFf39c12)),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
      
      // Bottom Navigation
      bottomNavigationBar: Container(
        height: 80,
        decoration: BoxDecoration(
          color: Colors.black87,
          border: Border(top: BorderSide(color: Colors.white10)),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: [
            _buildNavItem(Icons.home, 'Ana Sayfa', true),
            _buildNavItem(Icons.search, 'Ara', false),
            _buildNavItem(Icons.library_music, 'Kütüphane', false),
            _buildNavItem(Icons.person, 'Profil', false),
          ],
        ),
      ),
    );
  }

  Widget _buildActionCard(IconData icon, String text, Color color) {
    return Container(
      padding: EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Color(0xFF2d2d2d),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: Colors.white10),
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(icon, size: 35, color: color),
          SizedBox(height: 10),
          Text(
            text,
            style: TextStyle(color: Colors.white, fontSize: 11),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }

  Widget _buildCategoryItem(String text, Color color) {
    return Container(
      decoration: BoxDecoration(
        color: color,
        borderRadius: BorderRadius.circular(15),
        boxShadow: [
          BoxShadow(
            color: color.withOpacity(0.3),
            blurRadius: 8,
            offset: Offset(0, 4),
          ),
        ],
      ),
      child: Center(
        child: Text(
          text,
          style: TextStyle(
            color: Colors.white,
            fontSize: 18,
            fontWeight: FontWeight.w600,
          ),
        ),
      ),
    );
  }

  Widget _buildNavItem(IconData icon, String text, bool isActive) {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      decoration: BoxDecoration(
        color: isActive ? Color(0xFF667eea).withOpacity(0.2) : Colors.transparent,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(
            icon,
            size: 22,
            color: isActive ? Color(0xFF667eea) : Colors.grey,
          ),
          SizedBox(height: 4),
          Text(
            text,
            style: TextStyle(
              fontSize: 12,
              color: isActive ? Color(0xFF667eea) : Colors.grey,
            ),
          ),
        ],
      ),
    );
  }

  _logout(BuildContext context) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: Color(0xFF2d2d2d),
        title: Text('Çıkış Yap', style: TextStyle(color: Colors.white)),
        content: Text('Uygulamadan çıkmak istediğinizden emin misiniz?', 
                     style: TextStyle(color: Colors.white70)),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text('İptal', style: TextStyle(color: Colors.grey)),
          ),
          TextButton(
            onPressed: () {
              Navigator.pop(context);
              Navigator.pushReplacement(
                context,
                MaterialPageRoute(builder: (context) => LoginScreen()),
              );
            },
            child: Text('Çıkış Yap', style: TextStyle(color: Color(0xFFe74c3c))),
          ),
        ],
      ),
    );
  }
}