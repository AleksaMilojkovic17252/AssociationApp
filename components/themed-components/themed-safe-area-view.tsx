import { Colors } from "@/constants/theme";
import { useColorScheme } from "react-native";
import {
  SafeAreaView,
  SafeAreaViewProps,
} from "react-native-safe-area-context";

export function ThemedSafeAreaView(props: SafeAreaViewProps) {
  const theme = useColorScheme() ?? "light";
  const { style, ...otherProps } = props;

  const backgroundColor = Colors[theme].background;

  return (
      <SafeAreaView
        style={[{ flex: 1, backgroundColor }, style]}
        {...otherProps}
      />
  );
}
