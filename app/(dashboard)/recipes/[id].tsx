import { useAuth } from "@/context/authContext";
import { getRecipe, removeRecipe } from "@/services/recipeService";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function RecipeDetails() {
  const { id } = useLocalSearchParams<{ id?: string | string[] }>();
  const recipeId = Array.isArray(id) ? id[0] : id;
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (!recipeId) return;
      const r = await getRecipe(recipeId);
      setRecipe(r);
      setLoading(false);
    })();
  }, [recipeId]);

  if (loading) return <ActivityIndicator />;
  if (!recipe) return <Text className="p-4">Not found</Text>;

  const onDelete = () => {
    Alert.alert("Delete", "Are you sure?", [
      { text: "Cancel" },
      { text: "Delete", style: "destructive", onPress: async () => {
        await removeRecipe(recipeId!);
        router.back();
      }}
    ]);
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16, gap: 10 }}>
      <Text className="text-2xl font-extrabold">{recipe.title}</Text>
      {recipe.description ? <Text>{recipe.description}</Text> : null}

      <Text className="mt-3 text-lg font-bold">Ingredients</Text>
      {recipe.ingredients?.map((x: string, i: number) => <Text key={i}>• {x}</Text>)}

      <Text className="mt-3 text-lg font-bold">Steps</Text>
      {recipe.steps?.map((x: string, i: number) => <Text key={i}>{i+1}. {x}</Text>)}

      {isAdmin && (
        <View className="flex-row gap-3 mt-4">
          <Link href={{ pathname: "/recipes/edit", params: { id: String(recipeId) } }} asChild>
            <TouchableOpacity className="px-4 py-3 border rounded-lg">
              <Text>Edit</Text>
            </TouchableOpacity>
          </Link>
          <TouchableOpacity className="px-4 py-3 border rounded-lg" onPress={onDelete}>
            <Text>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}
