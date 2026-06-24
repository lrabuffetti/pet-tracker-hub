import type { ComponentProps } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";
import { RequireAuth } from "@repo/ui/components/RequireAuth";
import { PetProvider } from "@repo/ui/context/PetContext";
import { useTranslation } from "@repo/ui/context/I18nContext";
import { getApiUrl } from "@/config/api";

type IoniconName = ComponentProps<typeof Ionicons>["name"];

const TAB_ICONS: Record<string, { focused: IoniconName; unfocused: IoniconName }> =
  {
    index: { focused: "home", unfocused: "home-outline" },
    map: { focused: "location", unfocused: "location-outline" },
    medical: { focused: "medkit", unfocused: "medkit-outline" },
    settings: { focused: "settings", unfocused: "settings-outline" },
  };

export default function TabLayout() {
  const router = useRouter();
  const { t } = useTranslation();
  const apiBaseUrl = getApiUrl();

  return (
    <RequireAuth onUnauthenticated={() => router.replace("/login")}>
      <PetProvider apiBaseUrl={apiBaseUrl}>
        <Tabs
          screenOptions={({ route }) => {
            const icons = TAB_ICONS[route.name] ?? TAB_ICONS.index;
            const isMap = route.name === "map";

            return {
              headerShown: false,
              tabBarActiveTintColor: "#4f46e5",
              tabBarInactiveTintColor: "#6b7280",
              tabBarStyle: {
                borderTopColor: "#e5e7eb",
                backgroundColor: "#fff",
                paddingTop: 4,
                height: 60,
              },
              tabBarLabelStyle: {
                fontSize: 11,
                fontWeight: "600",
              },
              tabBarIcon: ({ color, focused, size }) => (
                <Ionicons
                  name={focused ? icons.focused : icons.unfocused}
                  size={isMap ? size + 4 : size}
                  color={color}
                />
              ),
            };
          }}
        >
          <Tabs.Screen
            name="index"
            options={{ title: t("nav.dashboard") }}
          />
          <Tabs.Screen name="map" options={{ title: t("nav.map") }} />
          <Tabs.Screen
            name="medical"
            options={{ title: t("nav.medical") }}
          />
          <Tabs.Screen
            name="settings"
            options={{ title: t("nav.settings") }}
          />
        </Tabs>
      </PetProvider>
    </RequireAuth>
  );
}
