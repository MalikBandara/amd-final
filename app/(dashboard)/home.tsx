import { listRecipes } from "@/services/recipeService";
import { Recipe } from "@/types/recipe";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Home = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await listRecipes();
        console.log("Fetched recipes:", data); // ✅ debug
        setRecipes(data);
      } catch (err) {
        console.error("Error fetching recipes:", err);
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
    <FlatList
      data={recipes}
      keyExtractor={(item, index) => item.id ?? index.toString()} // ✅ safe key
      contentContainerStyle={{ padding: 16 }}
      ListHeaderComponent={
        <Text className="mb-4 text-3xl font-extrabold text-green-600">
          🍳 Featured Recipes
        </Text>
      }
      ListEmptyComponent={
        <Text className="text-gray-500">No recipes yetttt.</Text>
      }
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
  );
};

export default Home;
