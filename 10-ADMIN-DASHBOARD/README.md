# Cab Connect Admin Dashboard

Next.js admin dashboard for the Cab Connect ride-hailing platform.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Navigate to admin directory:**
```bash
cd 10-ADMIN-DASHBOARD
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure environment:**
```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

4. **Start development server:**
```bash
npm run dev
```

The dashboard will be available at: `http://localhost:3000`

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
10-ADMIN-DASHBOARD/
├── src/
│   ├── app/             # Next.js App Router pages
│   ├── components/      # Reusable components
│   ├── lib/             # Utilities and API client
│   ├── types/           # TypeScript types
│   └── styles/          # Global styles
├── public/              # Static assets
└── __tests__/           # Test files
```

## 🔧 Environment Variables

See `.env.example` for all available configuration options.

### Required:
- `NEXT_PUBLIC_API_URL` - Backend API URL
- `NEXT_PUBLIC_ENVIRONMENT` - Environment name

## 📦 Building for Production

### Create production build:
```bash
npm run build
```

### Start production server:
```bash
npm start
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

## 📱 Features

- ✅ Dashboard overview
- ✅ Driver management (coming in Milestone 2)
- ✅ User management (coming in Milestone 2)
- ✅ Ride monitoring (coming in Milestone 3)
- ✅ Analytics (coming in Milestone 4)
- ✅ Settings (coming in Milestone 5)

## 🎨 Design System

Built with Tailwind CSS:
- Primary color: `#10b981` (Green)
- Secondary: `#6b7280` (Gray)
- Responsive design
- Dark mode ready

## 🚨 Troubleshooting

### Port already in use:
```bash
npx kill-port 3000
```

### Clear Next.js cache:
```bash
rm -rf .next
npm run dev
```

### Node modules issues:
```bash
rm -rf node_modules
npm install
```

## 📄 License

Proprietary - Cab Connect Platform

## 🤝 Contributing

1. Follow Next.js best practices
2. Use TypeScript strictly
3. Write tests for new features
4. Update documentation

## 📞 Support

For issues or questions, contact the development team.
