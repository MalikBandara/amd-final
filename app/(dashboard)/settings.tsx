import { useAuth } from "@/context/authContext";
import { logout } from "@/services/authService";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

const SettingScreen = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);

    try {
      await logout();
      router.replace("/(auth)/login");
    } catch (err) {
      console.error(err);
      Alert.alert("Logout Failed", "Something went wrong.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <View className="flex-1 bg-[#0f172a] items-center justify-between pt-16 pb-10">
        {/* Header Image */}
        <View className="relative">
          <Image
            source={{ uri: user?.photoURL || "https://avatar.iran.liara.run/public/6" }}
            className="w-48 h-48 border-4 border-green-500 rounded-full"
          />
          {/* Badge */}
          <View className="absolute items-center justify-center w-8 h-8 bg-green-500 rounded-full bottom-2 right-2">
            <Text className="font-bold text-white">✓</Text>
          </View>
        </View>

        {/* User Info */}
        <View className="items-center px-6">
          <Text className="text-3xl font-extrabold text-white">Settings</Text>
          <Text className="mt-1 text-lg text-green-400">{user?.displayName || "Guest User"}</Text>
          <Text className="mt-1 text-sm text-gray-400">{user?.email}</Text>
        </View>

        {/* Action Buttons */}
        <View className="w-full px-8 mt-10 space-y-4">
          <TouchableOpacity
            className={`w-full py-4 rounded-2xl ${isLoggingOut ? "bg-gray-600" : "bg-red-500"}`}
            onPress={handleLogout}
            disabled={isLoggingOut}
            style={{
              shadowColor: "#ef4444",
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.3,
              shadowRadius: 20,
              elevation: 12,
            }}
          >
            {isLoggingOut ? (
              <View className="flex-row items-center justify-center">
                <ActivityIndicator color="#fff" size="small" />
                <Text className="ml-3 text-lg font-bold text-white">Logging Out...</Text>
              </View>
            ) : (
              <Text className="text-lg font-bold text-center text-white">Logout</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            className="w-full py-4 rounded-2xl bg-white/10"
            onPress={() => router.back()}
          >
            <Text className="text-lg font-bold text-center text-white">Back</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View className="items-center mt-12">
          <Text className="text-xs text-gray-400">⚡ Powered by Cook Book</Text>
        </View>
      </View>
    </>
  );
};

export default SettingScreen;
