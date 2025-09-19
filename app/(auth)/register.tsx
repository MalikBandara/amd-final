import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
  ActivityIndicator,
  StatusBar,
  Dimensions,
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "expo-router";
import { register } from "@/services/authService";

const { width, height } = Dimensions.get("window");

const Register = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoadingReg, setIsLoadingReg] = useState<boolean>(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [name, setName] = useState<string>("");

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const headerAnim = useRef(new Animated.Value(-50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(headerAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleRegister = async () => {
    if (isLoadingReg) return;

    // Basic Validation
    if (!name.trim()) {
      Alert.alert("Validation Error", "Full name is required");
      return;
    }
    if (!emailRegex.test(email)) {
      Alert.alert("Validation Error", "Please enter a valid email address");
      return;
    }
    if (password.length < 6) {
      Alert.alert("Validation Error", "Password must be at least 6 characters");
      return;
    }

    setIsLoadingReg(true);
    try {
      const res = await register(name, email, password);
      Alert.alert(
        "✅ Success",
        "Account created successfully. You can log in now."
      );
      router.back();
    } catch (err: any) {
      console.error(err);
      let message = "Something went wrong. Please try again.";
      if (err.code === "auth/email-already-in-use") {
        message = "This email is already registered.";
      } else if (err.code === "auth/weak-password") {
        message = "Password must be stronger (at least 6 characters).";
      }
      Alert.alert("Registration Failed", message);
    } finally {
      setIsLoadingReg(false);
    }
  };

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <KeyboardAvoidingView
        className="flex-1 bg-gray-900"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Background Elements */}
        <View className="absolute inset-0">
          <View className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900" />
          <View className="absolute rounded-full top-20 -left-20 w-80 h-80 bg-green-500/8 blur-3xl" />
          <View className="absolute rounded-full bottom-40 -right-20 w-96 h-96 bg-blue-500/6 blur-3xl" />
        </View>

        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 px-6 pt-16 pb-8">
            {/* Header Section */}
            <Animated.View
              className="items-center mb-16"
              style={{
                opacity: fadeAnim,
                transform: [{ translateY: headerAnim }],
              }}
            >
              {/* Back Button */}
              <TouchableOpacity
                className="absolute left-0 items-center justify-center w-10 h-10 border rounded-full top-2 bg-white/10 border-white/20"
                onPress={() => router.back()}
              >
                <Text className="text-lg text-white">←</Text>
              </TouchableOpacity>

              <View className="w-16 h-1 mb-6 bg-green-500 rounded-full" />
              <Text className="mb-2 text-4xl font-black tracking-tight text-white">
                Create Account
              </Text>
              <Text className="max-w-xs text-base text-center text-white/60">
                Sign up to start your cooking journey
              </Text>

              {/* Chef Hat Icon */}
              <View className="items-center justify-center w-20 h-20 mt-6 border rounded-full bg-green-500/10 border-green-500/20">
                <Text className="text-3xl">🍳</Text>
              </View>
            </Animated.View>

            {/* Form Section */}
            <Animated.View
              className="mb-8 space-y-6"
              style={{
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              }}
            >
              {/* Name Input */}
              <View>
                <Text className="mb-2 ml-1 text-sm font-medium text-white/80">
                  Full Name
                </Text>
                <View
                  className={`relative ${
                    name
                      ? "bg-white/10 border-green-500/50"
                      : "bg-white/5 border-white/10"
                  } border rounded-2xl`}
                >
                  <TextInput
                    placeholder="Enter your full name"
                    className="px-5 py-4 text-lg text-white"
                    placeholderTextColor="#9CA3AF"
                    value={name}
                    onChangeText={setName}
                  />
                  <View className="absolute right-4 top-4">
                    <Text className="text-lg text-green-400">👤</Text>
                  </View>
                </View>
              </View>

              {/* Email Input */}
              <View>
                <Text className="mb-2 ml-1 text-sm font-medium text-white/80">
                  Email Address
                </Text>
                <View
                  className={`relative ${
                    emailFocused
                      ? "bg-white/10 border-green-500/50"
                      : "bg-white/5 border-white/10"
                  } border rounded-2xl`}
                >
                  <TextInput
                    placeholder="Enter your email"
                    className="px-5 py-4 text-lg text-white"
                    placeholderTextColor="#9CA3AF"
                    value={email}
                    onChangeText={setEmail}
                    onFocus={() => setEmailFocused(true)}
                    onBlur={() => setEmailFocused(false)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                  <View className="absolute right-4 top-4">
                    <Text className="text-lg text-green-400">📧</Text>
                  </View>
                </View>
              </View>

              {/* Password Input */}
              <View>
                <Text className="mb-2 ml-1 text-sm font-medium text-white/80">
                  Password
                </Text>
                <View
                  className={`relative ${
                    passwordFocused
                      ? "bg-white/10 border-green-500/50"
                      : "bg-white/5 border-white/10"
                  } border rounded-2xl`}
                >
                  <TextInput
                    placeholder="Enter your password"
                    className="px-5 py-4 text-lg text-white"
                    placeholderTextColor="#9CA3AF"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                  />
                  <View className="absolute right-4 top-4">
                    <Text className="text-lg text-orange-400">🔐</Text>
                  </View>
                </View>
              </View>
            </Animated.View>

            {/* Register Button */}
            <TouchableOpacity
              className={`w-full py-4 rounded-2xl mb-8 ${
                isLoadingReg ? "bg-gray-600" : "bg-green-500"
              }`}
              onPress={handleRegister}
              disabled={isLoadingReg}
              style={{
                shadowColor: "#10B981",
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: isLoadingReg ? 0.1 : 0.3,
                shadowRadius: 20,
                elevation: 15,
              }}
            >
              {isLoadingReg ? (
                <View className="flex-row items-center justify-center">
                  <ActivityIndicator color="#fff" size="small" />
                  <Text className="ml-3 text-lg font-bold text-white">
                    Creating Account...
                  </Text>
                </View>
              ) : (
                <View className="flex-row items-center justify-center">
                  <View className="items-center justify-center w-6 h-6 mr-3 rounded-full bg-white/20">
                    <Text className="text-xs text-white">✨</Text>
                  </View>
                  <Text className="text-lg font-bold text-white">Register</Text>
                </View>
              )}
            </TouchableOpacity>

            {/* Login Link */}
            <Pressable
              onPress={() => router.back()}
              className="items-center py-4"
            >
              <Text className="text-base text-white/70">
                Already have an account?{" "}
                <Text className="font-semibold text-green-400 underline">
                  Login
                </Text>
              </Text>
            </Pressable>

            {/* Info Note */}
            <View className="items-center p-4 mt-8 border bg-white/5 rounded-2xl border-white/10">
              <Text className="text-sm leading-5 text-center text-white/60">
                🎉 Join our cooking community today and save your favorite
                recipes
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* Edge Lighting */}
        <View className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent" />
      </KeyboardAvoidingView>
    </>
  );
};

export default Register;
