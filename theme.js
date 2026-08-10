import { Platform } from "react-native";

export const colors = {
  bg: "#F6F1E7",
  bgCard: "#FBF8F1",
  text: "#2A2622",
  textSoft: "#726A5F",
  accent: "#6E2A34",
  accentTint: "#EFDCD2",
  line: "#D9CFBC",
  lineStrong: "#B7AA8E",
  good: "#3F5C43",
};

// System serif / mono stand-ins for Fraunces / Source Serif 4 / IBM Plex Mono.
// Swap these for @expo-google-fonts packages later if you want an exact match
// to the web version — see README for how to wire that up.
export const fonts = {
  display: Platform.select({ ios: "Georgia", android: "serif", default: "serif" }),
  body: Platform.select({ ios: "Georgia", android: "serif", default: "serif" }),
  mono: Platform.select({ ios: "Menlo", android: "monospace", default: "monospace" }),
};

export const swatches = ["#6E2A34", "#39463C", "#4A4033", "#5B4B6E", "#3B4A5A"];