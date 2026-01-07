import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useEffect } from "react";

import { Stack } from "expo-router";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { useAssociationStore } from "@/lib/dataStore";


export default function RootLayout() {
  const { loadItems } = useAssociationStore();
  const colorScheme = useColorScheme();

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="item" options={{ headerShown: false }} />
        <Stack.Screen name="create" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
