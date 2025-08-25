import React from "react";
import { ActivityIndicator, View } from "react-native";

const StartPage = () => {
  return (
    <View className="justify-center flex-1 ">
      {/* loading indicator එකක් (spinner) display කරන්න භාවිත කරන එක. */}
      <ActivityIndicator size="large" color="gray" />
    </View>
  );
};

export default StartPage;
