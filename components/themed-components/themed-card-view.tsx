import { View } from "react-native";

import { useColorScheme } from "@/hooks/use-color-scheme.web";
import { useThemeColor } from "@/hooks/use-theme-color";
import { ThemedViewProps as ThemedCardViewProps } from "./themed-view";

export function ThemedCardView({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedCardViewProps) {
  const theme = useColorScheme() ?? "light";

  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "card"
  );
  const borderColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "cardBorder"
  );
  const borderWidth = theme === "dark" ? 1 : 0;

  return (
    <View
      style={[{ backgroundColor, borderColor, borderWidth }, style]}
      {...otherProps}
    />
  );
}
