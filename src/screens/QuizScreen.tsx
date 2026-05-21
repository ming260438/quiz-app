import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Easing,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import {
  Button,
  Chip,
  Surface,
  Text,
  TouchableRipple,
} from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import QUESTIONS, { Option } from "../data/questions";
import { shuffle } from "../utils/shuffle";
import { useColorMode } from "../theme/ColorModeContext";
import { useLanguage } from "../i18n/LanguageContext";
import { getStrings } from "../i18n/translations";
import { FONT } from "../theme/typography";

type Props = NativeStackScreenProps<RootStackParamList, "Quiz">;

interface QuizPalette {
  background: string;
  text: string;
  muted: string;
  primary: string;
  primarySoft: string;
  card: string;
  border: string;
  track: string;
  progressFill: string;
  progressBorder: string;
  success: string;
  successBorder: string;
  danger: string;
  dangerBorder: string;
  blobA: string;
  blobB: string;
  counterBorder: string;
  counterText: string;
  cardShadow: string;
  optionTextStrong: string;
  optionTextDimmed: string;
  nextShadow: string;
}

const LIGHT_COLORS: QuizPalette = {
  background: "#fff8ef",
  text: "#1f2f45",
  muted: "#6d7280",
  primary: "#ff6d4d",
  primarySoft: "#ffe3d6",
  card: "#ffffff",
  border: "#f0dfcc",
  track: "#f3d1bb",
  progressFill: "#ff5f3c",
  progressBorder: "#e3b89f",
  success: "#dcf7e7",
  successBorder: "#2f9e62",
  danger: "#ffe3dd",
  dangerBorder: "#e35a42",
  blobA: "#ffe2d5",
  blobB: "#d9f2ea",
  counterBorder: "#ffd1bf",
  counterText: "#b94d34",
  cardShadow: "#c88f73",
  optionTextStrong: "#163040",
  optionTextDimmed: "#667085",
  nextShadow: "#ff6d4d",
};

const DARK_COLORS: QuizPalette = {
  background: "#0c1420",
  text: "#edf2ff",
  muted: "#93a4ba",
  primary: "#ff8c66",
  primarySoft: "#2d2521",
  card: "#152234",
  border: "#2a3a51",
  track: "#2e4560",
  progressFill: "#ff9b7a",
  progressBorder: "#4a6788",
  success: "#1f3d32",
  successBorder: "#39b87d",
  danger: "#432627",
  dangerBorder: "#e17368",
  blobA: "#243650",
  blobB: "#1c3d46",
  counterBorder: "#5d4539",
  counterText: "#ffb192",
  cardShadow: "#020617",
  optionTextStrong: "#f7fafc",
  optionTextDimmed: "#8ea0b6",
  nextShadow: "#ff8c66",
};

