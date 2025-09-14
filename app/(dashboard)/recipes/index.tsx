import { useAuth } from "@/context/authContext";
import { createRecipe } from "@/services/recipeService";
import { Recipe } from "@/types/recipe";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
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
      // Reset form
      setTitle("");
      setDescription("");
      setIngredients("");
      setSteps("");
      router.back(); // go back to recipe list/home
    } catch (err) {
      console.error("Create recipe error:", err);
      Alert.alert("❌ Error", "Failed to create recipe");
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-[#0A0F1C]" contentContainerStyle={{ padding: 20 }}>
      {/* ---------- HEADER ---------- */}
      <Text className="mb-6 text-3xl font-extrabold text-green-400">
        ✨ Create New Recipe
      </Text>

      {/* ---------- FORM ---------- */}
      <TextInput
        placeholder="Recipe Title"
        placeholderTextColor="#9CA3AF"
        value={title}
        onChangeText={setTitle}
        className="p-4 mb-4 text-lg text-white bg-[#1C2232] rounded-2xl"
      />

      <TextInput
        placeholder="Short description"
        placeholderTextColor="#9CA3AF"
        value={description}
        onChangeText={setDescription}
        className="p-4 mb-4 text-lg text-white bg-[#1C2232] rounded-2xl"
        multiline
      />

      <TextInput
        placeholder="Ingredients (comma separated)"
        placeholderTextColor="#9CA3AF"
        value={ingredients}
        onChangeText={setIngredients}
        className="p-4 mb-4 text-lg text-white bg-[#1C2232] rounded-2xl"
        multiline
      />

      <TextInput
        placeholder="Steps (line separated)"
        placeholderTextColor="#9CA3AF"
        value={steps}
        onChangeText={setSteps}
        className="p-4 mb-6 text-lg text-white bg-[#1C2232] rounded-2xl"
        multiline
      />

      {/* ---------- SAVE BUTTON ---------- */}
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
            🚀 Save Recipe
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}
