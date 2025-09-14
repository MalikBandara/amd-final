import { useAuth } from "@/context/authContext";
import { createRecipe, listRecipes, removeRecipe } from "@/services/recipeService";
import { Recipe } from "@/types/recipe";
import { Link, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function RecipesPage() {
  const { user, isAdmin } = useAuth();
  const router = useRouter();

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [saving, setSaving] = useState(false);

  // Load recipes
  useEffect(() => {
    (async () => {
      try {
        const data = await listRecipes();
        setRecipes(data);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Create recipe (only for admin)
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
      Alert.alert("Success ✅", "Recipe created successfully");
      setTitle("");
      setDescription("");
      setIngredients("");
      setSteps("");
      const data = await listRecipes();
      setRecipes(data);
    } catch (err) {
      console.error("Create recipe error:", err);
      Alert.alert("Error ❌", "Failed to create recipe");
    } finally {
      setSaving(false);
    }
  };

  // Delete recipe (only for admin)
  const handleDelete = async (id: string) => {
    Alert.alert("Confirm Delete", "Are you sure you want to delete this recipe?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await removeRecipe(id);
            setRecipes((prev) => prev.filter((r) => r.id !== id));
          } catch (err) {
            console.error("Delete error:", err);
            Alert.alert("Error ❌", "Failed to delete recipe");
          }
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View className="items-center justify-center flex-1">
        <ActivityIndicator size="large" color="#10B981" />
      </View>
    );
  }

  return (
    <FlatList
      data={recipes}
      keyExtractor={(item) => item.id!}
      contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
      ListHeaderComponent={
        <Text className="mb-4 text-3xl font-extrabold text-green-600">
          Recipes
        </Text>
      }
      renderItem={({ item }) => (
        <Link href={`/recipes/${item.id}`} asChild>
          <TouchableOpacity className="p-4 mb-3 bg-white border border-gray-200 shadow rounded-2xl">
            <Text className="text-xl font-bold">{item.title}</Text>
            {item.description ? (
              <Text className="mt-1 text-gray-600">{item.description}</Text>
            ) : null}

            {/* Admin-only controls */}
            {isAdmin && (
              <View className="flex-row mt-2">
                <TouchableOpacity
                  className="px-3 py-2 mr-2 bg-yellow-500 rounded-lg"
                  onPress={() => router.push(`/recipes/edit/${item.id}`)}
                >
                  <Text className="font-bold text-white">Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="px-3 py-2 bg-red-500 rounded-lg"
                  onPress={() => handleDelete(item.id!)}
                >
                  <Text className="font-bold text-white">Delete</Text>
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>
        </Link>
      )}
      ListEmptyComponent={<Text className="mb-6 text-gray-500">No recipes yet.</Text>}
      ListFooterComponent={
        isAdmin ? (
          <View className="mt-8">
            <Text className="mb-4 text-2xl font-bold text-green-700">
              Create New Recipe
            </Text>
            <TextInput
              placeholder="Recipe Title"
              value={title}
              onChangeText={setTitle}
              className="p-4 mb-4 text-lg bg-white border border-gray-300 rounded-2xl"
            />
            <TextInput
              placeholder="Short description"
              value={description}
              onChangeText={setDescription}
              className="p-4 mb-4 text-lg bg-white border border-gray-300 rounded-2xl"
              multiline
            />
            <TextInput
              placeholder="Ingredients (comma separated)"
              value={ingredients}
              onChangeText={setIngredients}
              className="p-4 mb-4 text-lg bg-white border border-gray-300 rounded-2xl"
              multiline
            />
            <TextInput
              placeholder="Steps (line separated)"
              value={steps}
              onChangeText={setSteps}
              className="p-4 mb-6 text-lg bg-white border border-gray-300 rounded-2xl"
              multiline
            />
            <TouchableOpacity
              onPress={handleSave}
              disabled={saving}
              className={`w-full py-4 rounded-2xl ${
                saving ? "bg-gray-400" : "bg-green-600"
              }`}
            >
              <Text className="text-xl font-bold text-center text-white">
                {saving ? "Saving..." : "Save Recipe"}
              </Text>
            </TouchableOpacity>
          </View>
        ) : null
      }
    />
  );
}
