@echo off
echo React Native Profesyonel Setup
echo =================================

echo 1. Node.js kontrol ediliyor...
node --version
npm --version

echo 2. Expo CLI kurulumu...
npm install -g @expo/cli

echo 3. React Native proje olusturuluyor...
npx create-expo-app HSoundMobile --template blank

echo 4. Proje klasorune geciliyor...
cd HSoundMobile

echo 5. Gerekli dependencies kuruluyor...
npm install expo-linear-gradient @expo/vector-icons @react-native-async-storage/async-storage

echo 6. Ozel dosyalar kopyalaniyor...
copy ..\App.jsx App.js
copy ..\app.json app.json

echo 7. Proje hazir!
echo Calistirmak icin: npm start
echo APK olusturmak icin: eas build --platform android

pause