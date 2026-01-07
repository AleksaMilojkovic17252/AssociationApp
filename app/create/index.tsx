import React, { useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { ThemedSafeAreaView } from "@/components/themed-components/themed-safe-area-view";
import { ThemedText } from "@/components/themed-components/themed-text";
import { ThemedTextInput } from "@/components/themed-components/themed-text-input";
import { ThemedView } from "@/components/themed-components/themed-view";
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
    <ThemedSafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <ThemedView style={styles.inputGroup}>
            <ThemedText style={styles.label} type="label">
              TITLE
            </ThemedText>
            <ThemedTextInput
              style={styles.input}
              placeholder="e.g., Belvedere Museum"
              value={title}
              onChangeText={setTitle}
              autoFocus={true}
              returnKeyType="next"
              onSubmitEditing={() => descriptionRef.current?.focus()}
            />
          </ThemedView>

          <ThemedView style={styles.inputGroup}>
            <ThemedText style={styles.label} type="label">
              DESCRIPTION
            </ThemedText>
            <ThemedTextInput
              ref={descriptionRef}
              style={[styles.textArea, styles.input]}
              placeholder="e.g., Takes 5 hours to visit..."
              value={description}
              onChangeText={setDescription}
              multiline={true}
              numberOfLines={4}
              textAlignVertical="top"
            />
          </ThemedView>

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
            <ThemedText style={styles.saveButtonText}>Save Item</ThemedText>
          </Pressable>

          <Pressable style={styles.cancelButton} onPress={() => router.back()}>
            <ThemedText style={styles.cancelButtonText}>Cancel</ThemedText>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 12,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    marginBottom: 8,
    opacity: 0.7,
  },
  input: {
    fontSize: 16,
    padding: 16,
    borderRadius: 14,
  },
  textArea: {
    height: 150,
  },
  saveButton: {
    backgroundColor: "#007AFF",
    flexDirection: "row",
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#007AFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  saveButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700",
  },
  cancelButton: {
    marginTop: 20,
    alignItems: "center",
    padding: 10,
  },
  cancelButtonText: {
    color: "#8E8E93",
    fontSize: 16,
    fontWeight: "500",
  },
});
