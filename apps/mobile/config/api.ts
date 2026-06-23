import Constants from "expo-constants";
import { Platform } from "react-native";

const API_PORT = 3000;

const getDevMachineHost = (): string | null => {
  const hostUri =
    Constants.expoConfig?.hostUri ??
    Constants.expoGoConfig?.debuggerHost ??
    Constants.expoGoConfig?.hostUri;

  if (!hostUri) {
    return null;
  }

  const host = hostUri.split(":")[0]?.trim();

  if (!host || host === "localhost" || host === "127.0.0.1") {
    return null;
  }

  return host;
};

export function getApiUrl(): string {
  // iOS Simulator shares localhost with the Mac.
  if (!Constants.isDevice && Platform.OS === "ios") {
    return `http://localhost:${API_PORT}`;
  }

  // Android Emulator must use 10.0.2.2 — LAN IPs from .env do not work here.
  if (!Constants.isDevice && Platform.OS === "android") {
    return `http://10.0.2.2:${API_PORT}`;
  }

  // Physical device in dev: Metro already knows the Mac's LAN IP.
  const devHost = getDevMachineHost();
  if (devHost) {
    return `http://${devHost}:${API_PORT}`;
  }

  // Production / fallback — set your Mac's LAN IP in apps/mobile/.env.
  const fromEnv = process.env.EXPO_PUBLIC_API_URL?.replace(/\/$/, "");
  if (!fromEnv) {
    throw new Error(
      "EXPO_PUBLIC_API_URL is not configured. Set your Mac's LAN IP in apps/mobile/.env (e.g. http://192.168.1.37:3000).",
    );
  }
  if (fromEnv.includes("localhost") || fromEnv.includes("127.0.0.1")) {
    throw new Error(
      "EXPO_PUBLIC_API_URL cannot use localhost on a physical device. Use your Mac's LAN IP instead.",
    );
  }
  if (fromEnv.includes("10.0.2.2")) {
    throw new Error(
      "EXPO_PUBLIC_API_URL cannot use 10.0.2.2 on a physical device. Use your Mac's LAN IP instead.",
    );
  }
  return fromEnv;
}
