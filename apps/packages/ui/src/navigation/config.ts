import type { TranslationKey } from "../i18n/types";

export type NavItemId = "dashboard" | "map" | "medical" | "settings";

export type NavItem = {
  id: NavItemId;
  labelKey: TranslationKey;
  webHref: string;
  mobileRoute: string;
};

export const NAV_ITEMS: NavItem[] = [
  {
    id: "dashboard",
    labelKey: "nav.dashboard",
    webHref: "/dashboard",
    mobileRoute: "/(tabs)",
  },
  {
    id: "map",
    labelKey: "nav.map",
    webHref: "/map",
    mobileRoute: "/(tabs)/map",
  },
  {
    id: "medical",
    labelKey: "nav.medical",
    webHref: "/medical",
    mobileRoute: "/(tabs)/medical",
  },
  {
    id: "settings",
    labelKey: "nav.settings",
    webHref: "/settings",
    mobileRoute: "/(tabs)/settings",
  },
];

export const APP_NAME = "PawTrack";
