# Quick Start Guide

## Run Development Server

```bash
npm run dev
```

Then open http://localhost:3000

## Add Your First Component

### Step 1: Define the component in `lib/components.ts`

```typescript
{
  id: "animated-card",
  name: "Animated Card",
  description: "A card with smooth hover animations",
  category: "Cards",
  date: "2026-09-21",
  html: `<div class="animated-card">
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</div>`,
  css: `.animated-card {
  padding: 24px;
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.animated-card:hover {
  transform: scale(1.05);
  border-color: #6366f1;
}`,
  usage: `## Usage

A simple animated card component.

### Installation
1. Copy the HTML
2. Copy the CSS
3. Customize the content
  `
}
```

### Step 2: Add preview in `components/ComponentPreview.tsx`

```typescript
if (component.id === "animated-card") {
  return (
    <>
      <style jsx>{`
        .animated-card {
          padding: 24px;
          background: #1a1a1a;
          border: 1px solid #333;
          border-radius: 12px;
          transition: all 0.3s ease;
        }
        .animated-card:hover {
          transform: scale(1.05);
          border-color: #6366f1;
        }
      `}</style>
      <div className="animated-card">
        <h3>Card Title</h3>
        <p>Card content goes here</p>
      </div>
    </>
  );
}
```

### Step 3: Test

Save the files and check:
- Homepage: http://localhost:3000
- Detail: http://localhost:3000/component/animated-card

Done! 🎉

## Weekly Workflow

Every week:
1. Design your component
2. Add it to `lib/components.ts`
3. Add preview to `ComponentPreview.tsx`
4. Test locally
5. Commit and deploy

## Deploy to Vercel

```bash
npm run build  # Test production build
vercel         # Deploy
```

## Tips

- Use the gradient button as a template
- Keep components simple and focused
- Write clear usage docs
- Test on mobile (responsive design)
