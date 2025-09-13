import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { AdminOnly } from "@/components/AdminOnly";
import { createRecipe, getRecipe, updateRecipe, uploadRecipeImage } from "@/services/recipeService";
import { Recipe } from "@/types/recipe";
import { useAuth } from "@/context/authContext";

export default function EditRecipe() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const isNew = !id;
  const router = useRouter();
  const { user } = useAuth();

  const [model, setModel] = useState<Recipe>({
    title: "", description: "", ingredients: [], steps: [], images: [],
    isPublished: true, tags: [], prepTimeMin: 0, cookTimeMin: 0, serves: 1,
  });

  useEffect(() => {
    (async () => {
      if (!isNew && id) {
        const r = await getRecipe(id);
        if (r) setModel(r);
      }
    })();
  }, [id]);

  const setField = (k: keyof Recipe, v: any) => setModel(m => ({ ...m, [k]: v }));

  const pickImage = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, quality: 0.8
    });
    if (!res.canceled) {
      const url = await uploadRecipeImage(res.assets[0].uri);
      setField("images", [...(model.images || []), url]);
    }
  };

  const save = async () => {
    if (!model.title.trim()) { Alert.alert("Title required"); return; }
    try {
      if (isNew) {
        await createRecipe({ ...model, createdBy: user?.uid || "" });
      } else {
        await updateRecipe(id!, model);
      }
      router.back();
    } catch (e) {
      console.log("Save error", e);
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

        <TouchableOpacity onPress={pickImage} className="px-4 py-3 border rounded-lg">
          <Text>Upload Image</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={save} className="px-4 py-3 rounded-lg" style={{ backgroundColor: "#10B981" }}>
          <Text className="font-semibold text-center text-white">{isNew ? "Create" : "Save changes"}</Text>
        </TouchableOpacity>
      </ScrollView>
    </AdminOnly>
  );
}
