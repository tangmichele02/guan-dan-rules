# 掼蛋规则 - Guan Dan Rules

A mobile-first web app for Guan Dan (掼蛋) card game rules and scoring.

## Features

- **Rules Tab**: Complete game rules, setup, and gameplay instructions
- **Plays Tab**: Visual guide to valid card combinations and bombs
- **Scoring Tab**: Interactive score tracker for game progression

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Mobile-first responsive design

## Getting Started

### Prerequisites

- Node.js 16+ and Yarn

### Installation

```bash
# Install dependencies
yarn install

# Start development server
yarn start
```

The app will open at `http://localhost:3000`

### Building for Production

```bash
yarn build
```

## Project Structure

```
guan-dan-app/
├── public/
│   └── index.html              # HTML template
├── src/
│   ├── components/
│   │   ├── Card.tsx            # Reusable card component
│   │   ├── Rules.tsx           # Rules tab
│   │   ├── Plays.tsx           # Valid plays tab
│   │   └── Scoring.tsx         # Score tracker tab
│   ├── App.tsx                 # Main app with navigation
│   ├── index.tsx               # Entry point
│   └── index.css               # Tailwind + custom styles
├── package.json
├── tsconfig.json
└── tailwind.config.js
```

## Customization

### Colors

Edit `tailwind.config.js` to customize the color scheme:

```javascript
colors: {
  'bold-red': '#DC143C',
  'ink-black': '#1a1a1a',
  'paper-white': '#faf9f6',
}
```

### Card Images

Currently using CSS-based card representations. To add custom card images:

1. **Option 1 - Free SVG cards**:
   - Download from https://github.com/htdebeer/SVG-cards
   - Place in `public/cards/` folder
   - Update `Card.tsx` component to use image sources

2. **Option 2 - Use card fonts**:
   - Add a playing card font from Google Fonts
   - Update Card component to use font glyphs

Example for using images:

```typescript
// In Card.tsx
<img
  src={`/cards/${suit}_${rank}.svg`}
  alt={`${rank}${suit}`}
  className="w-12 h-16"
/>
```

### Content

- **Rules**: Edit `src/components/Rules.tsx`
- **Plays**: Edit `src/components/Plays.tsx`
- **Scoring**: Edit `src/components/Scoring.tsx`

### Scoring Logic

The scoring system currently supports:

- Single Up (单下): +1 rank
- Double Up (双下): +2 ranks
- Triple Up (三下): +3 ranks

To modify scoring rules, edit the `recordRound` function in `src/components/Scoring.tsx`.

## Deployment

This app can be deployed to:

### Vercel (Recommended)

```bash
yarn global add vercel
vercel
```

### Netlify

1. Build the app: `yarn build`
2. Drag and drop the `build` folder to Netlify

### GitHub Pages

```bash
yarn add -D gh-pages

# Add to package.json scripts:
"predeploy": "yarn build",
"deploy": "gh-pages -d build"

# Deploy
yarn deploy
```

## Tips for Mobile

- The app is designed mobile-first
- Sticky header and navigation for easy access
- Touch-friendly buttons and inputs
- Optimized for portrait orientation

## License

MIT
