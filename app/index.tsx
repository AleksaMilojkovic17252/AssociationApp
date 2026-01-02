import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import DataCard from "@/components/DataCard";

import { DataType } from "@/model/dataType";

import { useAssociationStore } from "@/lib/dataStore";
import { getLevenshteinDistance } from "@/lib/getLevenshteinDistance";



export default function ListScreen() {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState<DataType[]>([]);
  const router = useRouter();
  const { items, selectItem } = useAssociationStore();

  useEffect(() => {
    setFilteredData(items);
  }, [items]);

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
      const isFuzzyMatch = words.some((word) => {
        const distance = getLevenshteinDistance(query, word);
        return distance <= threshold;
      });

      return isFuzzyMatch;
    });

    newData.sort((a, b) => {
      const distA = getLevenshteinDistance(query, a.title.toLowerCase());
      const distB = getLevenshteinDistance(query, b.title.toLowerCase());
      return distA - distB;
    });

    setFilteredData(newData);
  }, [search, items]);

  const handleSearch = (text: string) => {
    setSearch(text);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#888"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search items..."
          value={search}
          onChangeText={(text) => handleSearch(text)}
        />
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.title}
        renderItem={(item) => (
          <DataCard
            item={item.item}
            onPress={() => {
              selectItem(item.item);
              router.navigate("/item");
            }}
          />
        )}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.navigate("/create")}
      >
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    margin: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
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
    height: 45,
    flex: 1,
  },
  fab: {
    position: "absolute",
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    right: 20,
    bottom: 40,
    backgroundColor: "#007AFF",
    borderRadius: 30,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
