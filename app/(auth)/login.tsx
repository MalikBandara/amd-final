import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { login } from "@/services/authService";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPasword] = useState<string>("");
  const [isLodingReg, setIsLoadingReg] = useState<boolean>(false);

  const handleLogin = async () => {
    // if(!email){

    // }
    //
    if (isLodingReg) return;
    setIsLoadingReg(true);
    await login(email, password)
      .then((res) => {
        console.log(res);
        router.push("/home");
      })
      .catch((err) => {
        console.error(err);
        Alert.alert("Login failed", "Somthing went wrong");
        // import { Alert } from "react-native"
      })
      .finally(() => {
        setIsLoadingReg(false);
      });
  };

  return (
    <View className="justify-center flex-1 p-4 bg-gray-100">
      <Text className="mb-6 text-2xl font-bold text-center text-blue-600">
        Login to Task Manager
      </Text>
      <TextInput
        placeholder="Email"
        className="px-4 py-3 mb-4 text-gray-900 border border-gray-300 rounded bg-surface"
        placeholderTextColor="#9CA3AF"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        className="px-4 py-3 mb-4 text-gray-900 border border-gray-300 rounded bg-surface"
        placeholderTextColor="#9CA3AF"
        secureTextEntry
        value={password}
        onChangeText={setPasword}
      />
      <TouchableOpacity
        className="p-4 mt-2 bg-blue-500 rounded"
        onPress={handleLogin}
      >
        {isLodingReg ? (
          <ActivityIndicator color="#fff" size="large" />
        ) : (
          <Text className="text-2xl text-center text-white">Login</Text>
        )}
      </TouchableOpacity>
      <Pressable onPress={() => router.push("/register")}>
        <Text className="text-xl text-center text-blue-500">
          Don't have an account? Register
        </Text>
      </Pressable>
    </View>
  );
};

export default Login;
