import { useCallback } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { PetSelector } from "@repo/ui/components/PetSelector";
import { useTranslation } from "@repo/ui/context/I18nContext";
import { usePetContext } from "@repo/ui/context/PetContext";
import { useAuth } from "@repo/ui/hooks/useAuth";
import { useDashboard } from "@repo/ui/hooks/useDashboard";
import type { Pet } from "@repo/ui/types/pet";
import { formatPetAge } from "@repo/ui/utils/petAge";
import { resolveUploadUrl } from "@repo/ui/utils/resolveUploadUrl";
import { getApiUrl } from "@/config/api";

function PetCard({
  pet,
  typeLabel,
  ageLabel,
  avatarUrl,
}: {
  pet: Pet;
  typeLabel: string;
  ageLabel: string;
  avatarUrl: string | null;
}) {
  return (
    <View style={styles.petCard}>
      {avatarUrl ? (
        <Image source={{ uri: avatarUrl }} style={styles.petAvatar} />
      ) : (
        <View style={styles.petAvatarPlaceholder}>
          <Text style={styles.petAvatarEmoji}>🐾</Text>
        </View>
      )}
      <View style={styles.petInfo}>
        <Text style={styles.petName}>{pet.name}</Text>
        <Text style={styles.petMeta}>
          {typeLabel} · {ageLabel}
        </Text>
      </View>
    </View>
  );
}

export default function DashboardTab() {
  const router = useRouter();
  const apiBaseUrl = getApiUrl();
  const { user } = useAuth();
  const { t, locale } = useTranslation();
  const { data, isLoading, errorMessage, reload } = useDashboard({
    apiBaseUrl,
  });
  const { pets, selectedPetId, setSelectedPetId, selectedPet } =
    usePetContext();

  useFocusEffect(
    useCallback(() => {
      void reload();
    }, [reload]),
  );

  const hasPets = (data?.pets.length ?? 0) > 0;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{t("nav.dashboard")}</Text>
      {user && <Text style={styles.email}>{user.email}</Text>}

      <View style={styles.petSelectorSection}>
        <Text style={styles.petSelectorLabel}>{t("nav.selectPet")}</Text>
        <PetSelector
          pets={pets}
          selectedPetId={selectedPetId}
          onSelect={setSelectedPetId}
          emptyLabel={t("dashboard.emptyTitle")}
        />
        {selectedPet && (
          <Text style={styles.activePetHint}>{selectedPet.name}</Text>
        )}
      </View>

      {isLoading && (
        <ActivityIndicator size="large" color="#4f46e5" style={styles.loader} />
      )}

      {!isLoading && hasPets && (
        <View style={styles.petsSection}>
          <Text style={styles.sectionTitle}>{t("dashboard.yourPets")}</Text>
          {data!.pets.map((pet) => (
            <PetCard
              key={pet.id}
              pet={pet}
              typeLabel={t(`petType.${pet.type}`)}
              ageLabel={formatPetAge(pet.birthdate, locale)}
              avatarUrl={resolveUploadUrl(pet.avatarUrl, apiBaseUrl)}
            />
          ))}
          <Pressable
            style={styles.secondaryButton}
            onPress={() => router.push("/pets/new")}
          >
            <Text style={styles.secondaryButtonText}>
              {t("dashboard.addAnotherPet")}
            </Text>
          </Pressable>
        </View>
      )}

      {!isLoading && !hasPets && !errorMessage && (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>{t("dashboard.emptyTitle")}</Text>
          <Text style={styles.emptySubtitle}>
            {t("dashboard.emptySubtitle")}
          </Text>
          <Pressable
            style={styles.addButton}
            onPress={() => router.push("/pets/new")}
          >
            <Text style={styles.addButtonText}>{t("dashboard.addPet")}</Text>
          </Pressable>
        </View>
      )}

      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    gap: 12,
    paddingHorizontal: 24,
    paddingTop: 56,
    paddingBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  email: {
    fontSize: 16,
    color: "#666",
  },
  petSelectorSection: {
    gap: 8,
    marginTop: 4,
  },
  petSelectorLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  activePetHint: {
    fontSize: 13,
    color: "#4f46e5",
    fontWeight: "500",
  },
  loader: {
    marginVertical: 24,
  },
  petsSection: {
    width: "100%",
    gap: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  petCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    padding: 16,
    backgroundColor: "#fff",
  },
  petAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  petAvatarPlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#eef2ff",
    alignItems: "center",
    justifyContent: "center",
  },
  petAvatarEmoji: {
    fontSize: 28,
  },
  petInfo: {
    flex: 1,
  },
  petName: {
    fontSize: 18,
    fontWeight: "600",
  },
  petMeta: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  secondaryButton: {
    marginTop: 4,
    width: "100%",
    borderWidth: 2,
    borderColor: "#4f46e5",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#4f46e5",
    fontSize: 16,
    fontWeight: "600",
  },
  emptyCard: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    gap: 8,
    backgroundColor: "#fff",
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: 15,
    color: "#666",
    textAlign: "center",
  },
  addButton: {
    marginTop: 8,
    width: "100%",
    backgroundColor: "#4f46e5",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  errorMessage: {
    color: "red",
    textAlign: "center",
    fontSize: 15,
  },
});
