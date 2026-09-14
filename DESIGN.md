# Design System

## Typography

### Fonts
- **Headings**: Space Grotesk - Modern, geometric sans-serif
- **Body**: Inter - Clean, highly legible for UI text
- **Code**: JetBrains Mono - Developer-friendly monospace font

### Hierarchy
- **Hero Title**: 6xl-8xl (96-128px) - Space Grotesk Bold
- **Section Title**: 3xl (48px) - Space Grotesk Bold
- **Component Title**: xl-2xl (24-32px) - Space Grotesk Bold
- **Body Text**: base-xl (16-20px) - Inter
- **Small Text**: sm (14px) - Inter
- **Code**: sm (14px) - JetBrains Mono

## Colors

### Background
- **Primary**: #000000 (Pure Black)
- **Secondary**: #0a0a0a (Near Black)
- **Cards**: rgba(9, 9, 11, 0.5) - zinc-950/50
- **Elevated**: rgba(24, 24, 27, 0.5) - zinc-900/50

### Borders
- **Subtle**: rgba(255, 255, 255, 0.05) - white/5
- **Medium**: rgba(255, 255, 255, 0.1) - white/10
- **Accent**: Indigo/Purple gradient borders

### Text
- **Primary**: #ffffff (White)
- **Secondary**: #a1a1aa (zinc-400)
- **Muted**: #71717a (zinc-500)

### Accents
- **Indigo**: #6366f1 (indigo-500)
- **Purple**: #a855f7 (purple-500)
- **Pink**: #ec4899 (pink-500)

### Semantic
- **Success**: #10b981 (green-500)
- **Info**: #3b82f6 (blue-500)

## Gradients

### Text Gradients
```css
/* Primary Heading */
background: linear-gradient(to bottom right, #ffffff, rgba(255, 255, 255, 0.4));

/* Accent Heading */
background: linear-gradient(to bottom right, #6366f1, #a855f7, #ec4899);
```

### Background Effects
```css
/* Subtle Glow */
background: radial-gradient(ellipse at top, rgba(99, 102, 241, 0.2), #000000);

/* Card Hover Glow */
background: linear-gradient(to right, #6366f1, #a855f7);
opacity: 0.2;
filter: blur(20px);
```

## Spacing

- **Component Grid Gap**: 24px (6)
- **Section Padding**: 80-128px (20-32)
- **Card Padding**: 24px (6)
- **Element Spacing**: 16-24px (4-6)

## Border Radius

- **Cards**: 16px (rounded-2xl)
- **Buttons/Tags**: 8-12px (rounded-lg to rounded-xl)
- **Pills**: 9999px (rounded-full)

## Effects

### Blur
- **Backdrop**: backdrop-blur-sm, backdrop-blur-xl
- **Glow Effect**: blur-xl, blur-3xl

### Transitions
- **Duration**: 200-300ms
- **Easing**: ease, ease-in-out
- **Properties**: all, colors, transform, opacity

### Hover Effects
- **Cards**: -translate-y-1 (lift)
- **Borders**: Brightness increase
- **Glow**: Opacity 0 → 0.2

## Components

### Cards
- Background: zinc-950/50 with backdrop-blur
- Border: white/5
- Hover: white/10 border, subtle glow, lift
- Padding: 24px

### Buttons
- Primary: Gradient background (indigo → purple)
- Secondary: white/5 background, white/10 border
- Hover: Increased glow, slight scale

### Code Blocks
- Background: zinc-950/90 with backdrop-blur
- Border: white/10
- Header: zinc-950/80 with controls
- Hover: Gradient border glow

### Badges/Tags
- Background: Accent color with /10 opacity
- Border: Accent color with /20 opacity
- Text: Full accent color

## Decorative Elements

### Hero Glow Orbs
- Size: 288-384px (72-96)
- Colors: indigo-500/10, purple-500/10
- Blur: 3xl
- Position: Absolute, offset from center

### Dot Pattern
- SVG pattern overlay
- Opacity: 0.02-0.05
- Creates subtle texture

### Animated Elements
- Status Indicator: Pulsing green dot
- Icon Emoji: Scale on hover
- Loading States: Smooth transitions

## Accessibility

- High contrast ratios (WCAG AA compliant)
- Focus states on interactive elements
- Semantic HTML structure
- Responsive design (mobile-first)
- Reduced motion support (consider adding)

## Best Practices

1. **Consistency**: Use design tokens
2. **Hierarchy**: Clear visual hierarchy with size/weight
3. **Whitespace**: Generous spacing for readability
4. **Performance**: Use CSS transforms for animations
5. **Responsive**: Mobile-first approach
6. **Dark Mode**: Optimized for dark backgrounds
