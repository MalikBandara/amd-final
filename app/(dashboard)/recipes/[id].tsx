import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter, Link } from "expo-router";
import { ActivityIndicator, Alert, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { getRecipe, removeRecipe } from "@/services/recipeService";
import { useAuth } from "@/context/authContext";

export default function RecipeDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const r = await getRecipe(id!);
      setRecipe(r); setLoading(false);
    })();
  }, [id]);

  if (loading) return <ActivityIndicator />;
  if (!recipe) return <Text className="p-4">Not found</Text>;

  const onDelete = () => {
    Alert.alert("Delete", "Are you sure?", [
      { text: "Cancel" },
      { text: "Delete", style: "destructive", onPress: async () => {
        await removeRecipe(id!);
        router.back();
      }}
    ]);
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16, gap: 10 }}>
      <Text className="text-2xl font-extrabold">{recipe.title}</Text>
      {recipe.images?.[0] && (
        <Image source={{ uri: recipe.images[0] }} className="w-full h-56 rounded-xl" />
      )}
      {recipe.description ? <Text className="text-base">{recipe.description}</Text> : null}

      <Text className="mt-3 text-lg font-bold">Ingredients</Text>
      {recipe.ingredients?.map((x: string, i: number) => <Text key={i}>• {x}</Text>)}

      <Text className="mt-3 text-lg font-bold">Steps</Text>
      {recipe.steps?.map((x: string, i: number) => <Text key={i}>{i+1}. {x}</Text>)}

      {isAdmin && (
        <View className="flex-row gap-3 mt-4">
          <Link href={{ pathname: "/(dashboard)/recipes/edit", params: { id } }} asChild>
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
