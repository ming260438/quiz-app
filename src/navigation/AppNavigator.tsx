import React, { useMemo } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import QuizScreen from "../screens/QuizScreen";
import ResultScreen from "../screens/ResultScreen";
import LeaderboardScreen from "../screens/LeaderboardScreen";
import { useColorMode } from "../theme/ColorModeContext";
import { useLanguage } from "../i18n/LanguageContext";
import { getStrings } from "../i18n/translations";
import { FONT } from "../theme/typography";

export type RootStackParamList = {
  Home: undefined;
  Quiz: { playerName: string };
  Result: { playerName: string; score: number; total: number };
  Leaderboard: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const { mode } = useColorMode();
  const { language } = useLanguage();
  const strings = getStrings(language);
  const navTheme = useMemo(
    () =>
      mode === "dark"
        ? {
            header: "#0f1724",
            content: "#0c1420",
            text: "#eaf0ff",
          }
        : {
            header: "#fff6ea",
            content: "#fff8ef",
            text: "#1f3b58",
          },
    [mode]
  );

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: navTheme.header },
          headerTintColor: navTheme.text,
          headerTitleStyle: {
            fontWeight: "700",
            fontFamily: FONT.heading,
          },
          headerShadowVisible: false,
          contentStyle: { backgroundColor: navTheme.content },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: strings.navHome }}
        />
        <Stack.Screen
          name="Quiz"
          component={QuizScreen}
          options={{ title: strings.navQuiz, headerBackVisible: false }}
        />
        <Stack.Screen
          name="Result"
          component={ResultScreen}
          options={{ title: strings.navResult, headerBackVisible: false }}
        />
        <Stack.Screen
          name="Leaderboard"
          component={LeaderboardScreen}
          options={{ title: strings.navLeaderboard }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
