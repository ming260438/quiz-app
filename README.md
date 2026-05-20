# Quiz App

General knowledge quiz application built with Expo, React Native, TypeScript, and React Native Paper.

## Tech Stack

- Expo 54
- React Native 0.81 + React 19
- TypeScript
- React Native Paper (Material Design 3)
- React Navigation (Native Stack)
- AsyncStorage for local persistence
- Kanit font via @expo-google-fonts/kanit

## Features

- 20 bilingual (English/Thai) general knowledge questions
- 4 choices per question with immediate correct/wrong visual feedback
- Question and option randomization per session (Fisher-Yates)
- Light/Dark theme toggle on Home screen (persisted locally)
- Language toggle EN/TH on Home screen (persisted locally)
- Result summary with score, percentage, and motivational message
- Local leaderboard (top 10) with medals for top 3 ranks
- Smooth transitions and lightweight screen animations

## Screens

| Screen | Description |
|--------|-------------|
| Home | Enter player name, choose theme/language, start quiz, or open leaderboard |
| Quiz | Answer questions, track progress, and continue to result |
| Result | Show final score and save result to local leaderboard |
| Leaderboard | Show top 10 saved scores with pull-to-refresh |

## Getting Started

### Prerequisites

- Node.js 20.19.4 or higher (recommended for Expo 54 and React Native 0.81)
- npm 10+
- Expo Go app on mobile, Android emulator, iOS simulator, or a web browser

Note: iOS simulator requires macOS with Xcode installed.

### Install

```bash
cd quiz-app
npm install
```

### Run Development Server

```bash
npm start
```

Then scan the QR code with Expo Go (Android) or Camera (iOS), or choose another platform from the Expo CLI menu.

### Platform Commands

```bash
npm run android
npm run ios
npm run web
```

## Scripts

- start: Start Expo development server
- android: Launch on Android
- ios: Launch on iOS
- web: Launch on Web

## Project Structure

```text
quiz-app/
|- App.tsx
|- src/
|  |- data/
|  |  |- questions.ts            # Quiz question bank (EN/TH)
|  |- i18n/
|  |  |- LanguageContext.tsx     # App language state + persistence
|  |  |- translations.ts         # UI string dictionary
|  |- navigation/
|  |  |- AppNavigator.tsx        # Native stack navigation config
|  |- screens/
|  |  |- HomeScreen.tsx
|  |  |- QuizScreen.tsx
|  |  |- ResultScreen.tsx
|  |  |- LeaderboardScreen.tsx
|  |- storage/
|  |  |- leaderboard.ts          # AsyncStorage helpers for scores
|  |- theme/
|  |  |- ColorModeContext.tsx    # Light/Dark mode state + persistence
|  |  |- typography.ts           # Font mapping
|  |- utils/
|     |- shuffle.ts              # Fisher-Yates shuffle
```

## Data and Persistence

- Leaderboard is stored locally using @react-native-async-storage/async-storage
- Theme mode and language preferences are stored locally using AsyncStorage
- No backend or external database is required

## Troubleshooting

### Port 8081 is already in use

When running `npm start`, Expo may ask to use another port. Accept the prompt to continue.

### EBADENGINE warnings during npm install

If your Node.js version is below the recommended version, npm may show engine warnings (for Metro/React Native packages). Update Node.js to 20.19.4+ to remove these warnings.

### Dependency issues after package changes

Reinstall dependencies cleanly.

Windows:

```powershell
rmdir /s /q node_modules
del package-lock.json
npm install
npm start -- --clear
```

macOS/Linux:

```bash
rm -rf node_modules package-lock.json
npm install
npm start -- --clear
```

## Notes

- The default language is English; users can switch to Thai on the Home screen.
- UI is built with React Native Paper plus custom theming and typography.
