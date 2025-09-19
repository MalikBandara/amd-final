import { useAuth } from "@/context/authContext";
import { createRecipe } from "@/services/recipeService";
import { Recipe } from "@/types/recipe";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

export default function CreateRecipePage() {
  const { user, isAdmin } = useAuth();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [saving, setSaving] = useState(false);

  if (!isAdmin) {
    return (
      <View className="flex-1 items-center justify-center bg-[#0A0F1C] p-6">
        <Text className="text-lg text-gray-400">🚫 Only admins can create recipes</Text>
      </View>
    );
  }

  const handleSave = async () => {
  if (!title.trim()) {
    Alert.alert("Validation", "Title is required");
    return;
  }
  setSaving(true);
  try {
    const newRecipe: Omit<Recipe, "createdAt"> = {
      title,
      description,
      ingredients: ingredients.split(",").map((i) => i.trim()).filter(Boolean),
      steps: steps.split("\n").map((s) => s.trim()).filter(Boolean),
      isPublished: true,
      createdBy: user?.uid || "",
    };
    await createRecipe(newRecipe);
    Alert.alert("✅ Success", "Recipe created successfully");
    setTitle("");
    setDescription("");
    setIngredients("");
    setSteps("");

    // ⬇️ Navigate back and trigger refresh
    router.push({
      pathname: "/home",
      params: { refresh: Date.now().toString() },
    });
  } catch (err) {
    
    Alert.alert("❌ Error", "Failed to create recipe");
  } finally {
    setSaving(false);
  }
};


  return (
    <View className="flex-1 bg-[#0A0F1C]">

       {/* 🔙 Back Button */}
      <View className="flex-row items-center p-4 mt-12">
        <TouchableOpacity
          onPress={() => router.push("/home")}
          className="flex-row items-center"
        >
          <ArrowLeft size={24} color="white" />
          <Text className="ml-2 text-base text-white">Back</Text>
        </TouchableOpacity>
      </View>
      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        {/* Header with Premium Badge */}
        <View className="items-center px-6 pt-12 pb-4">
          <View className="px-4 py-2 mb-4 rounded-full bg-green-500/20">
            <Text className="text-xs font-bold tracking-wider text-green-400 uppercase">
              PREMIUM COOKING EXPERIENCE
            </Text>
          </View>
          
          {/* Hero Card - More Compact */}
          <View 
            className="bg-[#1C2232] rounded-3xl p-6 mx-4 items-center"
            style={{
              shadowColor: "#10B981",
              shadowOffset: { width: 0, height: 20 },
              shadowOpacity: 0.3,
              shadowRadius: 25,
              elevation: 15,
            }}
          >
            <Text className="mb-2 text-4xl">📝</Text>
            <Text className="mb-1 text-2xl font-bold text-center text-white">
              Create Recipe
            </Text>
            <Text className="text-xs font-semibold tracking-wider text-green-400 uppercase">
              CHEF'S COLLECTION
            </Text>
            
            {/* Rating Stars - More Compact */}
            <View className="flex-row items-center mt-2 mb-1">
              <Text className="text-sm text-yellow-400">⭐⭐⭐⭐⭐</Text>
              <Text className="ml-2 text-xs text-gray-400">4.9 • 1K+ recipes</Text>
            </View>
            
            <Text className="mt-1 text-xs leading-4 text-center text-gray-300">
              Master culinary arts with chef-curated{'\n'}recipes and step-by-step guides
            </Text>
          </View>
        </View>

        {/* Form Container - More Compact */}
        <View className="px-6">
          {/* Recipe Title Input */}
          <TextInput
            placeholder="Recipe Title"
            placeholderTextColor="#9CA3AF"
            value={title}
            onChangeText={setTitle}
            className="mb-3 px-6 py-4 text-base text-white bg-[#1C2232] rounded-2xl border border-gray-700/30"
          />

          {/* Description Input */}
          <TextInput
            placeholder="Short description"
            placeholderTextColor="#9CA3AF"
            value={description}
            onChangeText={setDescription}
            className="mb-3 px-6 py-4 text-base text-white bg-[#1C2232] rounded-2xl border border-gray-700/30"
            multiline
          />

          {/* Ingredients Input */}
          <TextInput
            placeholder="Ingredients (comma separated)"
            placeholderTextColor="#9CA3AF"
            value={ingredients}
            onChangeText={setIngredients}
            className="mb-3 px-6 py-4 text-base text-white bg-[#1C2232] rounded-2xl border border-gray-700/30"
            multiline
          />

          {/* Steps Input */}
          <TextInput
            placeholder="Steps (line separated)"
            placeholderTextColor="#9CA3AF"
            value={steps}
            onChangeText={setSteps}
            className="mb-4 px-6 py-4 text-base text-white bg-[#1C2232] rounded-2xl border border-gray-700/30"
            multiline
          />

          {/* Action Buttons */}
          <View className="mt-4">
            {/* Save Recipe Button */}
            <TouchableOpacity
              onPress={handleSave}
              disabled={saving}
              className={`w-full py-4 rounded-2xl ${
                saving ? "bg-gray-500" : "bg-green-500"
              }`}
              style={{
                shadowColor: "#10B981",
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.3,
                shadowRadius: 10,
                elevation: 6,
              }}
            >
              {saving ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-xl font-bold text-center text-white">
                   Save Recipe
                </Text>
              )}
            </TouchableOpacity>

            
          </View>

          {/* Footer - More Compact */}
          <View className="flex-row items-center justify-center mt-6 space-x-2">
            <View className="w-2 h-2 bg-green-400 rounded-full"></View>
            <View className="w-2 h-2 bg-blue-400 rounded-full"></View>
            <View className="w-2 h-2 bg-orange-400 rounded-full"></View>
            <View className="w-2 h-2 bg-purple-400 rounded-full"></View>
          </View>
          <Text className="mt-2 text-xs text-center text-gray-400">
            Join 2.5M+ passionate home chefs
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}