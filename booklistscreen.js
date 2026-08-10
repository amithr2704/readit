import React from "react";
import { View, Text, FlatList, StyleSheet, SafeAreaView } from "react-native";
import { colors, fonts } from "../theme";
import { useBooks } from "../context/BooksContext";
import BookRow from "../components/BookRow";
import AddBookForm from "../components/AddBookForm";

export default function BookListScreen({ navigation }) {
  const { books, addBook } = useBooks();

  function handleAdd(payload) {
    const id = addBook(payload);
    navigation.navigate("BookDetail", { id });
  }

  return (
    <SafeAreaView style={styles.safe}>
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.content}
        data={books}
        keyExtractor={(b) => String(b.id)}
        ListHeaderComponent={
          <View>
            <Text style={styles.eyebrow}>Current books</Text>
            <Text style={styles.h1}>What you're reading right now.</Text>
            <Text style={styles.subtitle}>
              Add a book the moment you start it. Tap into it to log pages, run a timed session,
              and watch the time add up.
            </Text>
            <AddBookForm onAdd={handleAdd} />
            <Text style={styles.panelLabel}>On your list</Text>
          </View>
        }
        renderItem={({ item, index }) => (
          <BookRow
            book={item}
            index={index}
            onPress={() => navigation.navigate("BookDetail", { id: item.id })}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No current books yet — add the one on your nightstand.</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  list: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 60,
  },
  eyebrow: {
    fontFamily: fonts.mono,
    fontSize: 12,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: colors.accent,
    marginTop: 20,
    marginBottom: 12,
  },
  h1: {
    fontFamily: fonts.display,
    fontWeight: "700",
    fontSize: 30,
    color: colors.text,
    lineHeight: 34,
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: 15,
    color: colors.textSoft,
    marginTop: 12,
    marginBottom: 24,
    lineHeight: 21,
  },
  panelLabel: {
    fontFamily: fonts.mono,
    fontSize: 11,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    color: colors.textSoft,
    marginTop: 28,
    marginBottom: 6,
  },
  empty: {
    fontFamily: fonts.body,
    fontStyle: "italic",
    color: colors.textSoft,
    paddingVertical: 20,
  },
});