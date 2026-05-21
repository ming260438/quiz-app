import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Easing,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import {
  Button,
  IconButton,
  Menu,
  Surface,
  Text,
  TextInput as PaperTextInput,
} from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { useColorMode } from "../theme/ColorModeContext";
import { useLanguage } from "../i18n/LanguageContext";
import { getStrings } from "../i18n/translations";
import { FONT } from "../theme/typography";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

interface HomePalette {
  background: string;
  text: string;
  muted: string;
  primary: string;
  secondary: string;
  card: string;
  cardBorder: string;
  blobTop: string;
  blobBottom: string;
  inputBg: string;
  inputPlaceholder: string;
  panelShadow: string;
  secondaryBtnBg: string;
  secondaryBtnBorder: string;
  secondaryBtnText: string;
}

const LIGHT_COLORS: HomePalette = {
  background: "#fff8ef",
  text: "#1f2f45",
  muted: "#6e7280",
  primary: "#ff6d4d",
  secondary: "#1f8f8b",
  card: "#ffffff",
  cardBorder: "#f0dfcc",
  blobTop: "#ffd8c7",
  blobBottom: "#d7f3eb",
  inputBg: "#fffaf4",
  inputPlaceholder: "#9f9f9f",
  panelShadow: "#c88f73",
  secondaryBtnBg: "#ecfaf5",
  secondaryBtnBorder: "#bde3d8",
  secondaryBtnText: "#1f8f8b",
};

const DARK_COLORS: HomePalette = {
  background: "#0c1420",
  text: "#edf2ff",
  muted: "#99a8bb",
  primary: "#ff8c66",
  secondary: "#4bc9bf",
  card: "#152234",
  cardBorder: "#2b3b53",
  blobTop: "#26374d",
  blobBottom: "#1c3b47",
  inputBg: "#0f1c2b",
  inputPlaceholder: "#7f90a5",
  panelShadow: "#020617",
  secondaryBtnBg: "#1a2d3b",
  secondaryBtnBorder: "#32536a",
  secondaryBtnText: "#79e1d9",
};

