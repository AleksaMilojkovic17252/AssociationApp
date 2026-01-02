import React, { useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { useAssociationStore } from "@/lib/dataStore";

export default function CreateItemScreen() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const store = useAssociationStore();
  const router = useRouter();

  const descriptionRef = useRef<TextInput>(null);

  const handleSave = () => {
    if (!title.trim()) {
      alert("Please enter a title");
      return;
    }
    try {
      store.addItem({ title, description });
      router.back();
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>TITLE</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Belvedere Museum"
              value={title}
              onChangeText={setTitle}
              autoFocus={true}
              returnKeyType="next"
              onSubmitEditing={() => descriptionRef.current!.focus()}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>DESCRIPTION</Text>
            <TextInput
              ref={descriptionRef}
              style={[styles.input, styles.textArea]}
              placeholder="e.g., Takes 5 hours to visit..."
              value={description}
              onChangeText={setDescription}
              multiline={true}
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.saveButton,
              pressed && { opacity: 0.8, transform: [{ scale: 0.98 }] },
            ]}
            onPress={handleSave}
            android_ripple={{ color: "#ffffff44" }}
          >
            <Ionicons
              name="checkmark-circle"
              size={20}
              color="white"
              style={{ marginRight: 8 }}
            />
            <Text style={styles.saveButtonText}>Save Item</Text>
          </Pressable>

          <Pressable style={styles.cancelButton} onPress={() => router.back()}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  scrollContent: {
    padding: 24,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 12,
    fontWeight: "700",
    color: "#8E8E93",
    letterSpacing: 1,
    marginBottom: 8,
  },
  input: {
    fontSize: 16,
    backgroundColor: "#F2F2F7",
    padding: 16,
    borderRadius: 12,
    color: "#000",
  },
  textArea: {
    height: 120,
    paddingTop: 16, // Better alignment for multiline
  },
  saveButton: {
    backgroundColor: "#007AFF",
    flexDirection: "row",
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    elevation: 4,
    shadowColor: "#007AFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  saveButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
  },
  cancelButton: {
    marginTop: 16,
    alignItems: "center",
    padding: 10,
  },
  cancelButtonText: {
    color: "#8E8E93",
    fontSize: 16,
  },
});
