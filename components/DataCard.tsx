import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, useColorScheme, View } from "react-native";

import { ThemedText } from "@/components/themed-components/themed-text";
import { DataType } from "@/model/dataType";
import { ThemedCardView } from "./themed-components/themed-card-view";

export default function DataCard(props: {
  item: DataType;
  onPress: () => void;
}) {
  const colorScheme = useColorScheme();
  const theme = colorScheme ?? "light";
  const isDark = theme == "dark";

  return (
    <ThemedCardView style={styles.itemWrapper}>
      <Pressable
        android_ripple={{ color: "#ffffff44" }}
        style={({ pressed }) => [
          styles.itemContainer,
          pressed && { opacity: 0.7 },
        ]}
        onPress={props.onPress}
      >
        <View style={styles.textContainer}>
          <ThemedText
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.itemTitle}
          >
            {props.item.title}
          </ThemedText>
          <ThemedText
            numberOfLines={2}
            ellipsizeMode="tail"
            style={[styles.itemDescription, { opacity: 0.6 }]}
          >
            {props.item.description}
          </ThemedText>
        </View>
        <Ionicons name="chevron-forward" size={18} color={isDark ? "#C7C7CC" : "#000000"} />
      </Pressable>
    </ThemedCardView>
  );
}

const styles = StyleSheet.create({
  itemWrapper: {
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 14,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  textContainer: {
    flex: 1,
    marginRight: 12,
  },
  itemTitle: {
    fontSize: 17,
    fontWeight: "700",
  },
  itemDescription: {
    fontSize: 14,
    marginTop: 4,
  },
});
