# EcoSort AI - Intelligent Waste Classification

## Overview
EcoSort AI is an AI-powered waste sorting assistant that helps users classify waste items from images to promote eco-friendly habits and recycling. The app uses Google's Gemini AI to identify waste items and provide proper disposal guidance.

**Current State:** Fully functional React/TypeScript web application running on Vite, successfully deployed on Replit.

## Recent Changes
- **November 2, 2025**: Initial Replit setup
  - Configured Vite to use port 5000 for Replit environment
  - Installed Node.js 20 and all npm dependencies
  - Set up GEMINI_API_KEY environment variable for AI functionality
  - Configured workflow to run the development server
  - Deployment configuration added for autoscale deployment

## Project Architecture

### Frontend Stack
- **Framework**: React 19.2.0 with TypeScript
- **Build Tool**: Vite 6.2.0
- **AI Service**: Google Gemini AI via @google/genai package
- **Port**: 5000 (configured for Replit proxy)

### Key Features
- **Image Upload**: Users can upload images of waste items
- **Camera Scanner**: Real-time waste classification using device camera
- **AI Classification**: Gemini AI identifies waste type and disposal method
- **History Tracking**: Keeps track of previously scanned items
- **Location Services**: Map integration for finding recycling centers (requires geolocation permission)
- **Eco Tips**: Educational carousel with recycling tips
- **Theme Toggle**: Light/Dark mode support
- **Profile Management**: User preferences and statistics

### Project Structure
```
├── components/          # React components
│   ├── BottomNav.tsx   # Bottom navigation bar
│   ├── History.tsx     # Scan history display
│   ├── ImageUploader.tsx # Image upload component
│   ├── Loader.tsx      # Loading indicator
│   ├── Map.tsx         # Recycling center map
│   ├── Profile.tsx     # User profile
│   ├── ResultDisplay.tsx # Classification results
│   ├── Scanner.tsx     # Camera scanner
│   ├── ThemeToggle.tsx # Dark/light mode toggle
│   ├── TipsCarousel.tsx # Eco tips carousel
│   └── Welcome.tsx     # Welcome screen
├── hooks/              # Custom React hooks
│   ├── useLocalStorage.ts # Local storage hook
│   └── useTheme.tsx    # Theme management
├── services/           # External services
│   └── geminiService.ts # Gemini AI integration
├── App.tsx             # Main app component
├── index.tsx           # App entry point
├── types.ts            # TypeScript type definitions
├── vite.config.ts      # Vite configuration
└── package.json        # Dependencies and scripts
```

### Environment Variables
- `GEMINI_API_KEY`: Required for AI waste classification (stored in Replit Secrets)

### Dependencies
**Production:**
- react & react-dom: UI framework
- @google/genai: Google Gemini AI SDK

**Development:**
- vite: Build tool and dev server
- @vitejs/plugin-react: React plugin for Vite
- typescript: Type checking
- @types/node: Node.js type definitions

## Running the Application

### Development
The app runs automatically via the configured workflow:
```bash
npm run dev
```
- Access at: Replit webview on port 5000
- Hot Module Replacement (HMR) enabled for instant updates

### Build for Production
```bash
npm run build
```
Outputs to `dist/` directory

### Preview Production Build
```bash
npm run preview
```

## Deployment
Configured for Replit Autoscale deployment:
- Build command: `npm run build`
- Run command: `npm run preview`
- Deployment type: Autoscale (stateless web app)

## User Preferences
None specified yet.

## How to Use the App
1. **Upload Image**: Click the upload button to select a photo of waste
2. **Scan with Camera**: Use the scanner to capture real-time images
3. **View Results**: AI identifies the item and suggests proper disposal
4. **Check History**: Review previously scanned items
5. **Find Locations**: Use the map to locate nearby recycling centers
6. **Read Tips**: Learn eco-friendly habits from the tips carousel

## API Integration
The app uses Google's Gemini AI API for waste classification. The API key is securely stored in environment variables and injected at build time via Vite's define config.

## Browser Permissions
- **Geolocation**: Required for the Map feature to find nearby recycling centers