export default function QuizScreen({ route, navigation }: Props) {
  const { mode } = useColorMode();
  const { language } = useLanguage();
  const strings = getStrings(language);
  const colors = mode === "dark" ? DARK_COLORS : LIGHT_COLORS;
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { playerName } = route.params;

  const shuffledQuestions = useMemo(
    () =>
      shuffle(QUESTIONS).map((q) => ({
        ...q,
        options: shuffle(q.options),
      })),
    []
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<Option | null>(null);
  const [answered, setAnswered] = useState(false);
  const questionOpacity = useRef(new Animated.Value(0)).current;
  const questionShift = useRef(new Animated.Value(10)).current;

  const question = shuffledQuestions[currentIndex];
  const total = shuffledQuestions.length;
  const progress = total > 0 ? (currentIndex + 1) / total : 0;
  const progressPercent = Math.round(Math.max(0, Math.min(progress, 1)) * 100);
  const progressWidth = `${progressPercent}%` as `${number}%`;

  useEffect(() => {
    questionOpacity.setValue(0);
    questionShift.setValue(10);
    Animated.parallel([
      Animated.timing(questionOpacity, {
        toValue: 1,
        duration: 260,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(questionShift, {
        toValue: 0,
        duration: 260,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [currentIndex, questionOpacity, questionShift]);

  function handleSelect(option: Option) {
    if (answered) {
      return;
    }

    setSelected(option);
    setAnswered(true);
    if (option.isCorrect) {
      setScore((prev) => prev + 1);
    }
  }

  function handleNext() {
    if (currentIndex + 1 < total) {
      setCurrentIndex((prev) => prev + 1);
      setSelected(null);
      setAnswered(false);
      return;
    }

    navigation.replace("Result", {
      playerName,
      score,
      total,
    });
  }

  function getOptionStyle(option: Option) {
    if (!answered) {
      return styles.optionBtn;
    }

    if (option.isCorrect) {
      return [styles.optionBtn, styles.correct];
    }

    if (selected === option && !option.isCorrect) {
      return [styles.optionBtn, styles.wrong];
    }

    return [styles.optionBtn, styles.dimmed];
  }

  function getOptionTextStyle(option: Option) {
    if (!answered) {
      return styles.optionText;
    }

    if (option.isCorrect) {
      return [styles.optionText, styles.optionTextStrong];
    }

    if (selected === option && !option.isCorrect) {
      return [styles.optionText, styles.optionTextStrong];
    }

    return [styles.optionText, styles.optionTextDimmed];
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bgAccentA} />
      <View style={styles.bgAccentB} />

      <View style={styles.content}>
        <View style={styles.topRow}>
          <Chip
            mode="flat"
            style={styles.counterBadge}
            textStyle={styles.counterText}
            compact
          >
            {strings.quizQuestionPrefix} {currentIndex + 1} / {total}
          </Chip>
          <View style={styles.playerBadge}>
            <Text style={styles.playerLabel}>{strings.quizPlayerPrefix}</Text>
            <Text style={styles.playerName} numberOfLines={1}>
              {playerName}
            </Text>
          </View>
        </View>

        <View
          style={styles.progressBg}
          accessibilityRole="progressbar"
          accessibilityValue={{ min: 0, max: 100, now: progressPercent }}
        >
          <View style={[styles.progressFill, { width: progressWidth }]} />
        </View>

        <Animated.View
          style={[
            {
              opacity: questionOpacity,
              transform: [{ translateY: questionShift }],
            },
          ]}
        >
          <Surface style={styles.card} elevation={3}>
            <Text style={styles.questionText}>{question.question[language]}</Text>
          </Surface>
        </Animated.View>

        <ScrollView
          style={styles.optionsWrapper}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.optionsContainer}
        >
            {question.options.map((option, idx) => (
              <TouchableRipple
                key={`${question.id}-${idx}`}
                style={getOptionStyle(option)}
                onPress={() => handleSelect(option)}
                disabled={answered}
                borderless={false}
              >
                <View style={styles.optionInner}>
                  <Text style={styles.optionPrefix}>{String.fromCharCode(65 + idx)}</Text>
                  <Text style={getOptionTextStyle(option)}>{option.text[language]}</Text>
                </View>
              </TouchableRipple>
            ))}
        </ScrollView>

        {answered && (
          <Button
            mode="contained"
            style={styles.nextBtn}
            contentStyle={styles.nextBtnContent}
            labelStyle={styles.nextBtnText}
            onPress={handleNext}
            buttonColor={colors.primary}
          >
            {currentIndex + 1 < total ? strings.quizNext : strings.quizSeeResults}
          </Button>
        )}
      </View>
    </SafeAreaView>
  );
}

function createStyles(colors: QuizPalette) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      overflow: "hidden",
    },
    bgAccentA: {
      position: "absolute",
      width: 210,
      height: 210,
      borderRadius: 180,
      backgroundColor: colors.blobA,
      top: -64,
      right: -84,
    },
    bgAccentB: {
      position: "absolute",
      width: 190,
      height: 190,
      borderRadius: 160,
      backgroundColor: colors.blobB,
      bottom: -70,
      left: -60,
    },
    content: {
      flex: 1,
      padding: 20,
      paddingBottom: 16,
    },
    topRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12,
      flexWrap: "wrap",
      rowGap: 8,
    },
    counterBadge: {
      backgroundColor: colors.primarySoft,
      borderRadius: 999,
      borderWidth: 1,
      borderColor: colors.counterBorder,
    },
    counterText: {
      color: colors.counterText,
      fontSize: 13,
      fontFamily: FONT.heading,
    },
    progressBg: {
      height: 10,
      backgroundColor: colors.track,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.progressBorder,
      marginBottom: 18,
      overflow: "hidden",
      shadowColor: colors.cardShadow,
      shadowOpacity: 0.16,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 2 },
      elevation: 2,
    },
    progressFill: {
      borderRadius: 10,
      height: "100%",
      backgroundColor: colors.progressFill,
    },
    playerLabel: {
      color: colors.muted,
      fontSize: 12,
      fontFamily: FONT.body,
    },
    playerBadge: {
      flexDirection: "row",
      alignItems: "center",
      borderRadius: 999,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.card,
      paddingHorizontal: 10,
      paddingVertical: 6,
      maxWidth: "68%",
      shadowColor: colors.cardShadow,
      shadowOpacity: 0.1,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
      elevation: 1,
    },
    playerName: {
      color: colors.text,
      fontSize: 13,
      marginLeft: 6,
      fontFamily: FONT.heading,
      flexShrink: 1,
    },
    card: {
      backgroundColor: colors.card,
      borderRadius: 20,
      padding: 20,
      marginBottom: 18,
      minHeight: 120,
      justifyContent: "center",
      borderWidth: 1,
      borderColor: colors.border,
      shadowColor: colors.cardShadow,
      shadowOpacity: 0.2,
      shadowRadius: 14,
      shadowOffset: { width: 0, height: 7 },
      elevation: 3,
    },
    questionText: {
      color: colors.text,
      fontSize: 24,
      lineHeight: 33,
      fontFamily: FONT.heading,
    },
    optionsWrapper: {
      flex: 1,
    },
    optionsContainer: {
      paddingBottom: 12,
    },
    optionBtn: {
      backgroundColor: colors.card,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: 10,
      overflow: "hidden",
    },
    optionInner: {
      padding: 16,
      flexDirection: "row",
      alignItems: "center",
    },
    correct: {
      borderColor: colors.successBorder,
      backgroundColor: colors.success,
    },
    wrong: {
      borderColor: colors.dangerBorder,
      backgroundColor: colors.danger,
    },
    dimmed: {
      opacity: 0.5,
    },
    optionPrefix: {
      width: 26,
      color: colors.muted,
      fontSize: 15,
      fontFamily: FONT.heading,
    },
    optionText: {
      color: colors.text,
      fontSize: 15,
      flex: 1,
      lineHeight: 22,
      fontFamily: FONT.body,
    },
    optionTextStrong: {
      color: colors.optionTextStrong,
    },
    optionTextDimmed: {
      color: colors.optionTextDimmed,
    },
    nextBtn: {
      marginTop: 6,
      borderRadius: 14,
      shadowColor: colors.nextShadow,
      shadowOpacity: 0.28,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 4 },
      elevation: 3,
    },
    nextBtnContent: {
      paddingVertical: 6,
    },
    nextBtnText: {
      color: "#ffffff",
      fontSize: 16,
      fontFamily: FONT.heading,
    },
  });
}
