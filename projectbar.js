import React from "react";
import { View, StyleSheet } from "react-native";
import { colors } from "../theme";

export default function ProgressBar({ pct = 0 }) {
  const clamped = Math.max(0, Math.min(100, pct));
  return (
    <View style={styles.track}>
      <View style={[styles.fill, { width: `${clamped}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 6,
    backgroundColor: colors.accentTint,
    borderWidth: 1,
    borderColor: colors.lineStrong,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    backgroundColor: colors.accent,
  },
});