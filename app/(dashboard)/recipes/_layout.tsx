import { Stack } from "expo-router";

export default function RecipesLayout() {
  return (
    <Stack screenOptions={{ headerShown: true, animation: "slide_from_right" }}>
      <Stack.Screen name="index" options={{ title: "Recipes", headerShown:false }} />
      <Stack.Screen name="[id]" options={{ title: "Recipe", headerShown:false }} />
      <Stack.Screen name="edit" options={{ title: "Edit Recipe", headerShown:false }} />

    </Stack>
  );
}
