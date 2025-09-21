# 🍲 Cook Book – Recipe App  
**Module:** ITS 2127 - Advanced Mobile Developer (AMD)  

---

## 🚀 Project Overview  
**Cook Book** is a cross-platform mobile recipe management app built with **React Native (Expo)** and **Firebase (Firestore + Authentication)**.  

The app allows **Admins** to manage recipes (add, edit, delete) and **Users** to view recipes with restricted access.  

Key Features:  
- ✅ **User Authentication** (Register, Login, Logout)  
- ✅ **Role-based Access Control** (Admin vs User)  
- ✅ **CRUD Operations** for recipes (Create, Read, Update, Delete)  
- ✅ **State Management** (React Context API , useState , useEffect)  
- ✅ **Navigation** (Expo Router – Stack Navigation)  
- ✅ **Responsive & User-friendly UI**  
- ✅ **Android Build (APK) Provided)**  
- ✅ **Demo Video** (YouTube showcase of features)  

---

## 🎥 Demo Video  
📌 [Watch on YouTube](https://youtu.be/vyzfHMrkzEc?si=k2deZSvLY4XhXuCn)  

---

## ⚙️ Tech Stack  
- **Frontend:** React Native (Expo)  
- **Backend:** Firebase Firestore  
- **Authentication:** Firebase Authentication (Email/Password)  
- **State Management:** React Context API  
- **Navigation:** Expo Router (Stack Navigation)  

---

## 📂 Project Structure  

AMD-FINAL/
│ app.json
│ babel.config.js
│ eas.json
│ package.json
│ tsconfig.json
│ README.md
│ .gitignore
│
├─ app/
│ ├─ (auth)/
│ │ ├─ login.tsx
│ │ └─ register.tsx
│ ├─ (dashboard)/
│ │ ├─ home.tsx ← Recipe list
│ │ ├─ recipeCreate.tsx ← Create recipe (Admin only)
│ │ ├─ recipeEdit.tsx ← Edit recipe (Admin only)
│ │ └─ recipeView.tsx ← View recipe (User/Admin)
│ ├─ _layout.tsx
│ └─ index.tsx
│
├─ assets/ ← Images / Fonts
│
├─ components/
│ ├─ AdminOnly.tsx ← Guarded route for Admin role
│ ├─ Loader.tsx ← Loading indicator
│
├─ context/
│ ├─ authContext.tsx ← Authentication state
│ └─ LoaderContext.tsx ← Global loader state
│
├─ services/
│ ├─ authService.ts ← Firebase auth functions
│ └─ recipeService.ts ← Firestore recipe CRUD
│
├─ types/
│ └─ recipe.ts ← Type definitions for recipes
│
├─ scripts/ ← Utility scripts (if any)
│
└─ my-expo-app/ ← Expo helper folder



---

## 🔑 Core Functionalities  

### 👨‍🍳 Admin Role  
- Add new recipes  
- Edit existing recipes  
- Delete recipes  
- View all recipes  

### 👤 User Role  
- Register / Login  
- View all recipes  
- **No access** to create, edit, or delete  

---

## 🛠️ Setup & Run Instructions  

### 1. Clone the Repository  
```bash

git clone https://github.com/MalikBandara/amd-final.git
cd cook-book








