# 🍲 Cook Book App  

Cook Book is a React Native mobile application built with **Expo Router** that allows users to create, manage, and explore recipes.  
The app includes **authentication**, **role-based access (Admin/User)**, recipe collection management, and a clean UI.  

---

## 🎥 Demo Video  
📌 [Watch on YouTube](https://youtu.be/vyzfHMrkzEc?si=k2deZSvLY4XhXuCn)  


---

## ✨ Features  
- 🔐 **User authentication** (Login & Sign Up with Firebase)  
- 👁️ **Password visibility toggle**  
- 📖 **Recipe collection dashboard**  
- ✏️ **Admin-only features** – Add, Edit, Delete recipes  
- 👤 **User role** – View recipes only  
- 💬 **Community-inspired design** for sharing cooking ideas  

---

## 🛠️ Tech Stack  
- **Frontend:** React Native, Expo Router, Tailwind CSS  
- **Backend:** Firebase Firestore  
- **Authentication:** Firebase Auth (Email/Password)  
- **Icons:** Lucide React Native  
- **State Management:** React Context API, React useState / useEffect  
- **Navigation:** Expo Router (Stack Navigator)  

---

## ⚙️ Prerequisites  
- Node.js >= 18  
- npm >= 9 or Yarn  
- Expo CLI (`npm install -g expo-cli`)  
- Android Studio / Xcode for simulator OR a physical device with **Expo Go app**  

---

## 🚀 Getting Started  

### 1️⃣ Clone the Repository  
```bash
git clone https://github.com/MalikBandara/amd-final.git
cd amd-final

```

---

### 2️⃣ Install Dependencies

npm install
# or
yarn install

---

### 3️⃣ Configure Firebase

Create a Firebase project at Firebase Console

Enable Authentication (Email/Password)

Enable Cloud Firestore

Copy your Firebase config and replace it inside firebaseConfig.ts


---

### 4️⃣ Start Expo

npx expo start
# or
expo start


---

### 📱 Running on Devices
▶️ Android Emulator

npx expo run:android

📲 Physical Device

Install Expo Go from Play Store / App Store

Scan the QR code shown in the terminal or Expo Dev Tools


---

### 🏗️ Build & Deploy
📦 Expo Build (Classic)

expo build:android

### 🚀 EAS Build

eas build -p android --profile preview

