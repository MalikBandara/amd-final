import { Slot } from "expo-router";

import { View } from "react-native";
import "./../global.css";

const Layout = () => {
  return (
    <View className="flex-1">
      <Slot />
    </View>
  );
};

export default Layout;

// stack navigator

// const stack = []

// route.push

// stack['screen_1', 'screen_2' , 'screen_3']

// Routing  - > map

// Navigation - >
