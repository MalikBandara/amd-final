import { register } from "@/services/authService";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Register = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPasword] = useState<string>("");
  const [isLodingReg, setIsLoadingReg] = useState<boolean>(false);

  const handleRegister = async () => {
    // if(!email){

    // }
    //
    if (isLodingReg) return;
    setIsLoadingReg(true);
    await register(email, password)
      .then((res) => {
        console.log(res);
        router.back();
      })
      .catch((err) => {
        console.error(err);
        Alert.alert("Registration fail", "Somthing went wrong");
        // import { Alert } from "react-native"
      })
      .finally(() => {
        setIsLoadingReg(false);
      });
  };

  return (
    <View className="justify-center flex-1 p-4 bg-gray-100">
      <Text className="mb-6 text-2xl font-bold text-center text-blue-600">
        Register
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
        className="p-4 mt-2 bg-green-600 rounded"
        onPress={handleRegister}
      >
        {isLodingReg ? (
          <ActivityIndicator color="#fff" size="large" />
        ) : (
          <Text className="text-2xl text-center text-white">Register</Text>
        )}
      </TouchableOpacity>
      <Pressable onPress={() => router.back()}>
        <Text className="text-xl text-center text-blue-500">
          Alredy have an account? Login
        </Text>
      </Pressable>
    </View>
  );
};

export default Register;
