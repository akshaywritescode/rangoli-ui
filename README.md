# Rangoli 🎨

A beautiful, modern UI component library built with Next.js, TypeScript, and Tailwind CSS. Featuring a stunning animated geometric logo, premium typography, smooth animations, and a sleek dark interface.

## ✨ Features

- 🎨 **Animated Rangoli Logo**: Custom multicolor geometric design with rotating layers
- 🔍 **Smart Search**: Command palette style search with `⌘K` shortcut
- 🔤 **Beautiful Typography**: Space Grotesk, Inter, and JetBrains Mono fonts
- 🌈 **Vibrant Colors**: Full spectrum gradient accents
- ⚡ **Built with Next.js 15**: App Router, TypeScript, and Tailwind CSS v4
- 📱 **Fully Responsive**: Perfect on all devices
- 🔍 **Three View Modes**: Preview, Code, and Usage documentation
- 📋 **Copy-to-Clipboard**: One-click code copying
- 🚀 **Static Generation**: Lightning-fast performance
- 📝 **Markdown Support**: Rich documentation support
- 🎭 **Smooth Animations**: Polished micro-interactions
- 💎 **Glass Morphism**: Modern backdrop blur effects
- ⌨️ **Keyboard Shortcuts**: Quick access to search and navigation

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
rangoli/
├── app/
│   ├── component/[id]/
│   │   └── page.tsx          # Dynamic component detail pages
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Homepage
├── components/
│   ├── CodeBlock.tsx          # Code display with copy button
│   ├── ComponentCard.tsx      # Component card for homepage
│   ├── ComponentPreview.tsx   # Live component preview
│   └── ComponentTabs.tsx      # Tab navigation for detail page
├── lib/
│   └── components.ts          # Component data store
└── public/                    # Static assets
```

## Adding New Components

To add a new component, follow these steps:

### 1. Add Component Data

Edit `lib/components.ts` and add a new object to the `components` array:

```typescript
{
  id: "your-component-id",
  name: "Component Name",
  description: "Brief description of the component",
  category: "Category", // e.g., 'Buttons', 'Cards', 'Forms'
  date: "2026-09-14",   // Release date in YYYY-MM-DD format
  html: `<div class="your-component">
    <!-- Your HTML -->
  </div>`,
  css: `.your-component {
    /* Your CSS */
  }`,
  js: `// Optional JavaScript
  console.log('Hello');`,
  usage: `## Usage

Your markdown documentation here.

### Installation
1. Copy the code
2. Paste it in your project

### Tips
- Tip 1
- Tip 2
  `
}
```

### 2. Add Component Preview

Edit `components/ComponentPreview.tsx` and add a new case for your component:

```typescript
if (component.id === "your-component-id") {
  return (
    <>
      <style jsx>{`
        /* Your component styles */
      `}</style>
      <div className="your-component">
        {/* Your component JSX */}
      </div>
    </>
  );
}
```

### 3. Test

Run the dev server and navigate to:
- Homepage: `http://localhost:3000` - Your component should appear in the grid
- Detail page: `http://localhost:3000/component/your-component-id`

## Customization

### Logo

The Rangoli logo is a custom animated SVG component. See `LOGO_DESIGN.md` for details on:
- Design philosophy and structure
- Color customization
- Animation speed adjustment
- Creating static versions

### Theme Colors

Edit `app/globals.css` to customize the color scheme:

```css
:root {
  --background: #0a0a0a;
  --foreground: #ededed;
}
```

### Tailwind Config

The project uses Tailwind CSS v4. Customize colors and other settings in `app/globals.css` using the `@theme` directive.

## Build for Production

```bash
npm run build
```

This will generate static pages for all components.

## Deploy

Deploy to Vercel (recommended):

```bash
vercel
```

Or any other Next.js-compatible hosting platform.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **Markdown**: react-markdown

## License

MIT - Free to use for personal and commercial projects.
