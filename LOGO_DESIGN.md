# Rangoli Logo Design

## Overview

The Rangoli logo is a custom SVG design inspired by traditional Indian rangoli patterns. It features a multicolor geometric mandala with animated layers that rotate at different speeds, creating a mesmerizing effect.

## Design Elements

### Structure

The logo consists of three concentric layers:

1. **Center Circle** (Purple)
   - Fixed center point
   - Solid fill
   - Acts as the focal point

2. **Inner Ring** (8 Elliptical Petals)
   - 8 petals arranged in a circular pattern
   - Gradient colors: Indigo → Purple spectrum
   - Rotates clockwise (20s duration)
   - Creates a flower-like appearance

3. **Middle Ring** (6 Diamond Shapes)
   - 6 rotated squares (45° to form diamonds)
   - Rainbow colors: Pink, Red, Orange, Yellow, Green, Blue
   - Rotates counter-clockwise (15s duration)
   - Adds dynamic contrast

4. **Outer Ring** (8 Triangles)
   - 8 triangular points radiating outward
   - Full spectrum of colors
   - Rotates clockwise (25s duration)
   - Creates the rangoli's outer boundary

### Color Palette

```typescript
// Inner petals (indigo-purple gradient)
['#6366f1', '#8b5cf6', '#a855f7', '#c026d3', '#d946ef', '#e879f9', '#f0abfc', '#f5d0fe']

// Middle diamonds (rainbow)
['#ec4899', '#f43f5e', '#f59e0b', '#eab308', '#22c55e', '#3b82f6']

// Outer triangles (full spectrum)
['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f59e0b', '#22c55e', '#14b8a6', '#3b82f6']

// Center
'#a855f7' (purple)
```

### Animations

Each layer rotates at a different speed:

- **Inner petals**: 20s clockwise
- **Middle diamonds**: 15s counter-clockwise  
- **Outer triangles**: 25s clockwise

This creates a hypnotic, flowing effect similar to how rangoli patterns naturally draw the eye inward.

## Technical Implementation

### Component Props

```typescript
interface RangoliLogoProps {
  size?: number; // Default: 40px
}
```

### SVG Specifications

- **ViewBox**: 100x100
- **Scalable**: Size prop scales the entire logo
- **Performance**: Uses CSS transforms for smooth 60fps animations
- **Accessibility**: Decorative only, doesn't require alt text

### Usage

```tsx
import { RangoliLogo } from "@/components/RangoliLogo";

// Default size (40px)
<RangoliLogo />

// Custom size
<RangoliLogo size={120} />

// With hover scale
<div className="group-hover:scale-110 transition-transform">
  <RangoliLogo size={32} />
</div>
```

## Design Philosophy

### Why Rangoli?

Rangoli is a traditional Indian art form created with colored powders, flowers, or rice. The patterns are:
- **Geometric**: Based on mathematical symmetry
- **Colorful**: Using vibrant, contrasting colors
- **Spiritual**: Often created at entrances and celebrations
- **Intricate**: Detailed patterns that draw the eye

### Logo Connection

Our logo embodies these principles:
- ✅ **Geometric symmetry**: Circular, radial design
- ✅ **Vibrant colors**: Full rainbow spectrum
- ✅ **Dynamic**: Rotating animations add life
- ✅ **Intricate**: Multiple layers of detail
- ✅ **Welcoming**: Draws users into the component library

## Customization

Want to modify the logo? Here are easy customization points:

### Change Colors

Edit the color arrays in `components/RangoliLogo.tsx`:

```typescript
// Example: Blue-green theme
const colors = ['#0ea5e9', '#06b6d4', '#14b8a6', '#10b981'];
```

### Adjust Animation Speed

Modify the animation durations:

```typescript
// Slower rotation
className="animate-[spin_30s_linear_infinite]"

// Faster rotation
className="animate-[spin_10s_linear_infinite]"
```

### Change Complexity

Add or remove elements from the arrays:

```typescript
// More petals (12 instead of 8)
{[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(...)}
```

### Static Version (No Animation)

Remove the `animate-` classes to create a static logo:

```typescript
<g> {/* Remove animation class */}
  {/* Shapes */}
</g>
```

## Sizes Used

- **Navigation**: 32px
- **Hero**: 120px
- **Favicon** (future): 16px, 32px, 64px

## Performance

- **File size**: < 2KB
- **Rendering**: Hardware-accelerated CSS transforms
- **Frame rate**: Smooth 60fps on all devices
- **Impact**: Minimal performance overhead

## Accessibility

The logo is purely decorative and doesn't convey critical information:
- No alt text needed (decorative role)
- Colors are aesthetic, not functional
- Animation can be paused with `prefers-reduced-motion` (future enhancement)

## Future Enhancements

Potential improvements:

1. **Reduced Motion Support**
   ```css
   @media (prefers-reduced-motion: reduce) {
     .rangoli-logo * {
       animation: none !important;
     }
   }
   ```

2. **Interactive Hover**
   - Speed up rotation on hover
   - Scale individual layers

3. **Theme Variants**
   - Light mode version
   - Monochrome version
   - Holiday themes

4. **Export Formats**
   - PNG favicons
   - Social media assets
   - Print versions
