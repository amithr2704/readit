import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { loadBooks, saveBooks } from "../utils/storage";
import { sampleBooks } from "../data/sampleBooks";
import { formatWhen } from "../utils/time";

const BooksContext = createContext(null);

export function BooksProvider({ children }) {
  const [books, setBooks] = useState([]);
  const [ready, setReady] = useState(false);
  const nextId = useRef(1);
  const hasLoaded = useRef(false);

  // Load once on app start
  useEffect(() => {
    (async () => {
      const stored = await loadBooks();
      const initial = stored && stored.length ? stored : sampleBooks;
      setBooks(initial);
      nextId.current = initial.reduce((max, b) => Math.max(max, b.id), 0) + 1;
      hasLoaded.current = true;
      setReady(true);
    })();
  }, []);

  // Persist on every change (skip the very first render before load finishes)
  useEffect(() => {
    if (!hasLoaded.current) return;
    saveBooks(books);
  }, [books]);

  function addBook({ title, author, totalPages }) {
    const book = {
      id: nextId.current++,
      title: title.trim(),
      author: author?.trim() || "",
      totalPages: totalPages ? Number(totalPages) : null,
      pagesRead: 0,
      totalMinutes: 0,
      sessions: [],
    };
    setBooks((prev) => [...prev, book]);
    return book.id;
  }

  function updatePages(id, pages) {
    setBooks((prev) =>
      prev.map((b) => {
        if (b.id !== id) return b;
        let val = Number(pages);
        if (Number.isNaN(val) || val < 0) val = 0;
        if (b.totalPages) val = Math.min(val, b.totalPages);
        return { ...b, pagesRead: val };
      })
    );
  }

  function logSession(id, minutes) {
    const safeMinutes = Math.max(1, Math.round(minutes));
    setBooks((prev) =>
      prev.map((b) => {
        if (b.id !== id) return b;
        return {
          ...b,
          totalMinutes: b.totalMinutes + safeMinutes,
          sessions: [...b.sessions, { duration: safeMinutes, when: formatWhen(new Date()) }],
        };
      })
    );
  }

  function getBook(id) {
    return books.find((b) => b.id === id);
  }

  return (
    <BooksContext.Provider value={{ books, ready, addBook, updatePages, logSession, getBook }}>
      {children}
    </BooksContext.Provider>
  );
}

export function useBooks() {
  const ctx = useContext(BooksContext);
  if (!ctx) throw new Error("useBooks must be used inside a BooksProvider");
  return ctx;
}