import { useState, useCallback } from "react";
import type { BookmarkFormData } from "../types/bookmark";

interface UseBookmarkFormReturn {
  formData: BookmarkFormData;
  setTitle: (title: string) => void;
  setUrl: (url: string) => void;
  resetForm: () => void;
  isValid: boolean;
}

const initialFormData: BookmarkFormData = {
  title: "",
  url: "",
};

export function useBookmarkForm(): UseBookmarkFormReturn {
  const [formData, setFormData] = useState<BookmarkFormData>(initialFormData);

  const setTitle = useCallback((title: string): void => {
    setFormData((prev) => ({ ...prev, title }));
  }, []);

  const setUrl = useCallback((url: string): void => {
    setFormData((prev) => ({ ...prev, url }));
  }, []);

  const resetForm = useCallback((): void => {
    setFormData(initialFormData);
  }, []);

  const isValid = Boolean(formData.title.trim() && formData.url.trim());

  return {
    formData,
    setTitle,
    setUrl,
    resetForm,
    isValid,
  };
}
