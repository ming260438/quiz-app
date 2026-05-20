import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  Animated,
  Easing,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { Button, Surface, Text } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/AppNavigator";
import { getLeaderboard, LeaderboardEntry } from "../storage/leaderboard";
import { useColorMode } from "../theme/ColorModeContext";
import { useLanguage } from "../i18n/LanguageContext";
import { getStrings } from "../i18n/translations";
import { FONT } from "../theme/typography";

type Props = NativeStackScreenProps<RootStackParamList, "Leaderboard">;

const MEDALS = ["🥇", "🥈", "🥉"];

interface LeaderboardPalette {
  background: string;
  text: string;
  muted: string;
  card: string;
  border: string;
  primary: string;
  secondary: string;
  topRow: string;
  blobTop: string;
  blobBottom: string;
}

const LIGHT_COLORS: LeaderboardPalette = {
  background: "#fff8ef",
  text: "#1f2f45",
  muted: "#6d7280",
  card: "#ffffff",
  border: "#f0dfcc",
  primary: "#ff6d4d",
  secondary: "#1f8f8b",
  topRow: "#fff3e9",
  blobTop: "#ffe0d2",
  blobBottom: "#d8f2ea",
};

const DARK_COLORS: LeaderboardPalette = {
  background: "#0c1420",
  text: "#edf2ff",
  muted: "#95a9c2",
  card: "#152234",
  border: "#2b3b53",
  primary: "#ff8c66",
  secondary: "#2aa39d",
  topRow: "#1f2e44",
  blobTop: "#26374d",
  blobBottom: "#1c3b47",
};

export default function LeaderboardScreen({ navigation }: Props) {
  const { mode } = useColorMode();
  const { language } = useLanguage();
  const strings = getStrings(language);
  const colors = mode === "dark" ? DARK_COLORS : LIGHT_COLORS;
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const revealOpacity = useRef(new Animated.Value(0)).current;
  const revealShift = useRef(new Animated.Value(18)).current;

  const load = useCallback(async () => {
    const data = await getLeaderboard();
    setEntries(data);
  }, []);

  useFocusEffect(
    useCallback(() => {
      revealOpacity.setValue(0);
      revealShift.setValue(18);
      Animated.parallel([
        Animated.timing(revealOpacity, {
          toValue: 1,
          duration: 320,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(revealShift, {
          toValue: 0,
          duration: 320,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
      load();
    }, [load, revealOpacity, revealShift])
  );

  async function onRefresh() {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  }

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString(language === "th" ? "th-TH" : "en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  function renderItem({ item, index }: { item: LeaderboardEntry; index: number }) {
    const medal = MEDALS[index] ?? `${index + 1}.`;
    const percentage = Math.round((item.score / item.total) * 100);
    return (
      <Surface style={[styles.row, index === 0 && styles.topRow]} elevation={2}>
        <Text style={styles.rank}>{medal}</Text>
        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.date}>{formatDate(item.date)}</Text>
        </View>
        <View style={styles.scoreBox}>
          <Text style={styles.score}>
            {item.score}/{item.total}
          </Text>
          <Text style={styles.percent}>{percentage}%</Text>
        </View>
      </Surface>
    );
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
        <Text style={styles.title}>{strings.leaderboardTitle}</Text>
        <Text style={styles.subtitle}>{strings.leaderboardSubtitle}</Text>

        {entries.length === 0 ? (
          <Surface style={styles.empty} elevation={1}>
            <Text style={styles.emptyText}>{strings.leaderboardEmptyTop}</Text>
            <Text style={styles.emptyText}>{strings.leaderboardEmptyBottom}</Text>
          </Surface>
        ) : (
          <FlatList
            data={entries}
            keyExtractor={(_, idx) => String(idx)}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={colors.primary}
              />
            }
          />
        )}

        <Button
          mode="contained"
          style={styles.btn}
          contentStyle={styles.btnContent}
          labelStyle={styles.btnText}
          onPress={() => navigation.navigate("Home")}
          buttonColor={colors.secondary}
        >
          {strings.leaderboardBackToQuiz}
        </Button>
      </Animated.View>
    </SafeAreaView>
  );
}

function createStyles(colors: LeaderboardPalette) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 20,
      overflow: "hidden",
    },
    bgBlobTop: {
      position: "absolute",
      width: 220,
      height: 220,
      borderRadius: 180,
      backgroundColor: colors.blobTop,
      right: -80,
      top: -80,
    },
    bgBlobBottom: {
      position: "absolute",
      width: 170,
      height: 170,
      borderRadius: 150,
      backgroundColor: colors.blobBottom,
      left: -55,
      bottom: -60,
    },
    content: {
      flex: 1,
    },
    title: {
      fontSize: 34,
      color: colors.text,
      textAlign: "center",
      marginBottom: 4,
      fontFamily: FONT.display,
    },
    subtitle: {
      color: colors.muted,
      textAlign: "center",
      marginBottom: 18,
      fontSize: 14,
      fontFamily: FONT.body,
    },
    listContent: {
      paddingBottom: 20,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.card,
      borderRadius: 14,
      padding: 14,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: colors.border,
    },
    topRow: {
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.topRow,
    },
    rank: {
      fontSize: 22,
      width: 40,
      textAlign: "center",
    },
    info: {
      flex: 1,
      marginLeft: 8,
    },
    name: {
      color: colors.text,
      fontSize: 16,
      fontFamily: FONT.heading,
    },
    date: {
      color: colors.muted,
      fontSize: 12,
      marginTop: 2,
      fontFamily: FONT.body,
    },
    scoreBox: {
      alignItems: "flex-end",
    },
    score: {
      color: colors.text,
      fontSize: 16,
      fontFamily: FONT.heading,
    },
    percent: {
      color: colors.primary,
      fontSize: 13,
      marginTop: 2,
      fontFamily: FONT.heading,
    },
    empty: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 18,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: 12,
      padding: 20,
    },
    emptyText: {
      color: colors.muted,
      fontSize: 16,
      marginBottom: 6,
      fontFamily: FONT.body,
      textAlign: "center",
    },
    btn: {
      borderRadius: 14,
      marginTop: 12,
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
