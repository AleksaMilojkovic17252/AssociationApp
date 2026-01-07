import React, { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  TextInput, // Swapped for ripple support
  useColorScheme,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import DataCard from "@/components/DataCard";
import { useAssociationStore } from "@/lib/dataStore";
import { getLevenshteinDistance } from "@/lib/getLevenshteinDistance";
import { DataType } from "@/model/dataType";

// Custom Themed Components
import { ThemedCardView } from "@/components/themed-components/themed-card-view";
import { ThemedSafeAreaView } from "@/components/themed-components/themed-safe-area-view";

export default function ListScreen() {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState<DataType[]>([]);
  const router = useRouter();
  const theme = useColorScheme();
  const isDark = theme === "dark";
  
  const { items, selectItem } = useAssociationStore();

  useEffect(() => {
    if (search.trim() === "") {
      setFilteredData(items);
      return;
    }

    const query = search.toLowerCase();
    const threshold = 3;

    const newData = items.filter((item) => {
      const title = item.title.toLowerCase();
      if (title.includes(query)) return true;

      const words = title.split(" ");
      return words.some((word) => {
        const distance = getLevenshteinDistance(query, word);
        return distance <= threshold;
      });
    });

    newData.sort((a, b) => {
      const distA = getLevenshteinDistance(query, a.title.toLowerCase());
      const distB = getLevenshteinDistance(query, b.title.toLowerCase());
      return distA - distB;
    });

    setFilteredData(newData);
  }, [search, items]);

  return (
    <ThemedSafeAreaView style={styles.container}>
      <ThemedCardView 
        style={
          styles.searchContainer
        }
      >
        <Ionicons
          name="search"
          size={20}
          color={isDark ? "#8E8E93" : "#888"}
          style={styles.searchIcon}
        />
        <TextInput
          style={[styles.searchInput]}
          placeholder="Search museums..."
          placeholderTextColor={isDark ? "#636366" : "#888"}
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <Pressable onPress={() => setSearch("")}>
            <Ionicons name="close-circle" size={18} color={isDark ? "#636366" : "#CCC"} />
          </Pressable>
        )}
      </ThemedCardView>

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <DataCard
            item={item}
            onPress={() => {
              selectItem(item);
              router.navigate("/item");
            }}
          />
        )}
      />

      <Pressable
        style={({ pressed }) => [
          styles.fab,
          pressed && { opacity: 0.8, transform: [{ scale: 0.95 }] }
        ]}
        android_ripple={{ color: "#ffffff44", borderless: true }}
        onPress={() => router.navigate("/create")}
      >
        <Ionicons name="add" size={32} color="white" />
      </Pressable>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 15,
    paddingHorizontal: 12,
    borderRadius: 12,
    height: 50,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  fab: {
    position: "absolute",
    width: 64,
    height: 64,
    alignItems: "center",
    justifyContent: "center",
    right: 20,
    bottom: 50,
    backgroundColor: "#007AFF",
    borderRadius: 30,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});