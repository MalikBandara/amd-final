import { useAuth } from "@/context/authContext";
import { listRecipes } from "@/services/recipeService";
import { Recipe } from "@/types/recipe";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native";

export default function RecipesScreen() {
  const [rows, setRows] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useAuth();

  useEffect(() => {
    (async () => {
      const data = await listRecipes(true);
      setRows(data); setLoading(false);
    })();
  }, []);

  if (loading) return <ActivityIndicator />;

  return (
    <View className="flex-1 p-4">
      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-2xl font-bold">Recipes</Text>
        {isAdmin && (
          <Link href="/(dashboard)/recipes/edit" asChild>
            <TouchableOpacity className="px-3 py-2 bg-green-500 rounded-lg">
              <Text className="font-semibold text-white">New</Text>
            </TouchableOpacity>
          </Link>
        )}
      </View>

      <FlatList
        data={rows}
        keyExtractor={(i) => i.id!}
        renderItem={({ item }) => (
          <Link href={`/(dashboard)/recipes/${item.id}`} asChild>
            <TouchableOpacity className="p-4 mb-2 bg-white border border-gray-200 rounded-xl">
              <Text className="text-lg font-semibold">{item.title}</Text>
              {item.tags?.length ? <Text className="text-gray-600">{item.tags.join(" · ")}</Text> : null}
            </TouchableOpacity>
          </Link>
        )}
      />
    </View>
  );
}
