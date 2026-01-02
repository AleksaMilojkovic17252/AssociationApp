import { Pressable, StyleSheet, Text, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { DataType } from "@/model/dataType";

export default function DataCard(props: {
  item: DataType;
  onPress: () => void;
}) {
  return (
    <View style={styles.itemWrapper}>
      <Pressable
        android_ripple={{ color: "#ffffff44" }}
        style={({ pressed }) => [
          styles.itemContainer,
          pressed && { opacity: 0.7 },
        ]}
        onPress={props.onPress}
      >
        <View>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.itemTitle}>
            {props.item.title}
          </Text>
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={styles.itemDescription}
          >
            {props.item.description}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color="#C7C7CC" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  itemDescription: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  itemWrapper: {
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
});
