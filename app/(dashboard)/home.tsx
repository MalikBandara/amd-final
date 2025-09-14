import { listRecipes } from "@/services/recipeService";
import { Recipe } from "@/types/recipe";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native";

const Home = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await listRecipes();
        console.log("Fetched recipes:", data);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <View className="items-center justify-center flex-1">
        <ActivityIndicator size="large" color="#10B981" />
      </View>
    );
  }

  return (
    <View className="flex-1 p-4">
      <Text className="mb-4 text-3xl font-extrabold text-green-600">
        🍳 Featured Recipes
      </Text>

      {recipes.length === 0 ? (
        <Text className="text-gray-500">No recipes yet.</Text>
      ) : (
        <FlatList
          data={recipes}
          keyExtractor={(item) => item.id!}
          renderItem={({ item }) => (
            <Link href={`/recipes/${item.id}`} asChild>
              <TouchableOpacity className="p-4 mb-3 bg-white border border-gray-200 shadow rounded-2xl">
                <Text className="text-xl font-bold">{item.title}</Text>
                {item.description ? (
                  <Text className="mt-1 text-gray-600">{item.description}</Text>
                ) : null}
              </TouchableOpacity>
            </Link>
          )}
        />
      )}
    </View>
  );
};
 

export default Home;
