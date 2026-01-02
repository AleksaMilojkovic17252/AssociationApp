import { Stack } from "expo-router";

export default function DetailsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Details",
          headerShadowVisible: false,
          headerBackTitle: "Back",
        }}
      />
    </Stack>
  );
}
