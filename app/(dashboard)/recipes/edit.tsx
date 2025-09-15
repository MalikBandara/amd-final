import { AdminOnly } from "@/components/AdminOnly";
import { useAuth } from "@/context/authContext";
import { getRecipe, updateRecipe } from "@/services/recipeService";
import { Recipe } from "@/types/recipe";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function EditRecipe() {
  const { id } = useLocalSearchParams<{ id?: string | string[] }>();
  const recipeId = Array.isArray(id) ? id[0] : id;
  const router = useRouter();
  const { user } = useAuth();

  const [model, setModel] = useState<Recipe>({
    title: "",
    description: "",
    ingredients: [],
    steps: [],
    isPublished: true,
  });

  useEffect(() => {
    (async () => {
      if (recipeId) {
        const r = await getRecipe(recipeId);
        if (r) setModel(r);
      }
    })();
  }, [recipeId]);

  const setField = (k: keyof Recipe, v: any) =>
    setModel((m) => ({ ...m, [k]: v }));

  const save = async () => {
    if (!model.title.trim()) {
      Alert.alert("Title required");
      return;
    }
    try {
      await updateRecipe(recipeId!, model);
      Alert.alert("✅ Success", "Recipe updated");
      router.back();
    } catch (e) {
      console.log("save error:", e);
      Alert.alert("Error", "Failed to save recipe");
    }
  };

  return (
    <AdminOnly>
      <View className="flex-1 bg-[#0A0F1C]">
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            padding: 24,
          }}
        >
          <View className="bg-[#1C2232] rounded-2xl p-6 shadow-lg">
            <Text className="mb-6 text-2xl font-extrabold text-center text-green-400">
              ✏️ Edit Recipe
            </Text>

            <TextInput
              placeholder="Title"
              placeholderTextColor="#9CA3AF"
              value={model.title}
              onChangeText={(t) => setField("title", t)}
              className="p-4 mb-4 text-white bg-[#2A3042] rounded-xl"
            />

            <TextInput
              placeholder="Description"
              placeholderTextColor="#9CA3AF"
              value={model.description}
              onChangeText={(t) => setField("description", t)}
              className="p-4 mb-4 text-white bg-[#2A3042] rounded-xl min-h-[100px]"
              multiline
            />

            <TextInput
              placeholder="Ingredients (comma separated)"
              placeholderTextColor="#9CA3AF"
              value={model.ingredients?.join(", ")}
              onChangeText={(t) =>
                setField(
                  "ingredients",
                  t.split(",").map((s) => s.trim()).filter(Boolean)
                )
              }
              className="p-4 mb-4 text-white bg-[#2A3042] rounded-xl"
            />

            <TextInput
              placeholder="Steps (line separated)"
              placeholderTextColor="#9CA3AF"
              value={model.steps?.join("\n")}
              onChangeText={(t) =>
                setField(
                  "steps",
                  t.split("\n").map((s) => s.trim()).filter(Boolean)
                )
              }
              className="p-4 mb-6 text-white bg-[#2A3042] rounded-xl min-h-[140px]"
              multiline
            />

            <TouchableOpacity
              onPress={save}
              className="w-full py-4 bg-green-500 rounded-xl"
            >
              <Text className="text-lg font-bold text-center text-white">
                💾 Save Changes
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </AdminOnly>
  );
}
