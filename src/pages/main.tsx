"use client";

import { useEffect, useState } from "react";
import { RotateCcw } from "lucide-react";
import { Button } from "../components/ui/button";
import { useToggle } from "../hooks/useToggle";
import { useBookmarkStore } from "../store/boomark-store";
import { BookmarkItem } from "../components/BookmarkItem";
import { AddBookmarkModal } from "../components/AddBookmarkModal";
import type { BookmarkFormData } from "../types/bookmark";
import type { JSX } from "react/jsx-runtime"; // Declare JSX variable

export default function BookmarkManager(): JSX.Element {
  const {
    bookmarks,
    addBookmark,
    deleteBookmark,
    clearBookmarks,
    isLoading,
    error,
  } = useBookmarkStore();

  const [isModalOpen, toggleModal] = useToggle(false);
  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  // Handle hydration
  useEffect((): void => {
    useBookmarkStore.persist.rehydrate();
    setIsHydrated(true);
  }, []);

  const handleAddBookmark = (bookmarkData: BookmarkFormData): void => {
    addBookmark(bookmarkData);
  };

  const handleDeleteBookmark = (id: string): void => {
    deleteBookmark(id);
  };

  const handleOpenUrl = (url: string): void => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleClearBookmarks = (): void => {
    if (window.confirm("Are you sure you want to clear all bookmarks?")) {
      clearBookmarks();
    }
  };

  if (!isHydrated) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-8"></div>
          <div className="space-y-3">
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">📚 My Bookmarks</h1>
          <p className="text-sm text-gray-500 mt-1">
            Powered by Zustand + TypeScript ({bookmarks.length} bookmarks)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearBookmarks}
            className="text-red-600"
            disabled={bookmarks.length === 0}
            aria-label="Clear all bookmarks"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>

          <AddBookmarkModal
            isOpen={isModalOpen}
            onOpenChange={toggleModal}
            onSubmit={handleAddBookmark}
          />
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-700">
          Loading...
        </div>
      )}

      {/* Bookmark List */}
      <div className="space-y-3">
        {bookmarks.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p>No bookmarks yet. Add your first one! 🚀</p>
          </div>
        ) : (
          bookmarks.map((bookmark) => (
            <BookmarkItem
              key={bookmark.id}
              bookmark={bookmark}
              onDelete={handleDeleteBookmark}
              onOpen={handleOpenUrl}
            />
          ))
        )}
      </div>

      {/* TypeScript + Zustand + useToggle Demo */}
      <div className="mt-12 p-6 bg-blue-50 rounded-lg border-2 border-dashed border-blue-200">
        <h2 className="text-lg font-semibold mb-3">
          🔷 TypeScript + Zustand + useToggle Demo
        </h2>
        <div className="space-y-3">
          <p className="text-gray-600">
            <strong>useToggle:</strong> Modal {isModalOpen ? "Mở" : "Đóng"}{" "}
            (Type-safe)
          </p>
          <p className="text-gray-600">
            <strong>Zustand Persist:</strong> {bookmarks.length} bookmarks
            (Typed store)
          </p>
          <p className="text-gray-600">
            <strong>TypeScript:</strong> Full type safety với interfaces &
            generics
          </p>
          <div className="flex gap-2">
            <Button onClick={toggleModal} variant="outline" size="sm">
              Toggle Modal
            </Button>
            <Button
              onClick={() =>
                handleAddBookmark({
                  title: "TypeScript Docs",
                  url: "https://typescriptlang.org",
                })
              }
              variant="outline"
              size="sm"
            >
              Add TS Bookmark
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
