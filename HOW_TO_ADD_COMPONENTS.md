# How to Add New Components to Rangoli

This guide explains how to add new components to your Rangoli UI library.

## Steps to Add a New Component

### 1. Create the Component File (Optional - for React components)

If your component is a React component, create it in `components/ui/`:

```tsx
// components/ui/YourComponent.tsx
"use client";

interface YourComponentProps {
  // Define your props here
  prop1: string;
  prop2?: number;
}

export default function YourComponent({ prop1, prop2 }: YourComponentProps) {
  return (
    <div>
      {/* Your component JSX */}
    </div>
  );
}
```

### 2. Add Component to the Data Store

Open `lib/components.ts` and add your component to the `components` array:

```typescript
{
  id: "your-component-id",
  name: "Your Component Name",
  description: "Brief description of what your component does",
  category: "Buttons", // Options: Buttons, Cards, Forms, Navigation, Effects
  date: "2026-09-14", // Today's date
  
  // For React components:
  hasReactComponent: true,
  reactComponentPath: "@/components/ui/YourComponent",
  
  html: `<YourComponent 
  prop1="value" 
  prop2={123} 
/>`,
  
  css: `// Styles are built into the component using Tailwind CSS`,
  
  usage: `## Usage

Description of your component.

### Installation

1. Copy the component code to your project:
   \`components/ui/YourComponent.tsx\`

2. Import and use it:

\`\`\`tsx
import YourComponent from "@/components/ui/YourComponent";

export default function MyPage() {
  return (
    <YourComponent 
      prop1="value" 
      prop2={123} 
    />
  );
}
\`\`\`

### Props

- \`prop1\` (string, required): Description
- \`prop2\` (number, optional): Description

### Features

- Feature 1
- Feature 2

### Customization

How to customize the component...
`,
},
```

### 3. Add Preview to ComponentPreview

Open `components/ComponentPreview.tsx` and add your component's preview:

```typescript
import YourComponent from "@/components/ui/YourComponent";

export function ComponentPreview({ component }: ComponentPreviewProps) {
  if (component.id === "your-component-id") {
    return (
      <YourComponent 
        prop1="demo value"
        prop2={123}
      />
    );
  }
  
  // ... rest of the previews
}
```

### 4. Test Your Component

1. Start the dev server: `npm run dev`
2. Navigate to the homepage
3. Find your component in the grid
4. Click on it to see the detail page
5. Test the Preview, Setup, and Code tabs

## Component Categories

Choose the appropriate category for your component:

- **Buttons**: Interactive button components
- **Cards**: Card layouts and containers
- **Forms**: Form inputs, selects, checkboxes, etc.
- **Navigation**: Menus, navbars, tabs, breadcrumbs
- **Effects**: Animations, transitions, visual effects

## Tips

1. **Keep it modular**: Make components reusable with clear props
2. **Use TypeScript**: Define proper types for all props
3. **Add good descriptions**: Help users understand what the component does
4. **Provide usage examples**: Show how to implement and customize
5. **Test thoroughly**: Make sure the preview works and code is correct

## Examples

Look at existing components for reference:
- **Music Player** (`components/ui/MusicPlayer.tsx`) - Complex React component with animations
- **Gradient Button** - Simple CSS-only component

## Need Help?

Check the existing component implementations in:
- `lib/components.ts` - Component data
- `components/ui/` - React components
- `components/ComponentPreview.tsx` - Preview rendering
