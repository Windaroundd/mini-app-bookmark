"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useBookmarkForm } from "@/hooks/useBookmarkForm";
import type { BookmarkFormData } from "@/types/bookmark";

interface AddBookmarkModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (bookmark: BookmarkFormData) => void;
}

export function AddBookmarkModal({
  isOpen,
  onOpenChange,
  onSubmit,
}: AddBookmarkModalProps): React.ReactElement {
  const { formData, setTitle, setUrl, resetForm, isValid } = useBookmarkForm();

  const handleSubmit = (): void => {
    if (isValid) {
      onSubmit(formData);
      resetForm();
      onOpenChange(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent): void => {
    if (event.key === "Enter" && isValid) {
      handleSubmit();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Bookmark
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Bookmark</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-4" onKeyDown={handleKeyDown}>
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
              placeholder="Enter title"
              required
            />
          </div>
          <div>
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              type="url"
              value={formData.url}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUrl(e.target.value)
              }
              placeholder="https://example.com"
              required
            />
          </div>
          <Button onClick={handleSubmit} className="w-full" disabled={!isValid}>
            Add Bookmark
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
