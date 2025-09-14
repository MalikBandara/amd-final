import { AdminOnly } from "@/components/AdminOnly";
import { useAuth } from "@/context/authContext";
import { createRecipe, getRecipe, updateRecipe } from "@/services/recipeService";
import { Recipe } from "@/types/recipe";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, Text, TextInput, TouchableOpacity } from "react-native";

export default function EditRecipe() {
  const { id } = useLocalSearchParams<{ id?: string | string[] }>();
  const recipeId = Array.isArray(id) ? id[0] : id;
  const isNew = !recipeId;
  const router = useRouter();
  const { user } = useAuth();

  const [model, setModel] = useState<Recipe>({
    title: "", description: "", ingredients: [], steps: [],
    isPublished: true,
  });

  useEffect(() => {
    (async () => {
      if (!isNew && recipeId) {
        const r = await getRecipe(recipeId);
        if (r) setModel(r);
      }
    })();
  }, [recipeId]);

  const setField = (k: keyof Recipe, v: any) => setModel(m => ({ ...m, [k]: v }));

  const save = async () => {
    if (!model.title.trim()) { Alert.alert("Title required"); return; }
    try {
      if (isNew) {
        await createRecipe({ ...model, createdBy: user?.uid || "" });
      } else {
        await updateRecipe(recipeId!, model);
      }
      router.back();
    } catch (e) {
      console.log("save error:", e);
      Alert.alert("Error", "Failed to save recipe");
    }
  };

  return (
    <AdminOnly>
      <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
        <Text className="text-xl font-bold">{isNew ? "New Recipe" : "Edit Recipe"}</Text>

        <TextInput
          placeholder="Title"
          value={model.title}
          onChangeText={(t)=>setField("title", t)}
          className="p-3 border rounded-lg"
        />

        <TextInput
          placeholder="Description"
          value={model.description}
          onChangeText={(t)=>setField("description", t)}
          className="p-3 border rounded-lg min-h-[90px]"
          multiline
        />

        <TextInput
          placeholder="Ingredients (comma separated)"
          onChangeText={(t)=>setField("ingredients", t.split(",").map(s=>s.trim()).filter(Boolean))}
          className="p-3 border rounded-lg"
        />

        <TextInput
          placeholder="Steps (line separated)"
          onChangeText={(t)=>setField("steps", t.split("\n").map(s=>s.trim()).filter(Boolean))}
          className="p-3 border rounded-lg min-h-[120px]"
          multiline
        />

        <TouchableOpacity onPress={save} className="px-4 py-3 rounded-lg" style={{ backgroundColor: "#10B981" }}>
          <Text className="font-semibold text-center text-white">{isNew ? "Create" : "Save changes"}</Text>
        </TouchableOpacity>
      </ScrollView>
    </AdminOnly>
  );
}
