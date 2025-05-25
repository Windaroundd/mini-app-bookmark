import type { Bookmark, BookmarkFormData } from "../types/bookmark";
import { create } from "zustand";

import { persist, createJSONStorage } from "zustand/middleware";

interface BookmarkState {
  bookmarks: Bookmark[];
  isLoading: boolean;
  error: string | null;
}

interface BookmarkActions {
  addBookmark: (bookmark: BookmarkFormData) => void;
  deleteBookmark: (id: string) => void;
  clearBookmarks: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export type BookmarkStore = BookmarkState & BookmarkActions;

const initialBookmarks: Bookmark[] = [
  {
    id: "1",
    title: "Next.js Docs",
    url: "https://nextjs.org",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Tailwind CSS",
    url: "https://tailwindcss.com",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Zustand",
    url: "https://github.com/pmndrs/zustand",
    createdAt: new Date().toISOString(),
  },
];

export const useBookmarkStore = create<BookmarkStore>()(
  persist(
    (set): BookmarkStore => ({
      // State
      bookmarks: initialBookmarks,
      isLoading: false,
      error: null,

      // Actions
      addBookmark: (bookmarkData: BookmarkFormData): void => {
        try {
          const newBookmark: Bookmark = {
            ...bookmarkData,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
          };

          set((state: BookmarkState) => ({
            bookmarks: [...state.bookmarks, newBookmark],
            error: null,
          }));
        } catch {
          set({ error: "Failed to add bookmark" });
        }
      },

      deleteBookmark: (id: string): void => {
        try {
          set((state: BookmarkState) => ({
            bookmarks: state.bookmarks.filter(
              (bookmark: Bookmark) => bookmark.id !== id
            ),
            error: null,
          }));
        } catch {
          set({ error: "Failed to delete bookmark" });
        }
      },

      clearBookmarks: (): void => {
        try {
          set({ bookmarks: [], error: null });
        } catch {
          set({ error: "Failed to clear bookmarks" });
        }
      },

      setLoading: (loading: boolean): void => {
        set({ isLoading: loading });
      },

      setError: (error: string | null): void => {
        set({ error });
      },
    }),
    {
      name: "bookmark-storage",
      skipHydration: true,
      storage: createJSONStorage(() => localStorage),
    }
  )
);
