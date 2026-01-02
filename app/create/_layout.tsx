import { Stack } from "expo-router";

export default function CreateLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Create New Item",
          headerShadowVisible: false,
          headerBackTitle: "Back",
        }}
      />
    </Stack>
  );
}
