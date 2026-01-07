import {
  TextInput,
  TextInputProps,
  useColorScheme
} from "react-native";

import { useThemeColor } from "@/hooks/use-theme-color";
import { forwardRef } from "react";

export type ThemedTextInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
};

export const ThemedTextInput = forwardRef<TextInput, ThemedTextInputProps>(
  ({ style, lightColor, darkColor, ...otherProps }, ref) => {
    const theme = useColorScheme() ?? "light";
    const isDark = theme === "dark";

    const backgroundColor = useThemeColor(
      { light: lightColor, dark: darkColor },
      "textInputBackground"
    );
    const color = useThemeColor(
      { light: lightColor, dark: darkColor },
      "textInputColor"
    );
    const borderColor = useThemeColor(
      { light: lightColor, dark: darkColor },
      "textInputBorderColor"
    );

    const borderWidth = isDark ? 1 : 0;

    const inputStyle = [
      { backgroundColor, color, borderColor, borderWidth },
      style,
    ];

    return (
      <TextInput
        style={inputStyle}
        placeholder="e.g., Belvedere Museum"
        placeholderTextColor={isDark ? "#636366" : "#8E8E93"}
        {...otherProps}
      />
    );
  }
);
