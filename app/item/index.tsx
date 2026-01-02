import { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { useAssociationStore } from "@/lib/dataStore";

import { DataType } from "@/model/dataType";

export default function DetailsScreen() {
  const router = useRouter();
  const { selectedItem, removeItem } = useAssociationStore();
  const [data, setData] = useState<DataType>({
    title: "Title",
    description: "Description",
  });
  useEffect(() => {
    if (selectedItem) setData(selectedItem);
  }, [selectedItem]);

  const confirmDelete = () => {
    Alert.alert(
      "Delete Item",
      "Are you sure you want to remove this museum from your list?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await removeItem(data);
            router.back();
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.label}>TITLE</Text>
          <Text style={styles.title}>{data.title}</Text>

          <View style={styles.divider} />

          <Text style={styles.label}>DESCRIPTION</Text>
          <Text style={styles.description}>{data.description}</Text>
        </View>
      </ScrollView>
      <Pressable
        style={({ pressed }) => [
          styles.footerDelete,
          pressed && { opacity: 0.7 },
        ]}
        onPress={confirmDelete}
      >
        <Ionicons name="trash" size={18} color="#FF3B30" />
        <Text style={styles.footerDeleteText}>Remove from list</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F2F2F7" },
  content: { padding: 20 },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  label: {
    fontSize: 11,
    fontWeight: "700",
    color: "#8E8E93",
    letterSpacing: 1,
    marginBottom: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1C1C1E",
    marginBottom: 16,
  },
  divider: { height: 1, backgroundColor: "#E5E5EA", marginVertical: 16 },
  description: { fontSize: 16, lineHeight: 24, color: "#3A3A3C" },
  footerDelete: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FF3B30",
    marginHorizontal: 30,
    gap: 8,
  },
  footerDeleteText: { color: "#FF3B30", fontWeight: "600", fontSize: 16 },
});
