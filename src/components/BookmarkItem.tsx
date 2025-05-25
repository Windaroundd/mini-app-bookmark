import { memo } from "react";
import { ExternalLink, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Bookmark } from "@/types/bookmark";

interface BookmarkItemProps {
  bookmark: Bookmark;
  onDelete: (id: string) => void;
  onOpen: (url: string) => void;
}

export const BookmarkItem = memo<BookmarkItemProps>(
  ({ bookmark, onDelete, onOpen }) => {
    const handleDelete = (): void => {
      onDelete(bookmark.id);
    };

    const handleOpen = (): void => {
      onOpen(bookmark.url);
    };

    const formatDate = (dateString: string): string => {
      return new Date(dateString).toLocaleDateString();
    };

    return (
      <div className="group flex items-center justify-between p-4 border rounded-lg hover:shadow-md hover:bg-gray-50 transition-all">
        <div className="flex-1 min-w-0">
          <h3 className="font-medium group-hover:text-blue-600 transition-colors truncate">
            {bookmark.title}
          </h3>
          <p className="text-sm text-gray-500 truncate">{bookmark.url}</p>
          <p className="text-xs text-gray-400 mt-1">
            Added {formatDate(bookmark.createdAt)}
          </p>
        </div>

        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity ml-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleOpen}
            aria-label={`Open ${bookmark.title}`}
          >
            <ExternalLink className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700"
            aria-label={`Delete ${bookmark.title}`}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }
);

BookmarkItem.displayName = "BookmarkItem";
