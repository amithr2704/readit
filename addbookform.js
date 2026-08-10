import React, { useState } from "react";
import { View, TextInput, Pressable, Text, StyleSheet } from "react-native";
import { colors, fonts } from "../theme";

export default function AddBookForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [pages, setPages] = useState("");

  function handleSubmit() {
    if (!title.trim()) return;
    onAdd({ title, author, totalPages: pages });
    setTitle("");
    setAuthor("");
    setPages("");
  }

  return (
    <View style={styles.card}>
      <TextInput
        style={styles.input}
        placeholder="Book title"
        placeholderTextColor={colors.textSoft}
        value={title}
        onChangeText={setTitle}
      />
      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.flex1]}
          placeholder="Author (optional)"
          placeholderTextColor={colors.textSoft}
          value={author}
          onChangeText={setAuthor}
        />
        <TextInput
          style={[styles.input, styles.pagesInput]}
          placeholder="Pages"
          placeholderTextColor={colors.textSoft}
          value={pages}
          onChangeText={setPages}
          keyboardType="number-pad"
        />
      </View>
      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>+ Add to current books</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.bgCard,
    borderWidth: 1,
    borderColor: colors.lineStrong,
    padding: 16,
    gap: 8,
  },
  row: {
    flexDirection: "row",
    gap: 8,
  },
  flex1: { flex: 1 },
  pagesInput: { width: 90 },
  input: {
    fontFamily: fonts.body,
    fontSize: 14,
    paddingVertical: 9,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: colors.lineStrong,
    backgroundColor: colors.bg,
    color: colors.text,
  },
  button: {
    backgroundColor: colors.accent,
    borderWidth: 1,
    borderColor: colors.accent,
    paddingVertical: 11,
    alignItems: "center",
    marginTop: 4,
  },
  buttonText: {
    fontFamily: fonts.mono,
    fontSize: 13,
    color: colors.bgCard,
  },
});