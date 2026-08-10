import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { colors, fonts, swatches } from "../theme";
import { fmtTime } from "../utils/time";

export default function BookRow({ book, index, onPress }) {
  const pct = book.totalPages ? Math.round((book.pagesRead / book.totalPages) * 100) : 0;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
    >
      <View style={[styles.swatch, { backgroundColor: swatches[index % swatches.length] }]} />
      <View style={styles.meta}>
        <Text style={styles.title} numberOfLines={1}>{book.title}</Text>
        <Text style={styles.author} numberOfLines={1}>{book.author || "Unknown author"}</Text>
      </View>
      <View style={styles.statCol}>
        <Text style={styles.statText}>{pct}%</Text>
        <Text style={styles.statText}>{fmtTime(book.totalMinutes)}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 16,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  rowPressed: {
    backgroundColor: colors.accentTint,
  },
  swatch: {
    width: 10,
    height: 34,
    flexShrink: 0,
  },
  meta: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    fontFamily: fonts.display,
    fontWeight: "700",
    fontSize: 16.5,
    color: colors.text,
  },
  author: {
    fontFamily: fonts.body,
    fontStyle: "italic",
    fontSize: 13,
    color: colors.textSoft,
    marginTop: 2,
  },
  statCol: {
    alignItems: "flex-end",
  },
  statText: {
    fontFamily: fonts.mono,
    fontSize: 12,
    color: colors.textSoft,
  },
});