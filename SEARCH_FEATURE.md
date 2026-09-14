# Search Feature Documentation

## Overview

The search component provides a fast, keyboard-friendly way to find components in your library.

## Features

### ✨ Modern Search UI
- **Command Palette Style**: Beautiful modal overlay with backdrop blur
- **Real-time Search**: Instant filtering as you type
- **Rich Results**: Shows component name, description, and category
- **Visual Feedback**: Hover states and smooth transitions

### ⌨️ Keyboard Shortcuts
- **Open Search**: `Cmd+K` (Mac) or `Ctrl+K` (Windows/Linux)
- **Close**: `Esc` key
- **Navigate**: Arrow keys (future enhancement)
- **Select**: Click or Enter key

### 📱 Responsive Design
- **Desktop**: Full search bar with keyboard shortcut hint
- **Tablet**: Condensed search button
- **Mobile**: Search icon only

## Usage

The search bar is automatically included in the header on all pages.

### Opening Search
1. Click the search bar in the header
2. Use keyboard shortcut: `⌘K` or `Ctrl+K`
3. On mobile: Tap the search icon

### Searching
1. Type any part of a component name, description, or category
2. Results filter in real-time
3. Click any result to navigate to that component

### Search Matches
The search looks for your query in:
- Component name
- Component description  
- Component category

## Technical Details

### Component Location
`components/SearchBar.tsx`

### Search Logic
```typescript
const filteredComponents = components.filter((component) =>
  component.name.toLowerCase().includes(query.toLowerCase()) ||
  component.description.toLowerCase().includes(query.toLowerCase()) ||
  component.category.toLowerCase().includes(query.toLowerCase())
);
```

### State Management
- Uses React hooks (`useState`, `useRef`, `useEffect`)
- Client-side component (marked with `"use client"`)
- No external dependencies

## Customization

### Change Keyboard Shortcut
Edit the keyboard event listener in `SearchBar.tsx`:

```typescript
if ((e.metaKey || e.ctrlKey) && e.key === "k") {
  // Change "k" to another key
}
```

### Modify Search Placeholder
```typescript
<input
  placeholder="Search components..." // Change this
  ...
/>
```

### Adjust Search Algorithm
Enhance the search with fuzzy matching or weighted results:

```typescript
// Example: Prioritize name matches
const nameMatches = components.filter(c => 
  c.name.toLowerCase().includes(query.toLowerCase())
);
const otherMatches = components.filter(c => 
  !c.name.toLowerCase().includes(query.toLowerCase()) &&
  (c.description.toLowerCase().includes(query.toLowerCase()) ||
   c.category.toLowerCase().includes(query.toLowerCase()))
);
const filteredComponents = [...nameMatches, ...otherMatches];
```

### Style Customization
The search modal uses Tailwind classes. Key customization points:

```typescript
// Modal size
className="max-w-2xl" // Change to max-w-3xl for wider

// Results height
className="max-h-[60vh]" // Change viewport height

// Backdrop opacity
className="bg-black/80" // Adjust opacity
```

## Header Improvements

### New Header Features
1. **Centered Search Bar**: Takes up flexible space in the middle
2. **GitHub Button**: Styled button with icon (desktop) and icon-only (mobile)
3. **Responsive Layout**: Adapts to all screen sizes
4. **Improved Spacing**: Better visual hierarchy

### Header Layout
```
[Logo] [Search Bar - flexible width] [Components Link] [GitHub Button]
```

On mobile:
```
[Logo] [Search Icon] [GitHub Icon]
```

## Future Enhancements

### Possible Additions
1. **Keyboard Navigation**: Arrow keys to navigate results
2. **Recent Searches**: Store and show recent searches
3. **Search Tags**: Filter by multiple categories
4. **Fuzzy Search**: Better matching for typos
5. **Search Analytics**: Track popular searches
6. **Quick Actions**: "New component" or "View all" shortcuts

### Implementation Examples

#### Add Arrow Key Navigation
```typescript
const [selectedIndex, setSelectedIndex] = useState(0);

useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex(prev => 
        Math.min(prev + 1, filteredComponents.length - 1)
      );
    }
    if (e.key === "ArrowUp") {
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    }
  };
  // ...
}, [filteredComponents]);
```

#### Add Recent Searches
```typescript
const [recentSearches, setRecentSearches] = useState<string[]>([]);

const saveSearch = (query: string) => {
  const updated = [query, ...recentSearches.filter(q => q !== query)].slice(0, 5);
  setRecentSearches(updated);
  localStorage.setItem('recentSearches', JSON.stringify(updated));
};
```

## Accessibility

Current features:
- Keyboard accessible (Cmd+K, Esc)
- Focus management (auto-focus on open)
- Semantic HTML (proper button and input elements)

Future improvements:
- ARIA labels for screen readers
- Keyboard navigation through results
- Announce results count to screen readers

## Performance

- **Instant Search**: No debouncing needed (small dataset)
- **No Network Calls**: All client-side filtering
- **Optimized Rendering**: Only visible results rendered
- **Lazy Modal**: Only mounted when opened

For larger component libraries (100+ components), consider:
- Adding debouncing (300ms delay)
- Virtual scrolling for results
- Web Workers for search
