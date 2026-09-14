# Deployment Guide

## Deploy to Vercel (Recommended)

Vercel is the easiest way to deploy Next.js apps.

### Option 1: Deploy with Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel
```

### Option 2: Deploy via GitHub

1. Push your code to GitHub:
```bash
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/rangoli.git
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com)
3. Click "Add New Project"
4. Import your GitHub repository
5. Click "Deploy"

Your site will be live at `https://your-project.vercel.app`

### Custom Domain

1. Go to your project on Vercel
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Update your DNS records as instructed

## Deploy to Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Build and deploy
npm run build
netlify deploy --prod
```

## Deploy to Your Own Server

```bash
# Build the app
npm run build

# Start production server
npm start
```

The app will run on port 3000 by default.

### Using PM2 for production

```bash
# Install PM2
npm i -g pm2

# Start the app
pm2 start npm --name "rangoli" -- start

# Save process list
pm2 save

# Setup startup script
pm2 startup
```

## Environment Variables

If you need environment variables:

1. Create `.env.local` file:
```
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

2. Add to Vercel/Netlify via dashboard

## Static Export (Optional)

To generate a fully static site:

1. Update `next.config.ts`:
```typescript
const config: NextConfig = {
  output: 'export',
};
```

2. Build:
```bash
npm run build
```

3. Deploy the `out` folder to any static host (GitHub Pages, Cloudflare Pages, etc.)

## Performance Tips

- Images: Use Next.js Image component for optimization
- Fonts: Already using `next/font` for optimal font loading
- Caching: Vercel automatically handles caching
- Analytics: Add Vercel Analytics or Google Analytics if needed

## Monitoring

### Vercel Analytics
Add to `app/layout.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

## Troubleshooting

### Build fails
- Run `npm run build` locally first
- Check TypeScript errors
- Ensure all dependencies are installed

### 404 on component pages
- Verify component IDs in `lib/components.ts`
- Check `generateStaticParams` in component page

### Styles not loading
- Clear `.next` folder and rebuild
- Check Tailwind configuration