export default function HomeScreen({ navigation }: Props) {
  const { mode, setMode } = useColorMode();
  const { language, setLanguage } = useLanguage();
  const strings = getStrings(language);
  const colors = mode === "dark" ? DARK_COLORS : LIGHT_COLORS;
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [name, setName] = useState("");
  const [modeMenuVisible, setModeMenuVisible] = useState(false);
  const [languageMenuVisible, setLanguageMenuVisible] = useState(false);
  const heroOpacity = useRef(new Animated.Value(0)).current;
  const heroShift = useRef(new Animated.Value(14)).current;
  const panelOpacity = useRef(new Animated.Value(0)).current;
  const panelShift = useRef(new Animated.Value(24)).current;

  const canStart = name.trim().length > 0;
  const panelTheme = useMemo(
    () => ({
      colors: {
        primary: colors.primary,
        secondary: colors.secondary,
        surface: colors.card,
        onSurface: colors.text,
        onSurfaceVariant: colors.inputPlaceholder,
      },
    }),
    [colors]
  );

  const handleStartQuiz = () => {
    if (!canStart) {
      return;
    }

    navigation.navigate("Quiz", { playerName: name.trim() });
  };

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(heroOpacity, {
          toValue: 1,
          duration: 420,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(heroShift, {
          toValue: 0,
          duration: 420,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(panelOpacity, {
          toValue: 1,
          duration: 360,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(panelShift, {
          toValue: 0,
          duration: 360,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [heroOpacity, heroShift, panelOpacity, panelShift]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.bgBlobTop} />
      <View style={styles.bgBlobBottom} />

      <View style={styles.topRightActions}>
        <Menu
          visible={modeMenuVisible}
          onDismiss={() => setModeMenuVisible(false)}
          anchor={
            <IconButton
              icon={mode === "dark" ? "weather-night" : "white-balance-sunny"}
              size={25}
              onPress={() => setModeMenuVisible(true)}
              style={[styles.actionIconButton, styles.modeActionButton]}
              iconColor="#ffffff"
              accessibilityLabel={strings.modeLabel}
            />
          }
          contentStyle={styles.dropdownMenu}
        >
          <Menu.Item
            onPress={() => {
              setMode("light");
              setModeMenuVisible(false);
            }}
            title={strings.modeLight}
            leadingIcon="white-balance-sunny"
          />
          <Menu.Item
            onPress={() => {
              setMode("dark");
              setModeMenuVisible(false);
            }}
            title={strings.modeDark}
            leadingIcon="weather-night"
          />
        </Menu>

        <Menu
          visible={languageMenuVisible}
          onDismiss={() => setLanguageMenuVisible(false)}
          anchor={
            <IconButton
              icon="translate"
              size={25}
              onPress={() => setLanguageMenuVisible(true)}
              style={[
                styles.actionIconButton,
                styles.secondaryActionButton,
                styles.languageActionButton,
              ]}
              iconColor="#ffffff"
              accessibilityLabel={strings.languageLabel}
            />
          }
          contentStyle={styles.dropdownMenu}
        >
          <Menu.Item
            onPress={() => {
              setLanguage("en");
              setLanguageMenuVisible(false);
            }}
            title={strings.languageEnglish}
          />
          <Menu.Item
            onPress={() => {
              setLanguage("th");
              setLanguageMenuVisible(false);
            }}
            title={strings.languageThai}
          />
        </Menu>
      </View>

      <Animated.View
        style={[
          styles.hero,
          {
            opacity: heroOpacity,
            transform: [{ translateY: heroShift }],
          },
        ]}
      >
        <Text style={styles.kicker}>{strings.homeKicker}</Text>
        <Text style={styles.title}>{strings.homeTitle}</Text>
        <Text style={styles.subtitle}>
          {mode === "dark" ? strings.homeSubtitleDark : strings.homeSubtitleLight}
        </Text>
      </Animated.View>

      <Animated.View
        style={[
          styles.panel,
          {
            opacity: panelOpacity,
            transform: [{ translateY: panelShift }],
          },
        ]}
      >
        <Surface style={styles.panelSurface} elevation={4}>
          <PaperTextInput
            mode="outlined"
            label={strings.nameLabel}
            placeholder={strings.namePlaceholder}
            value={name}
            onChangeText={setName}
            maxLength={30}
            returnKeyType="done"
            style={styles.input}
            outlineColor={colors.cardBorder}
            activeOutlineColor={colors.primary}
            textColor={colors.text}
            theme={panelTheme}
          />

          <Button
            mode="contained"
            style={styles.btn}
            contentStyle={styles.btnContent}
            labelStyle={styles.btnText}
            onPress={handleStartQuiz}
            disabled={!canStart}
            buttonColor={colors.primary}
          >
            {strings.startQuiz}
          </Button>

          <Button
            mode="outlined"
            style={styles.btnSecondary}
            contentStyle={styles.btnContent}
            labelStyle={styles.btnSecondaryText}
            onPress={() => navigation.navigate("Leaderboard")}
            textColor={colors.secondaryBtnText}
          >
            {strings.leaderboard}
          </Button>
        </Surface>
      </Animated.View>
    </KeyboardAvoidingView>
  );
}

function createStyles(colors: HomePalette) {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      padding: 24,
      backgroundColor: colors.background,
      overflow: "hidden",
    },
    bgBlobTop: {
      position: "absolute",
      width: 260,
      height: 260,
      borderRadius: 200,
      backgroundColor: colors.blobTop,
      top: -90,
      right: -90,
    },
    bgBlobBottom: {
      position: "absolute",
      width: 220,
      height: 220,
      borderRadius: 200,
      backgroundColor: colors.blobBottom,
      bottom: -90,
      left: -70,
    },
    topRightActions: {
      position: "absolute",
      top: Platform.OS === "ios" ? 50 : 16,
      right: 16,
      zIndex: 10,
      flexDirection: "row",
      alignItems: "center",
    },
    actionIconButton: {
      margin: 0,
      width: 48,
      height: 48,
      borderRadius: 999,
      borderWidth: 2,
      borderColor: colors.card,
      shadowColor: colors.panelShadow,
      shadowOpacity: 0.3,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 4 },
      elevation: 8,
    },
    modeActionButton: {
      backgroundColor: colors.primary,
    },
    secondaryActionButton: {
      marginLeft: 8,
    },
    languageActionButton: {
      backgroundColor: colors.secondary,
    },
    dropdownMenu: {
      backgroundColor: colors.card,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: colors.cardBorder,
    },
    hero: {
      marginBottom: 22,
    },
    kicker: {
      color: colors.secondary,
      letterSpacing: 1.5,
      fontSize: 12,
      marginBottom: 8,
      fontFamily: FONT.heading,
    },
    title: {
      fontSize: 44,
      lineHeight: 48,
      color: colors.text,
      fontFamily: FONT.display,
    },
    subtitle: {
      fontSize: 16,
      lineHeight: 24,
      color: colors.muted,
      marginTop: 10,
      fontFamily: FONT.body,
    },
    panel: {
      width: "100%",
    },
    panelSurface: {
      borderRadius: 24,
      backgroundColor: colors.card,
      padding: 20,
      borderWidth: 1,
      borderColor: colors.cardBorder,
      shadowColor: colors.panelShadow,
      shadowOpacity: 0.24,
      shadowRadius: 20,
      shadowOffset: { width: 0, height: 8 },
      elevation: 4,
    },
    input: {
      width: "100%",
      backgroundColor: colors.inputBg,
      marginBottom: 18,
      fontSize: 16,
    },
    btn: {
      width: "100%",
      borderRadius: 14,
      marginBottom: 12,
    },
    btnContent: {
      paddingVertical: 6,
    },
    btnSecondary: {
      backgroundColor: colors.secondaryBtnBg,
      borderWidth: 1,
      borderColor: colors.secondaryBtnBorder,
      borderRadius: 14,
    },
    btnText: {
      fontSize: 16,
      fontFamily: FONT.heading,
    },
    btnSecondaryText: {
      fontSize: 16,
      fontFamily: FONT.heading,
    },
  });
}
