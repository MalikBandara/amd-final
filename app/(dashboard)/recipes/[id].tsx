import { useAuth } from "@/context/authContext";
import { getRecipe, removeRecipe } from "@/services/recipeService";
import { useFocusEffect } from "@react-navigation/native";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function RecipeDetails() {
  const { id } = useLocalSearchParams<{ id?: string | string[] }>();
  const recipeId = Array.isArray(id) ? id[0] : id;
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useAuth();
  const router = useRouter();

  

   useFocusEffect(
    useCallback(() => {
      let active = true;
      const load = async () => {
        if (!recipeId) return;
        setLoading(true);
        try {
          const r = await getRecipe(recipeId);
          if (active) setRecipe(r);
        } finally {
          if (active) setLoading(false);
        }
      };
      load();

      return () => {
        active = false;
      };
    }, [recipeId])
  );

  if (loading)
    return (
      <View className="flex-1 items-center justify-center bg-[#0A0F1C]">
        <ActivityIndicator size="large" color="#10B981" />
      </View>
    );

  if (!recipe)
    return (
      <View className="flex-1 items-center justify-center bg-[#0A0F1C] p-6">
        <Text className="text-lg text-gray-300">❌ Recipe not found</Text>
      </View>
    );

  const onDelete = () => {
    Alert.alert("Delete", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await removeRecipe(recipeId!);
          Alert.alert("✅ Success", "Recipe deleted successfully");
          router.back();
          router.replace("/home?refresh=1");
          
        },
      },
    ]);
  };

  return (
    <View className="flex-1 bg-[#0A0F1C]">

      <View className="flex-row items-center p-4 mt-12">
        <TouchableOpacity
          onPress={() => router.push("/home")}
          className="flex-row items-center"
        >
          <ArrowLeft size={24} color="white" />
          <Text className="ml-2 text-base text-white">Back</Text>
        </TouchableOpacity>
      </View>
      {/* ---------- HEADER WITH BACK BUTTON ---------- */}
      <View className="flex-row items-center p-4">
        <TouchableOpacity onPress={() => router.back()} className="p-2 mr-4">
          
        </TouchableOpacity>
        
      </View>

      {/* ---------- CONTENT ---------- */}
      <ScrollView
        contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <Text className="mb-2 text-2xl font-extrabold text-green-400">
          {recipe.title}
        </Text>

        {/* Description */}
        {recipe.description ? (
          <Text className="mb-4 text-gray-300">{recipe.description}</Text>
        ) : null}

        {/* Ingredients */}
        <Text className="mt-3 text-lg font-bold text-white">🥦 Ingredients</Text>
        {recipe.ingredients?.map((x: string, i: number) => (
          <Text key={i} className="mt-1 text-gray-300">
            • {x}
          </Text>
        ))}

        {/* Steps */}
        <Text className="mt-5 text-lg font-bold text-white">👩‍🍳 Steps</Text>
        {recipe.steps?.map((x: string, i: number) => (
          <Text key={i} className="mt-1 text-gray-300">
            {i + 1}. {x}
          </Text>
        ))}

        {/* Admin Controls */}
        {isAdmin && (
          <View className="flex-row gap-3 mt-8">
            <Link
              href={{ pathname: "/recipes/edit", params: { id: String(recipeId) } }}
              asChild
            >
              <TouchableOpacity className="flex-1 px-4 py-3 bg-yellow-500 rounded-xl">
                <Text className="font-bold text-center text-white">✏️ Edit</Text>
              </TouchableOpacity>
            </Link>
            <TouchableOpacity
              className="flex-1 px-4 py-3 bg-red-600 rounded-xl"
              onPress={onDelete}
            >
              <Text className="font-bold text-center text-white">🗑️ Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
