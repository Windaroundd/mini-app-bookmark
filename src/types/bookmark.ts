export interface Bookmark {
    id: string
    title: string
    url: string
    createdAt: string
  }
  
  export interface BookmarkFormData {
    title: string
    url: string
  }
  
  export type BookmarkAction =
    | { type: "ADD_BOOKMARK"; payload: Omit<Bookmark, "id" | "createdAt"> }
    | { type: "DELETE_BOOKMARK"; payload: string }
    | { type: "CLEAR_BOOKMARKS" }