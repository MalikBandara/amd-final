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

export default function HomePage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-[#0A0F1C]">
        <ActivityIndicator size="large" color="#10B981" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#0A0F1C]">
      {/* ---------- HEADER ---------- */}
      <View className="p-6">
        <Text className="text-4xl font-extrabold text-white">
          🍳 Cook Book
        </Text>
        <Text className="mt-2 text-gray-400">
          Master culinary arts with chef-curated recipes
        </Text>
      </View>

      {/* ---------- RECIPES LIST ---------- */}
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id!}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40 }}
        ListEmptyComponent={
          <Text className="mt-10 text-center text-gray-500">
            No recipes yet.
          </Text>
        }
        renderItem={({ item }) => (
          <Link href={`/recipes/${item.id}`} asChild>
            <TouchableOpacity
              className="mb-4 rounded-2xl bg-[#1C2232] p-5 shadow-lg"
              style={{
                shadowColor: "#10B981",
                shadowOpacity: 0.15,
                shadowOffset: { width: 0, height: 6 },
                shadowRadius: 8,
                elevation: 4,
              }}
            >
              <Text className="text-xl font-bold text-white">
                {item.title}
              </Text>
              {item.description ? (
                <Text className="mt-2 text-gray-400">
                  {item.description}
                </Text>
              ) : null}
              <View className="flex-row items-center mt-3">
                <Text className="text-sm text-green-400">
                  ⭐ Popular Recipe
                </Text>
              </View>
            </TouchableOpacity>
          </Link>
        )}
      />
    </View>
  );
}
