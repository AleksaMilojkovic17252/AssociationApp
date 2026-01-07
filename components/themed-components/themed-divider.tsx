import { View } from "react-native";

import { useThemeColor } from "@/hooks/use-theme-color";
import { ThemedViewProps as ThemedDividerProps } from "./themed-view";

export function ThemedDivider({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedDividerProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "divider"
  );

  return (
    <View style={[{ backgroundColor, height: 1 }, style]} {...otherProps} />
  );
}
