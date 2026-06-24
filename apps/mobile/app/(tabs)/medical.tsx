import { StyleSheet, Text, View } from "react-native";
import { useTranslation } from "@repo/ui/context/I18nContext";
import { usePetContext } from "@repo/ui/context/PetContext";

export default function MedicalTab() {
  const { t } = useTranslation();
  const { selectedPet } = usePetContext();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("nav.medical")}</Text>
      <View style={styles.placeholder}>
        <Text style={styles.emoji}>📋</Text>
        <Text style={styles.comingSoon}>{t("nav.comingSoon")}</Text>
        {selectedPet && (
          <Text style={styles.hint}>
            {selectedPet.name} — vacunas y controles
          </Text>
        )}
      </View>
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
    flex: 1,
    maxHeight: 280,
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
  },
});
