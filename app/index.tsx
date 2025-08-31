import { useAuth } from "@/context/authContext";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

const Index = () => {
  const router = useRouter();
  const { user, loading } = useAuth();
  console.log("User data : ", user);

  useEffect(() => {
    if (!loading) {
      if (user) router.replace("/home");
      else router.replace("/login");
    }
  }, [user, loading]);

  if (loading) {
    return (
      <View className="justify-center flex-1 w-full align-items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return null;
};

export default Index;
