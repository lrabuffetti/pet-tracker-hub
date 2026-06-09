import Constants from "expo-constants";
import { Platform } from "react-native";

const API_PORT = 3000;

export function getApiUrl(): string {
  // iOS Simulator shares localhost with the Mac — no LAN IP needed.
  if (!Constants.isDevice && Platform.OS === "ios") {
    return `http://localhost:${API_PORT}`;
  }

  // Android emulator uses 10.0.2.2 to reach the host machine.
  if (!Constants.isDevice && Platform.OS === "android") {
    return (
      process.env.EXPO_PUBLIC_API_URL?.replace(/\/$/, "") ??
      `http://10.0.2.2:${API_PORT}`
    );
  }

  // Physical device — must use the Mac's LAN IP (localhost is the phone itself).
  const fromEnv = process.env.EXPO_PUBLIC_API_URL?.replace(/\/$/, "");
  if (!fromEnv) {
    throw new Error(
      "EXPO_PUBLIC_API_URL is not configured. Set your Mac's LAN IP in apps/mobile/.env (e.g. http://192.168.1.35:3000).",
    );
  }
  if (fromEnv.includes("localhost") || fromEnv.includes("127.0.0.1")) {
    throw new Error(
      "EXPO_PUBLIC_API_URL cannot use localhost on a physical device. Use your Mac's LAN IP instead (e.g. http://192.168.1.35:3000).",
    );
  }
  return fromEnv;
}
