import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "@repo/ui/context/I18nContext";
import { useAuth } from "@repo/ui/hooks/useAuth";

export default function SettingsTab() {
  const router = useRouter();
  const { t } = useTranslation();
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("nav.settings")}</Text>

      <View style={styles.placeholder}>
        <Text style={styles.emoji}>⚙️</Text>
        <Text style={styles.comingSoon}>{t("nav.comingSoon")}</Text>
        <Text style={styles.hint}>Dispositivos, geocercas y perfil</Text>
      </View>

      {user && (
        <View style={styles.profileCard}>
          <Text style={styles.profileLabel}>Perfil</Text>
          <Text style={styles.profileEmail}>{user.email}</Text>
        </View>
      )}

      <Pressable
        onPress={() => {
          logout().then(() => router.replace("/login"));
        }}
      >
        <Text style={styles.logout}>{t("nav.logout")}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 56,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  placeholder: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#d1d5db",
    borderRadius: 12,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  emoji: {
    fontSize: 40,
  },
  comingSoon: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  hint: {
    marginTop: 8,
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
  },
  profileCard: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    backgroundColor: "#fff",
    padding: 16,
    gap: 4,
  },
  profileLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  profileEmail: {
    fontSize: 16,
    color: "#111827",
  },
  logout: {
    fontSize: 16,
    color: "#2e78b7",
    textDecorationLine: "underline",
    marginTop: 8,
  },
});
