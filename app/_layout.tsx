import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useEffect } from "react";

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SystemUI from "expo-system-ui";

import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useAssociationStore } from "@/lib/dataStore";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme ?? "light";

  const { loadItems } = useAssociationStore();

  useEffect(() => {
    loadItems();
  }, []);

  useEffect(() => {
    SystemUI.setBackgroundColorAsync(Colors[theme].background);
  }, [theme]);

  return (
    <ThemeProvider value={theme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="item" />
        <Stack.Screen name="create" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
