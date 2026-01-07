/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    card: "#F2F2F7",
    cardBorder: "transparent",
    divider: "#E5E5EA",
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    textInputBackground: "#F2F2F7",
    textInputColor: "#000000",
    textInputBorderColor: "transparent",
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    card: "#1C1C1E",
    cardBorder: "#38383A",
    divider: "#38383A",
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    textInputBackground: "#1C1C1E",
    textInputColor: "#FFFFFF",
    textInputBorderColor: "#38383A",
  },
};