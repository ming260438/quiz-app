import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type ColorMode = "light" | "dark";

interface ColorModeContextValue {
  mode: ColorMode;
  setMode: (nextMode: ColorMode) => void;
  toggleMode: () => void;
}

const STORAGE_KEY = "app-color-mode";

const ColorModeContext = createContext<ColorModeContextValue | undefined>(undefined);

export function ColorModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<ColorMode>("light");

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const savedMode = await AsyncStorage.getItem(STORAGE_KEY);
        if (isMounted && (savedMode === "light" || savedMode === "dark")) {
          setModeState(savedMode);
        }
      } catch {
        // Keep the default mode when storage cannot be read.
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  const setMode = useCallback((nextMode: ColorMode) => {
    setModeState(nextMode);
    AsyncStorage.setItem(STORAGE_KEY, nextMode).catch(() => {
      // Ignore write failures and keep in-memory state.
    });
  }, []);

  const toggleMode = useCallback(() => {
    setModeState((current) => {
      const nextMode: ColorMode = current === "light" ? "dark" : "light";
      AsyncStorage.setItem(STORAGE_KEY, nextMode).catch(() => {
        // Ignore write failures and keep in-memory state.
      });
      return nextMode;
    });
  }, []);

  const value = useMemo(
    () => ({ mode, setMode, toggleMode }),
    [mode, setMode, toggleMode]
  );

  return <ColorModeContext.Provider value={value}>{children}</ColorModeContext.Provider>;
}

export function useColorMode() {
  const context = useContext(ColorModeContext);
  if (!context) {
    throw new Error("useColorMode must be used within a ColorModeProvider.");
  }
  return context;
}
