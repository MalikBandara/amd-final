import { register } from "@/services/authService";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

const Register = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isLoadingReg, setIsLoadingReg] = useState<boolean>(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);

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

  const validateForm = () => {
    if (!email) {
      Alert.alert("Validation Error", "Email is required");
      return false;
    }
    if (!email.includes("@")) {
      Alert.alert("Validation Error", "Please enter a valid email");
      return false;
    }
    if (!password) {
      Alert.alert("Validation Error", "Password is required");
      return false;
    }
    if (password.length < 6) {
      Alert.alert("Validation Error", "Password must be at least 6 characters");
      return false;
    }
    if (password !== confirmPassword) {
      Alert.alert("Validation Error", "Passwords do not match");
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validateForm() || isLoadingReg) return;

    setIsLoadingReg(true);

    try {
      const res = await register(email, password);
      console.log(res);

      // Success animation
      Alert.alert("Success! 🎉", "Account created successfully", [
        { text: "Continue", onPress: () => router.back() },
      ]);
    } catch (err) {
      console.error(err);
      Alert.alert(
        "Registration Failed",
        "Something went wrong. Please try again."
      );
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
          <View className="absolute rounded-full bottom-40 -right-20 w-96 h-96 bg-orange-500/6 blur-3xl" />
        </View>
        export default Register;

        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 px-6 pt-16 pb-8">
            {/* Header Section */}
            <Animated.View
              className="items-center mb-12"
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
                Join our community of passionate home chefs
              </Text>
            </Animated.View>

            {/* Form Section */}
            <Animated.View
              className="mb-8 space-y-6"
              style={{
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              }}
            >
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
                    placeholder="chef@cookbook.com"
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
                    placeholder="Enter secure password"
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

              {/* Confirm Password Input */}
              <View>
                <Text className="mb-2 ml-1 text-sm font-medium text-white/80">
                  Confirm Password
                </Text>
                <View
                  className={`relative ${
                    confirmPasswordFocused
                      ? "bg-white/10 border-green-500/50"
                      : "bg-white/5 border-white/10"
                  } border rounded-2xl`}
                >
                  <TextInput
                    placeholder="Confirm your password"
                    className="px-5 py-4 text-lg text-white"
                    placeholderTextColor="#9CA3AF"
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    onFocus={() => setConfirmPasswordFocused(true)}
                    onBlur={() => setConfirmPasswordFocused(false)}
                  />
                  <View className="absolute right-4 top-4">
                    <Text className="text-lg text-blue-400">✓</Text>
                  </View>
                </View>
              </View>
            </Animated.View>

            {/* Register Button */}
            <TouchableOpacity
              className={`w-full py-4 rounded-2xl mb-6 ${
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
                    <Text className="text-xs text-white">🚀</Text>
                  </View>
                  <Text className="text-lg font-bold text-white">
                    Create Account
                  </Text>
                </View>
              )}
            </TouchableOpacity>

            {/* Login Link */}
            <Pressable
              onPress={() => router.push("/(auth)/login")}
              className="items-center py-4"
            >
              <Text className="text-base text-white/70">
                Already have an account?{" "}
                <Text className="font-semibold text-green-400 underline">
                  Sign In
                </Text>
              </Text>
            </Pressable>

            {/* Terms */}
            <Text className="mt-4 text-xs leading-5 text-center text-white/40">
              By creating an account, you agree to our{" "}
              <Text className="text-green-400">Terms of Service</Text> and{" "}
              <Text className="text-green-400">Privacy Policy</Text>
            </Text>
          </View>
        </ScrollView>

        {/* Edge Lighting */}
        <View className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent" />
      </KeyboardAvoidingView>
    </>
  );
};

export default Register;
