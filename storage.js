import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "marginalia_books_v1";

export async function loadBooks() {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    console.warn("Marginalia: failed to load books", err);
    return null;
  }
}

export async function saveBooks(books) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  } catch (err) {
    console.warn("Marginalia: failed to save books", err);
  }
}