import { AdminOnly } from "@/components/AdminOnly";
import { useAuth } from "@/context/authContext";
import { createRecipe } from "@/services/recipeService";
import { Recipe } from "@/types/recipe";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, ScrollView, Text, TextInput, TouchableOpacity } from "react-native";

export default function CreateRecipeScreen() {
  const { user } = useAuth();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert("Validation", "Title is required");
      return;
    }

    setLoading(true);
    try {
      const newRecipe: Omit<Recipe, "createdAt"> = {
        title,
        description,
        ingredients: ingredients
          .split(",")
          .map((i) => i.trim())
          .filter(Boolean),
        steps: steps
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
        isPublished: true,
        createdBy: user?.uid || "",
      };

      await createRecipe(newRecipe);
      Alert.alert("Success ✅", "Recipe created successfully", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (err) {
      console.error("Create recipe error:", err);
      Alert.alert("Error ❌", "Failed to create recipe");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminOnly>
      <ScrollView
        className="flex-1 p-5"
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <Text className="mb-4 text-3xl font-extrabold text-green-600">
          Create New Recipe
        </Text>

        {/* Title */}
        <TextInput
          placeholder="Recipe Title"
          value={title}
          onChangeText={setTitle}
          className="p-4 mb-4 text-lg bg-white border border-gray-300 rounded-2xl"
        />

        {/* Description */}
        <TextInput
          placeholder="Short description"
          value={description}
          onChangeText={setDescription}
          className="p-4 mb-4 text-lg bg-white border border-gray-300 rounded-2xl"
          multiline
        />

        {/* Ingredients */}
        <TextInput
          placeholder="Ingredients (comma separated)"
          value={ingredients}
          onChangeText={setIngredients}
          className="p-4 mb-4 text-lg bg-white border border-gray-300 rounded-2xl"
          multiline
        />

        {/* Steps */}
        <TextInput
          placeholder="Steps (line separated)"
          value={steps}
          onChangeText={setSteps}
          className="p-4 mb-6 text-lg bg-white border border-gray-300 rounded-2xl"
          multiline
        />

        {/* Save Button */}
        <TouchableOpacity
          onPress={handleSave}
          disabled={loading}
          className={`w-full py-4 rounded-2xl ${
            loading ? "bg-gray-400" : "bg-green-600"
          }`}
          style={{
            shadowColor: "#10B981",
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.3,
            shadowRadius: 10,
            elevation: 6,
          }}
        >
          <Text className="text-xl font-bold text-center text-white">
            {loading ? "Saving..." : "Save Recipe"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </AdminOnly>
  );
}
