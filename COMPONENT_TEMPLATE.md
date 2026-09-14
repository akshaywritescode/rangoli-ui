# Component Template

Use this as a template when adding new components each week.

## Step 1: Add to `lib/components.ts`

```typescript
{
  id: "component-name-kebab-case",
  name: "Component Display Name",
  description: "A short one-line description of what this component does",
  category: "Category", // Buttons, Cards, Forms, Inputs, Navigation, etc.
  date: "YYYY-MM-DD",   // Today's date
  html: `<!-- HTML Code Here -->
<div class="your-component">
  <p>Component content</p>
</div>`,
  css: `/* CSS Code Here */
.your-component {
  /* styles */
}`,
  js: `// Optional JavaScript
// Only include if your component needs JS
console.log('Optional');`,
  usage: `## Usage

Brief introduction to your component.

### Installation

1. Copy the HTML code
2. Copy the CSS code
3. (Optional) Copy the JavaScript code
4. Customize as needed

### Customization

Explain what can be customized:
- Color scheme
- Size variations
- Behavior options

### Examples

Provide usage examples or variations.

### Tips

- Tip 1
- Tip 2
- Best practices
  `
}
```

## Step 2: Add to `components/ComponentPreview.tsx`

Add a new condition before the final `return null`:

```typescript
if (component.id === "component-name-kebab-case") {
  return (
    <>
      <style jsx>{`
        /* Paste your CSS here */
        .your-component {
          /* styles */
        }
      `}</style>
      {/* Paste your HTML here (converted to JSX) */}
      <div className="your-component">
        <p>Component content</p>
      </div>
    </>
  );
}
```

**Important**: Convert HTML to JSX:
- `class` → `className`
- `for` → `htmlFor`
- Self-closing tags need `/>`
- Inline styles need objects: `style={{ color: 'red' }}`

## Step 3: Test Locally

```bash
npm run dev
```

Visit:
- Homepage: http://localhost:3000
- Detail: http://localhost:3000/component/your-component-id

Check:
- ✅ Component appears in grid
- ✅ Preview renders correctly
- ✅ Code tabs show correct code
- ✅ Usage documentation displays
- ✅ Copy buttons work
- ✅ Mobile responsive

## Step 4: Build & Deploy

```bash
# Test production build
npm run build

# If successful, deploy
git add .
git commit -m "Add [Component Name] component"
git push

# Or deploy directly
vercel
```

## Example Categories

- **Buttons**: CTAs, icon buttons, button groups
- **Cards**: Info cards, pricing cards, profile cards
- **Forms**: Inputs, textareas, checkboxes, toggles
- **Navigation**: Navbars, breadcrumbs, tabs
- **Feedback**: Alerts, toasts, modals, tooltips
- **Display**: Badges, avatars, progress bars
- **Layout**: Containers, grids, dividers
- **Animations**: Loaders, transitions, effects

## Component Ideas

Week 1: Gradient Button ✅
Week 2: Animated Card
Week 3: Glassmorphism Input
Week 4: Neon Toggle Switch
Week 5: Skeleton Loader
Week 6: Toast Notification
Week 7: Profile Card
Week 8: Search Bar with Animation
...and so on!

## Tips for Great Components

1. **Keep it simple** - One component, one purpose
2. **Make it reusable** - Easy to customize
3. **Write clear docs** - Explain customization options
4. **Show variations** - Different colors, sizes, states
5. **Test responsiveness** - Works on all screen sizes
6. **Use modern CSS** - Flexbox, Grid, CSS variables
7. **Consider accessibility** - Semantic HTML, ARIA labels
8. **Add interactions** - Hover, focus, active states
