# Cab Connect Mobile App

React Native mobile application for the Cab Connect ride-hailing platform.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Expo CLI
- iOS Simulator (Mac) or Android Studio (for Android development)

### Installation

1. **Navigate to mobile directory:**
```bash
cd 09-FRONTEND-MOBILE
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure environment:**
```bash
cp .env.example .env.development
# Edit .env.development with your configuration
```

4. **Start development server:**
```bash
npm start
```

### Running on Devices

**iOS Simulator:**
```bash
npm run ios
```

**Android Emulator:**
```bash
npm run android
```

**Web Browser:**
```bash
npm run web
```

**Physical Device:**
1. Install Expo Go app on your device
2. Scan QR code from terminal

## 🧪 Testing

### Run all tests:
```bash
npm test
```

### Run tests in watch mode:
```bash
npm run test:watch
```

### Run tests with coverage:
```bash
npm run test:coverage
```

## 🎨 Code Quality

### Lint code:
```bash
npm run lint
```

### Fix linting issues:
```bash
npm run lint:fix
```

### Format code:
```bash
npm run format
```

### Type check:
```bash
npm run type-check
```

## 📁 Project Structure

```
09-FRONTEND-MOBILE/
├── src/
│   ├── components/      # Reusable components
│   ├── screens/         # Screen components
│   ├── navigation/      # Navigation configuration
│   ├── redux/           # State management
│   ├── services/        # API services
│   ├── utils/           # Utility functions
│   ├── types/           # TypeScript types
│   └── styles/          # Theme and styles
├── assets/              # Images, fonts, etc.
├── __tests__/           # Test files
└── App.tsx              # Root component
```

## 🔧 Environment Variables

See `.env.example` for all available configuration options.

### Required:
- `API_URL` - Backend API URL
- `GOOGLE_MAPS_API_KEY` - Google Maps API key

### Optional:
- `ENVIRONMENT` - Environment name (development/production)
- `APP_NAME` - Application name

## 📦 Building for Production

### Android:
```bash
expo build:android
```

### iOS:
```bash
expo build:ios
```

### Using EAS Build:
```bash
eas build --platform android
eas build --platform ios
```

## 🛠️ Development

### Install pre-commit hooks:
```bash
npx husky install
```

### Add new dependencies:
```bash
npm install <package-name>
```

### Update dependencies:
```bash
npm update
```

## 📱 Features

- ✅ User authentication (coming in Milestone 2)
- ✅ Ride booking (coming in Milestone 3)
- ✅ Real-time driver tracking (coming in Milestone 4)
- ✅ Payment integration (coming in Milestone 5)
- ✅ Ride history (coming in Milestone 6)

## 🎨 Design System

### Colors:
- Primary: `#10b981` (Green)
- Secondary: `#065f46` (Dark Green)
- Background: `#ffffff` (White)
- Text: `#1f2937` (Dark Gray)

### Typography:
- Font sizes: 12px - 24px
- Font weights: 400, 600, 700

## 🚨 Troubleshooting

### Metro bundler issues:
```bash
npm start -- --reset-cache
```

### Clear Expo cache:
```bash
expo start -c
```

### Node modules issues:
```bash
rm -rf node_modules
npm install
```

### iOS Simulator not working:
```bash
xcrun simctl erase all
```

## 📄 License

Proprietary - Cab Connect Platform

## 🤝 Contributing

1. Follow coding standards (ESLint, Prettier)
2. Write tests for new features
3. Update documentation
4. Run pre-commit hooks

## 📞 Support

For issues or questions, contact the development team.
