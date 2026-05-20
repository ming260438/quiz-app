import { StatusBar } from "expo-status-bar";
import { useMemo } from "react";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";
import AppNavigator from "./src/navigation/AppNavigator";
import { ColorModeProvider, useColorMode } from "./src/theme/ColorModeContext";
import { LanguageProvider } from "./src/i18n/LanguageContext";
import {
  Kanit_400Regular,
  Kanit_500Medium,
  Kanit_700Bold,
  useFonts,
} from "@expo-google-fonts/kanit";

function AppContent() {
  const { mode } = useColorMode();
  const paperTheme = useMemo(() => {
    const baseTheme = mode === "dark" ? MD3DarkTheme : MD3LightTheme;

    return {
      ...baseTheme,
      colors: {
        ...baseTheme.colors,
        primary: mode === "dark" ? "#ff8c66" : "#ff6d4d",
        secondary: mode === "dark" ? "#4bc9bf" : "#1f8f8b",
        background: mode === "dark" ? "#0c1420" : "#fff8ef",
        surface: mode === "dark" ? "#152234" : "#ffffff",
        surfaceVariant: mode === "dark" ? "#1a2d3b" : "#fff2e7",
        outline: mode === "dark" ? "#32536a" : "#f0dfcc",
      },
    };
  }, [mode]);

  return (
    <PaperProvider theme={paperTheme}>
      <StatusBar style={mode === "dark" ? "light" : "dark"} />
      <AppNavigator />
    </PaperProvider>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Kanit_400Regular,
    Kanit_500Medium,
    Kanit_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <LanguageProvider>
      <ColorModeProvider>
        <AppContent />
      </ColorModeProvider>
    </LanguageProvider>
  );
}
