import { listRecipes } from "@/services/recipeService";
import { Recipe } from "@/types/recipe";
import { useIsFocused } from "@react-navigation/native";
import { Link, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { height, width } = Dimensions.get("window");

export default function HomePage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  const params = useLocalSearchParams();

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      (async () => {
        setLoading(true);
        try {
          const data = await listRecipes();
          setRecipes(data);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [isFocused]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await listRecipes();
        setRecipes(data);
      } finally {
        setLoading(false);
      }
    })();
  }, [params.refresh]);

  if (loading) {
    return (
      <View className="items-center justify-center flex-1 bg-slate-900">
        <ActivityIndicator size="large" color="#10B981" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-slate-900">
      {/* ---------- HEADER ---------- */}
      <View className="px-6 py-5 mb-5 border-b border-slate-700 bg-slate-800 ">
        <Text className="text-3xl font-extrabold text-white">🍳 Cook Book</Text>
        <Text className="mt-1 text-sm font-medium text-emerald-400">
          Your Personal Recipes
        </Text>
      </View>

      {/* ---------- MAIN RECIPES LIST ---------- */}
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id!}
        contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
        ListEmptyComponent={
          <Text className="py-6 text-center text-slate-500">
            No recipes yet. Start by adding one!
          </Text>
        }
        renderItem={({ item }) => (
          <Link href={`/recipes/${item.id}`} asChild>
            <TouchableOpacity
              className="p-5 mb-5 border shadow-lg rounded-3xl bg-slate-800 border-slate-700"
              style={{ width: width - 32 }}
            >
              {/* Title */}
              <Text
                className="mb-2 text-xl font-bold text-white"
                numberOfLines={1}
              >
                {item.title}
              </Text>

              {/* Description */}
              {item.description ? (
                <Text className="mb-3 text-sm text-slate-400" numberOfLines={2}>
                  {item.description}
                </Text>
              ) : null}

              {/* Footer */}
              <View className="flex-row items-center justify-between">
                <Text className="text-xs font-medium text-emerald-400">
                  ⭐ Popular Recipe
                </Text>
                <Text className="text-xs text-slate-500">Tap to view →</Text>
              </View>
            </TouchableOpacity>
          </Link>
        )}
      />
    </SafeAreaView>
  );
}
