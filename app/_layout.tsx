import { useEffect } from "react";

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { useAssociationStore } from "@/lib/dataStore";

export default function RootLayout() {
  const { loadItems } = useAssociationStore();
  useEffect(() => {
    loadItems();
  }, []);
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="item" options={{ headerShown: false }} />
        <Stack.Screen name="create" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="dark" />
    </>
  );
}
