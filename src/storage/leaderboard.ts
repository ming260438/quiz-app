import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "leaderboard";

export interface LeaderboardEntry {
  name: string;
  score: number;
  total: number;
  date: string; // ISO string
}

export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as LeaderboardEntry[];
  } catch {
    return [];
  }
}

export async function saveScore(entry: Omit<LeaderboardEntry, "date">): Promise<LeaderboardEntry[]> {
  const existing = await getLeaderboard();
  const newEntry: LeaderboardEntry = { ...entry, date: new Date().toISOString() };
  const updated = [...existing, newEntry]
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    })
    .slice(0, 10);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}
