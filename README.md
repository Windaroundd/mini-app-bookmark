# Bookmark Manager

A simple, modern personal bookmark manager built with React, TypeScript, and Zustand.

## 📝 Description

This app allows you to store, manage, add, and delete your favorite bookmarks. Minimalist and user-friendly interface, with data stored in your browser.

## 🚀 Main Features

- Add new bookmarks (title, URL)
- Delete individual bookmarks or clear all
- Quickly open links in a new tab
- Data persistence using localStorage (Zustand persist)
- Beautiful, responsive UI with dark mode support
- Fully typed with TypeScript for type safety

## ⚡️ Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint
```

Access the app at: http://localhost:5173

## 🛠 Technologies Used

- React 19 + TypeScript
- Zustand (state management, persist)
- Tailwind CSS
- Vite
- Radix UI, Lucide Icons

## 📁 Project Structure

```
├── public/               # Static assets (favicon, images, ...)
├── src/
│   ├── assets/           # App-specific static assets
│   ├── components/       # Reusable React components
│   │   └── ui/           # UI primitives (Button, Input, ...)
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   ├── pages/            # Main page components
│   ├── store/            # Zustand stores (state management)
│   ├── types/            # TypeScript type definitions
│   ├── App.tsx           # App root component
│   ├── main.tsx          # App entry point
│   └── App.css           # Global styles
├── index.html            # HTML entry point
├── package.json          # Project metadata and scripts
├── vite.config.ts        # Vite configuration
└── ...                   # Other config files
```

---

Author: windaround
