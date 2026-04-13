import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:shared_preferences/shared_preferences.dart';

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
        fontFamily: 'Roboto',
      ),
      home: SplashScreen(),
      debugShowCheckedModeBanner: false,
    );
  }
}

class SplashScreen extends StatefulWidget {
  @override
  _SplashScreenState createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen>
    with TickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _fadeAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: Duration(seconds: 2),
      vsync: this,
    );
    _fadeAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(_controller);
    
    _controller.forward();
    
    // 3 saniye sonra login kontrolü
    Timer(Duration(seconds: 3), () {
      _checkLoginStatus();
    });
  }

  _checkLoginStatus() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    bool isLoggedIn = prefs.getBool('h_sound_logged_in') ?? false;
    
    if (isLoggedIn) {
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (context) => HomeScreen()),
      );
    } else {
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (context) => LoginScreen()),
      );
    }
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
          child: FadeTransition(
            opacity: _fadeAnimation,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(
                  Icons.music_note,
                  size: 80,
                  color: Colors.white,
                ),
                SizedBox(height: 20),
                Text(
                  'H-SOUND',
                  style: TextStyle(
                    fontSize: 48,
                    fontWeight: FontWeight.w900,
                    color: Colors.white,
                    letterSpacing: 6,
                  ),
                ),
                SizedBox(height: 10),
                Text(
                  'MUSIC STUDIO',
                  style: TextStyle(
                    fontSize: 18,
                    color: Colors.white70,
                    letterSpacing: 2,
                  ),
                ),
                SizedBox(height: 40),
                // Loading dots
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    _buildDot(0),
                    SizedBox(width: 8),
                    _buildDot(1),
                    SizedBox(width: 8),
                    _buildDot(2),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildDot(int index) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        return Container(
          width: 12,
          height: 12,
          decoration: BoxDecoration(
            color: Colors.white,
            shape: BoxShape.circle,
          ),
        );
      },
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }
}

class LoginScreen extends StatefulWidget {
  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _usernameController = TextEditingController();
  final _passwordController = TextEditingController();

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
          child: Padding(
            padding: EdgeInsets.symmetric(horizontal: 35),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                // Header - index.html ile aynı tasarım
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
                
                // Form Container
                Column(
                  children: [
                    // Username Input
                    Container(
                      margin: EdgeInsets.only(bottom: 20),
                      child: Stack(
                        children: [
                          Container(
                            padding: EdgeInsets.only(left: 55, right: 20, top: 13, bottom: 13),
                            decoration: BoxDecoration(
                              color: Color(0xFF1f2029),
                              borderRadius: BorderRadius.circular(4),
                            ),
                            child: TextFormField(
                              controller: _usernameController,
                              style: TextStyle(color: Color(0xFFc4c3ca)),
                              decoration: InputDecoration(
                                hintText: 'Kullanıcı Adı',
                                hintStyle: TextStyle(color: Color(0xFFc4c3ca)),
                                border: InputBorder.none,
                              ),
                            ),
                          ),
                          Positioned(
                            left: 18,
                            top: 14,
                            child: Icon(
                              Icons.person,
                              color: Color(0xFFffeba7),
                              size: 20,
                            ),
                          ),
                        ],
                      ),
                    ),
                    
                    // Password Input
                    Container(
                      margin: EdgeInsets.only(bottom: 20),
                      child: Stack(
                        children: [
                          Container(
                            padding: EdgeInsets.only(left: 55, right: 20, top: 13, bottom: 13),
                            decoration: BoxDecoration(
                              color: Color(0xFF1f2029),
                              borderRadius: BorderRadius.circular(4),
                            ),
                            child: TextFormField(
                              controller: _passwordController,
                              obscureText: true,
                              style: TextStyle(color: Color(0xFFc4c3ca)),
                              decoration: InputDecoration(
                                hintText: 'Şifre',
                                hintStyle: TextStyle(color: Color(0xFFc4c3ca)),
                                border: InputBorder.none,
                              ),
                            ),
                          ),
                          Positioned(
                            left: 18,
                            top: 14,
                            child: Icon(
                              Icons.lock,
                              color: Color(0xFFffeba7),
                              size: 20,
                            ),
                          ),
                        ],
                      ),
                    ),
                    
                    // Login Button
                    Container(
                      width: double.infinity,
                      margin: EdgeInsets.only(top: 20),
                      child: ElevatedButton(
                        onPressed: _handleLogin,
                        style: ElevatedButton.styleFrom(
                          padding: EdgeInsets.symmetric(vertical: 12),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(6),
                          ),
                          backgroundColor: Color(0xFF3498DB),
                        ),
                        child: Text(
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
    );
  }

  _handleLogin() async {
    String username = _usernameController.text;
    String password = _passwordController.text;

    if (username.isEmpty || password.isEmpty) {
      _showAlert('Lütfen kullanıcı adı ve şifrenizi girin.');
      return;
    }

    // Firebase auth işlemi burada olacak
    // Şimdilik simulated login
    SharedPreferences prefs = await SharedPreferences.getInstance();
    await prefs.setBool('h_sound_logged_in', true);
    await prefs.setString('h_sound_username', username);

    Navigator.pushReplacement(
      context,
      MaterialPageRoute(builder: (context) => HomeScreen()),
    );
  }

  _showAlert(String message) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('H-Sound'),
        content: Text(message),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text('Tamam'),
          ),
        ],
      ),
    );
  }
}

class HomeScreen extends StatelessWidget {
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
                Text('9:41', style: TextStyle(color: Colors.white, fontWeight: FontWeight.w600)),
                Text('H-Sound', style: TextStyle(color: Colors.white, fontWeight: FontWeight.w600)),
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
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Merhaba, Kullanıcı',
                      style: TextStyle(
                        fontSize: 24,
                        fontWeight: FontWeight.w700,
                        color: Colors.white,
                      ),
                    ),
                    Text(
                      'Bugün ne dinlemek istiyorsun?',
                      style: TextStyle(
                        fontSize: 16,
                        color: Colors.white70,
                      ),
                    ),
                  ],
                ),
                IconButton(
                  onPressed: _logout,
                  icon: Icon(Icons.logout, color: Colors.white),
                ),
              ],
            ),
          ),
          
          // Quick Actions
          Padding(
            padding: EdgeInsets.all(20),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                _buildActionCard(Icons.play_circle_fill, 'Çalmaya Devam Et', Color(0xFF667eea)),
                _buildActionCard(Icons.favorite, 'Favorilerim', Color(0xFFe74c3c)),
                _buildActionCard(Icons.download, 'İndirilenler', Color(0xFF2ecc71)),
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
        color: Colors.black87,
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
    return Expanded(
      child: Container(
        margin: EdgeInsets.symmetric(horizontal: 5),
        padding: EdgeInsets.all(20),
        decoration: BoxDecoration(
          color: Color(0xFF2d2d2d),
          borderRadius: BorderRadius.circular(20),
          border: Border.all(color: Colors.white10),
        ),
        child: Column(
          children: [
            Icon(icon, size: 40, color: color),
            SizedBox(height: 10),
            Text(
              text,
              style: TextStyle(color: Colors.white, fontSize: 12),
              textAlign: TextAlign.center,
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildCategoryItem(String text, Color color) {
    return Container(
      decoration: BoxDecoration(
        color: color,
        borderRadius: BorderRadius.circular(15),
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
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
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
    );
  }

  _logout() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    await prefs.remove('h_sound_logged_in');
    await prefs.remove('h_sound_username');
    // Navigator.pushReplacement ile login ekranına dön
  }
}