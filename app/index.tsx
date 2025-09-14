import React from "react";
import { Image, Text, View } from "react-native";

const Index = () => {
  return (
    <View className="items-center justify-center flex-1">
      <Image
        source={require("../assets/images/home_image.jpg")}
        style={{ width: 300, height: 300 }}
      />
      <Text className="text-2xl text-green-500">Welcome to the App</Text>
    </View>
  );
};

export default Index;
