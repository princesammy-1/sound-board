# 🎵 Sound Board

A modern, interactive sound synthesizer application built with React and Vite. Create synthesized sound effects using the Web Audio API with various sound types including laser, jump, blip, and chime effects.

## ✨ Features

- **Web Audio API Integration**: Uses the native Web Audio API for synthesized sound generation
- **Multiple Sound Effects**:
  - 🔫 Laser - Sawtooth wave with frequency sweep
  - 🐇 Jump - Sine wave frequency glide
  - 💥 Blip - Sharp square wave attack
  - 🔔 Chime - Multi-frequency harmonic effect
- **Interactive UI**: Click buttons to trigger synthesized sounds
- **Fast Development**: Built with Vite for instant HMR (Hot Module Replacement)
- **Production Ready**: Optimized build process for deployment

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/sound-board.git
cd sound-board

# Install dependencies
npm install
```

### Development

```bash
# Start development server with HMR
npm run dev
```

The app will be available at `http://localhost:5173`

### Building for Production

```bash
# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

## 📁 Project Structure

```
sound-board/
├── src/
│   ├── components/
│   │   └── SoundBoard.jsx      # Main sound board component with synth logic
│   ├── App.jsx                 # Root application component
│   ├── App.css                 # Application styles
│   ├── main.jsx                # React entry point
│   └── index.css               # Global styles
├── public/                      # Static assets
├── package.json                # Project dependencies and scripts
├── vite.config.js              # Vite configuration
├── eslint.config.js            # ESLint rules
├── index.html                  # HTML entry point
└── README.md                   # This file
```

## 🎛️ How It Works

The Sound Board uses the Web Audio API to synthesize sounds programmatically:

1. **Audio Context**: Creates a browser audio context for sound generation
2. **Oscillators**: Different waveforms (sawtooth, sine, square) for different effects
3. **Gain Control**: Volume envelope for realistic sound decay
4. **Frequency Modulation**: Dynamic frequency changes over time for natural-sounding effects

### Sound Effects Explained

- **Laser**: Uses a sawtooth wave that sweeps from 1200Hz to 120Hz, mimicking sci-fi laser sounds
- **Jump**: Sine wave that quickly rises from 300Hz to 900Hz and back, creating a "jump" effect
- **Blip**: Short square wave burst at 880-1100Hz, perfect for notification sounds
- **Chime**: Multiple sine waves at harmonic frequencies creating a pleasant bell-like tone

## 🛠️ Available Scripts

| Script            | Description                                  |
| ----------------- | -------------------------------------------- |
| `npm run dev`     | Start development server with HMR            |
| `npm run build`   | Create optimized production build in `dist/` |
| `npm run preview` | Preview production build locally             |
| `npm run lint`    | Run ESLint to check code quality             |

## 📦 Dependencies

- **React 19.2.6**: Modern JavaScript library for building UIs
- **Vite 8.0.12**: Next-generation frontend build tool

### Dev Dependencies

- **ESLint**: Code quality and style checking
- **React plugins**: Vite and ESLint integrations for React

## 🌐 Deployment

### Deploy to Netlify

#### Option 1: Git Integration (Recommended)

1. Push code to GitHub
2. Visit [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect GitHub and select this repository
5. Configure:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Deploy!

#### Option 2: Using Netlify CLI

```bash
npm install -g netlify-cli
netlify login
npm run build
netlify deploy --prod --dir=dist
```

#### Option 3: Manual Deployment

```bash
npm run build
# Drag and drop the `dist` folder to https://netlify.com/drop
```

## 🎨 Customization

### Adding New Sounds

Edit `src/components/SoundBoard.jsx` and add a new method to the `synth` object:

```javascript
const synth = {
  // ... existing sounds ...
  newSound(ctx, t) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(440, t);
    gain.gain.setValueAtTime(0.3, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
    osc.connect(gain).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.5);
  },
};
```

### Styling

Edit `src/App.css` to customize the appearance of the sound board buttons and layout.

## 🧪 Development Tips

- Use browser DevTools to inspect the audio context and adjust sound parameters
- Check the console for any audio context errors
- Test on different browsers for Web Audio API compatibility
- Use `npm run preview` to test the production build before deployment

## 🐛 Troubleshooting

### No Sound Output

- Check browser audio permissions
- Ensure audio is not muted in the browser or system
- Try a different browser if Web Audio API support issues arise
- Check browser console for errors

### Build Errors

- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear cache: `npm run build -- --force`

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

Created as part of TechX Bootcamp

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

**Enjoy making sounds! 🎵**
