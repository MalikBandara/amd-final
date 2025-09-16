import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

const Index = () => {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {/* Main Container */}
      <View className="flex-1 bg-gray-900" style={{ minHeight: height }}>
        {/* Dynamic Background */}
        <View className="absolute inset-0">
          <View className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900" />

          {/* Animated Background Elements */}
          <View className="absolute rounded-full top-20 -left-20 w-80 h-80 bg-green-500/10 blur-3xl" />
          <View className="absolute rounded-full bottom-40 -right-20 w-96 h-96 bg-orange-500/8 blur-3xl" />
          <View className="absolute w-64 h-64 rounded-full top-1/2 left-1/3 bg-blue-500/5 blur-2xl" />
        </View>

        {/* Content Container */}
        <Animated.View
          className="flex-1 px-6"
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >
          {/* Header Section */}
          <View className="items-center pt-16 pb-8">
            <View className="w-16 h-1 mb-6 bg-green-500 rounded-full" />
            <Text className="text-sm font-semibold tracking-wider text-green-400 uppercase">
              Premium Cooking Experience
            </Text>
          </View>

          {/* Hero Section */}
          <View className="items-center justify-center flex-1">
            {/* Main Hero Image with Pixel 9 Style */}
            <Animated.View
              className="relative mb-12"
              style={{ transform: [{ scale: scaleAnim }] }}
            >
              {/* Main Image Container */}
              <View className="relative">
                <View
                  className="overflow-hidden border shadow-2xl w-72 h-72 rounded-3xl border-white/5"
                  style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 20 },
                    shadowOpacity: 0.5,
                    shadowRadius: 30,
                    elevation: 20,
                  }}
                >
                  <Image
                    source={require("../assets/images/home_image.jpg")}
                    className="w-full h-full"
                    resizeMode="cover"
                  />

                  {/* Image Overlay */}
                  <View className="absolute inset-0">
                    <View className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />

                    {/* Floating Badge */}
                    <View className="absolute px-3 py-1 bg-green-500 rounded-full top-4 right-4">
                      <Text className="text-xs font-bold text-white">NEW</Text>
                    </View>
                  </View>
                </View>

                {/* Floating Action Icons */}
                <View className="absolute items-center justify-center w-12 h-12 bg-green-500 rounded-full shadow-lg -top-4 -right-4">
                  <Text className="text-lg text-white">✨</Text>
                </View>
                <View className="absolute items-center justify-center bg-orange-500 rounded-full shadow-lg -bottom-4 -left-4 w-14 h-14">
                  <Text className="text-xl text-white">🍳</Text>
                </View>
                <View className="absolute items-center justify-center w-8 h-8 bg-blue-500 rounded-full shadow-md top-8 -left-6">
                  <Text className="text-sm text-white">⭐</Text>
                </View>
              </View>
            </Animated.View>

            {/* Title and Branding */}
            <View className="items-center mb-8">
              <Text className="mb-2 text-5xl font-black tracking-tight text-center text-white">
                Cook Book
              </Text>
              <Text className="text-base font-medium tracking-widest text-green-400">
                CHEF'S COLLECTION
              </Text>

              {/* Rating Section */}
              <View className="flex-row items-center px-4 py-2 mt-4 border rounded-full bg-white/5 border-white/10">
                <View className="flex-row">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Text key={star} className="text-lg text-yellow-400">
                      ⭐
                    </Text>
                  ))}
                </View>
                <Text className="ml-2 text-sm text-white/70">
                  4.9 • 1K+ recipes
                </Text>
              </View>
            </View>

            {/* Description */}
            <Text className="max-w-xs mb-12 text-lg font-light leading-7 text-center text-white/70">
              Master culinary arts with chef-curated recipes and step-by-step
              guides
            </Text>
          </View>

          {/* Bottom Action Section */}
          <View className="pb-12 space-y-4">
            {/* Primary Action Button - Pixel Style */}
            <TouchableOpacity
              className="w-full py-4 mb-2 rounded-full active:scale-95"
              onPress={() => router.push("/(auth)/register")}
              style={{
                backgroundColor: "#10B981",
                shadowColor: "#10B981",
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.3,
                shadowRadius: 20,
                elevation: 15,
              }}
            >
              <View className="flex-row items-center justify-center">
                <View className="items-center justify-center w-6 h-6 mr-3 rounded-full bg-white/20">
                  <Text className="text-xs text-white ">🚀</Text>
                </View>
                <Text className="text-lg font-bold text-white">
                  Start Your Journey
                </Text>
              </View>
            </TouchableOpacity>

            {/* Secondary Action */}
            <TouchableOpacity
              className="w-full py-4 border rounded-full mb bg-white/5 border-white/10 active:scale-95 backdrop-blur-sm"
              onPress={() => router.push("/(auth)/login")}
            >
              <Text className="text-lg font-medium text-center text-white">
                I have an account
              </Text>
            </TouchableOpacity>

            {/* Social Proof */}
            <View className="items-center mt-8">
              <View className="flex-row items-center mb-2 space-x-2">
                <View className="flex-row -space-x-2">
                  <View className="w-8 h-8 bg-green-500 border-2 border-gray-900 rounded-full" />
                  <View className="w-8 h-8 bg-orange-500 border-2 border-gray-900 rounded-full" />
                  <View className="w-8 h-8 bg-blue-500 border-2 border-gray-900 rounded-full" />
                  <View className="items-center justify-center w-8 h-8 bg-purple-500 border-2 border-gray-900 rounded-full">
                    <Text className="text-xs font-bold text-white">+</Text>
                  </View>
                </View>
              </View>
              <Text className="text-sm text-white/50">
                Join 2.5M+ passionate home chefs
              </Text>
            </View>

            {/* Bottom Navigation Indicator */}
            <View className="items-center mt-8">
              <View className="w-32 h-1 rounded-full bg-white/20" />
            </View>
          </View>
        </Animated.View>

        {/* Pixel 9 Style Edge Lighting */}
        <View className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent" />
      </View>
    </>
  );
};

export default Index;
