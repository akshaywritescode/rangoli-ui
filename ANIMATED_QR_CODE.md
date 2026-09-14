# Animated QR Code Component

## Overview

An animated QR code component that brings the QR code to life with dots that scale and fade in with staggered delays. Optional logo can be placed in the center.

## Features

✅ **Animated Dots**: Each dot scales and fades in with a random delay for a dynamic effect
✅ **QR Code Generation**: Uses QR Server API to generate QR codes from any data
✅ **Optional Logo**: Display your logo in the center of the QR code
✅ **Customizable Size**: Adjust the size of the QR code
✅ **Smooth Animations**: CSS transitions for smooth scaling and fading
✅ **Instagram-style**: Similar to the animated QR codes seen on Instagram

## Props

```typescript
interface AnimatedQRCodeProps {
  data: string;      // Required: URL, text, or any data to encode
  logo?: string;     // Optional: URL or path to logo image
  size?: number;     // Optional: Size in pixels (default: 300)
}
```

## Usage

```tsx
import AnimatedQRCode from "@/components/ui/AnimatedQRCode";

export default function MyPage() {
  return (
    <AnimatedQRCode 
      data="https://yourwebsite.com" 
      logo="/logo.png"
      size={300}
    />
  );
}
```

## Examples

### Basic QR Code (no logo)
```tsx
<AnimatedQRCode data="https://github.com/your-repo" />
```

### QR Code with Logo
```tsx
<AnimatedQRCode 
  data="https://yoursite.com" 
  logo="/company-logo.png"
  size={350}
/>
```

### Business Card QR
```tsx
<AnimatedQRCode 
  data="BEGIN:VCARD\nVERSION:3.0\nFN:John Doe\nTEL:+1234567890\nEND:VCARD"
  logo="/profile-pic.png"
/>
```

## How It Works

1. **QR Generation**: Uses QR Server API to generate a QR code image
2. **Pixel Parsing**: Canvas API reads the QR code and identifies dark pixels
3. **Dot Creation**: Creates SVG circles for each dark pixel in the QR pattern
4. **Animation**: Each dot animates in with a random delay (0-0.8s)
5. **Logo Overlay**: Optional logo fades in after dots with scale animation

## Technical Details

- **API**: Free QR Server API (https://goqr.me/api/)
- **Canvas**: Used for parsing QR code pixels
- **SVG**: Renders animated dots
- **React Hooks**: useState, useEffect, useRef for state management

## Customization

You can customize:
- Dot size: Change `r="2.5"` in the circle SVG
- Spacing: Adjust `spacing` variable in the code
- Animation duration: Modify `duration-500` class
- Delay range: Change `Math.random() * 0.8`
- Logo size: Adjust `w-12 h-12` classes

## Browser Support

Works in all modern browsers that support:
- Canvas API
- SVG
- CSS transforms and transitions
- ES6+ JavaScript
