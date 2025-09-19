import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { resetPassword } from "@/services/authService";

const ForgotPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleReset = async () => {
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }
    setLoading(true);
    try {
      await resetPassword(email);
      Alert.alert("✅ Email Sent", "Check your inbox for reset instructions.");
      router.back(); // go back to login
    } catch (err: any) {
      console.error(err);
      Alert.alert("❌ Failed", err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-gray-900"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          padding: 20,
          justifyContent: "center",
          flexGrow: 1,
        }}
      >
        <View className="mb-8">
          <Text className="mb-2 text-3xl font-bold text-white">
            Forgot Password
          </Text>
          <Text className="text-gray-400">
            Enter your email and we’ll send you a reset link.
          </Text>
        </View>

        <TextInput
          placeholder="Enter your email"
          placeholderTextColor="#9CA3AF"
          className="px-5 py-4 mb-4 text-white border bg-white/5 rounded-2xl border-white/10"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TouchableOpacity
          disabled={loading}
          onPress={handleReset}
          className={`w-full py-4 rounded-2xl ${loading ? "bg-gray-600" : "bg-green-500"}`}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-lg font-bold text-center text-white">
              Send Reset Link
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.back()}
          className="items-center mt-6"
        >
          <Text className="text-sm text-green-400 underline">
            Back to Login
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;
