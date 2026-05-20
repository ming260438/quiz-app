import React, { useEffect, useMemo, useRef, useState } from "react";
import { Animated, Easing, SafeAreaView, StyleSheet, View } from "react-native";
import { ActivityIndicator, Button, Surface, Text } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { saveScore } from "../storage/leaderboard";
import { useColorMode } from "../theme/ColorModeContext";
import { useLanguage } from "../i18n/LanguageContext";
import { getStrings } from "../i18n/translations";
import { FONT } from "../theme/typography";

type Props = NativeStackScreenProps<RootStackParamList, "Result">;

interface ResultPalette {
  background: string;
  text: string;
  muted: string;
  card: string;
  border: string;
  primary: string;
  primarySoft: string;
  secondary: string;
  tertiary: string;
  blobTop: string;
  blobBottom: string;
  shadow: string;
}

const LIGHT_COLORS: ResultPalette = {
  background: "#fff8ef",
  text: "#1f2f45",
  muted: "#6d7280",
  card: "#ffffff",
  border: "#f0dfcc",
  primary: "#ff6d4d",
  primarySoft: "#ffe6dc",
  secondary: "#1f8f8b",
  tertiary: "#274c77",
  blobTop: "#ffe0d2",
  blobBottom: "#d8f2ea",
  shadow: "#c88f73",
};

const DARK_COLORS: ResultPalette = {
  background: "#0c1420",
  text: "#edf2ff",
  muted: "#96a8bf",
  card: "#152234",
  border: "#2b3b53",
  primary: "#ff8c66",
  primarySoft: "#2d2521",
  secondary: "#2aa39d",
  tertiary: "#3f5f8f",
  blobTop: "#26374d",
  blobBottom: "#1c3b47",
  shadow: "#020617",
};

export default function ResultScreen({ route, navigation }: Props) {
  const { mode } = useColorMode();
  const { language } = useLanguage();
  const strings = getStrings(language);
  const colors = mode === "dark" ? DARK_COLORS : LIGHT_COLORS;
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { playerName, score, total } = route.params;
  const percentage = Math.round((score / total) * 100);
  const [saving, setSaving] = useState(true);
  const revealOpacity = useRef(new Animated.Value(0)).current;
  const revealShift = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    saveScore({ name: playerName, score, total }).finally(() => setSaving(false));
  }, [playerName, score, total]);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(revealOpacity, {
        toValue: 1,
        duration: 380,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(revealShift, {
        toValue: 0,
        duration: 380,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [revealOpacity, revealShift]);

  function getEmoji() {
    if (percentage >= 80) return "🏆";
    if (percentage >= 50) return "👍";
    return "📚";
  }

  function getMessage() {
    if (percentage >= 80) return strings.resultExcellent;
    if (percentage >= 50) return strings.resultGood;
    return strings.resultKeepGoing;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bgBlobTop} />
      <View style={styles.bgBlobBottom} />

      <Animated.View
        style={[
          styles.content,
          {
            opacity: revealOpacity,
            transform: [{ translateY: revealShift }],
          },
        ]}
      >
        <Text style={styles.emoji}>{getEmoji()}</Text>
        <Text style={styles.title}>{getMessage()}</Text>
        <Text style={styles.player}>{playerName}</Text>

        <Surface style={styles.scoreCard} elevation={4}>
          <Text style={styles.scoreLabel}>{strings.resultScoreLabel}</Text>
          <Text style={styles.scoreValue}>
            {score} / {total}
          </Text>
          <Text style={styles.percentText}>{percentage}%</Text>
        </Surface>

        {saving ? (
          <ActivityIndicator color={colors.primary} style={styles.loading} />
        ) : (
          <Text style={styles.savedText}>{strings.resultSaved}</Text>
        )}

        <Button
          mode="contained"
          style={styles.btn}
          contentStyle={styles.btnContent}
          labelStyle={styles.btnText}
          buttonColor={colors.primary}
          onPress={() => navigation.navigate("Leaderboard")}
        >
          {strings.resultViewLeaderboard}
        </Button>

        <Button
          mode="contained"
          style={styles.btn}
          contentStyle={styles.btnContent}
          labelStyle={styles.btnText}
          buttonColor={colors.secondary}
          onPress={() => navigation.replace("Quiz", { playerName })}
        >
          {strings.resultPlayAgain}
        </Button>

        <Button
          mode="contained"
          style={styles.btn}
          contentStyle={styles.btnContent}
          labelStyle={styles.btnText}
          buttonColor={colors.tertiary}
          onPress={() => navigation.navigate("Home")}
        >
          {strings.resultHome}
        </Button>
      </Animated.View>
    </SafeAreaView>
  );
}

function createStyles(colors: ResultPalette) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      justifyContent: "center",
      padding: 24,
      overflow: "hidden",
    },
    bgBlobTop: {
      position: "absolute",
      width: 230,
      height: 230,
      borderRadius: 180,
      backgroundColor: colors.blobTop,
      right: -85,
      top: -75,
    },
    bgBlobBottom: {
      position: "absolute",
      width: 190,
      height: 190,
      borderRadius: 160,
      backgroundColor: colors.blobBottom,
      left: -62,
      bottom: -58,
    },
    content: {
      width: "100%",
      alignItems: "center",
    },
    emoji: {
      fontSize: 68,
      marginBottom: 10,
    },
    title: {
      fontSize: 34,
      color: colors.text,
      marginBottom: 4,
      fontFamily: FONT.display,
    },
    player: {
      fontSize: 16,
      color: colors.muted,
      marginBottom: 24,
      fontFamily: FONT.body,
    },
    scoreCard: {
      backgroundColor: colors.card,
      borderRadius: 24,
      padding: 28,
      alignItems: "center",
      width: "100%",
      marginBottom: 18,
      borderWidth: 1,
      borderColor: colors.border,
      shadowColor: colors.shadow,
      shadowOpacity: 0.22,
      shadowRadius: 16,
      shadowOffset: { width: 0, height: 8 },
      elevation: 4,
    },
    scoreLabel: {
      color: colors.muted,
      fontSize: 14,
      marginBottom: 6,
      fontFamily: FONT.body,
    },
    scoreValue: {
      color: colors.text,
      fontSize: 40,
      fontFamily: FONT.display,
      marginBottom: 4,
    },
    percentText: {
      color: colors.primary,
      fontSize: 22,
      backgroundColor: colors.primarySoft,
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: 999,
      fontFamily: FONT.heading,
    },
    loading: {
      marginBottom: 24,
    },
    savedText: {
      color: colors.secondary,
      fontSize: 14,
      marginBottom: 20,
      fontFamily: FONT.body,
    },
    btn: {
      width: "100%",
      borderRadius: 14,
      marginBottom: 12,
    },
    btnContent: {
      paddingVertical: 6,
    },
    btnText: {
      color: "#ffffff",
      fontSize: 16,
      fontFamily: FONT.heading,
    },
  });
}
