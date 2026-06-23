import { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { Button, Input } from "@repo/ui";
import { RequireAuth } from "@repo/ui/components/RequireAuth";
import { useTranslation } from "@repo/ui/context/I18nContext";
import { useCreatePet } from "@repo/ui/hooks/useCreatePet";
import type { PetType } from "@repo/ui/types/pet";
import { getApiUrl } from "@/config/api";
import { authScreenStyles as sharedStyles } from "@/constants/authScreenStyles";

const PET_TYPES: PetType[] = ["DOG", "CAT", "OTHER"];

export default function AddPetScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const {
    name,
    setName,
    type,
    setType,
    ageMode,
    setAgeMode,
    birthdate,
    setBirthdate,
    ageYears,
    setAgeYears,
    ageMonths,
    setAgeMonths,
    setAvatarFile,
    isSubmitting,
    errorMessage,
    isFormValid,
    handleSubmit,
  } = useCreatePet({
    apiBaseUrl: getApiUrl(),
    onSuccess: () => router.replace("/dashboard"),
  });

  const pickAvatar = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.85,
    });

    if (result.canceled || result.assets.length === 0) {
      return;
    }

    const asset = result.assets[0];
    const fileName = asset.fileName ?? `pet-${Date.now()}.jpg`;
    const mimeType = asset.mimeType ?? "image/jpeg";

    setAvatarPreview(asset.uri);
    setAvatarFile({
      uri: asset.uri,
      fileName,
      mimeType,
    });
  };

  return (
    <RequireAuth onUnauthenticated={() => router.replace("/login")}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={sharedStyles.form}>
          <Text style={sharedStyles.title}>{t("addPet.title")}</Text>
          <Text style={sharedStyles.subtitle}>{t("addPet.subtitle")}</Text>

          <Text style={styles.label}>{t("addPet.name")}</Text>
          <Input
            type="text"
            placeholder={t("addPet.namePlaceholder")}
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>{t("addPet.type")}</Text>
          <View style={styles.row}>
            {PET_TYPES.map((petType) => (
              <Pressable
                key={petType}
                onPress={() => setType(petType)}
                style={[
                  styles.choiceButton,
                  type === petType && styles.choiceButtonActive,
                ]}
              >
                <Text
                  style={[
                    styles.choiceButtonText,
                    type === petType && styles.choiceButtonTextActive,
                  ]}
                >
                  {t(`petType.${petType}`)}
                </Text>
              </Pressable>
            ))}
          </View>

          <Text style={styles.label}>{t("addPet.age")}</Text>
          <View style={styles.row}>
            <Pressable
              onPress={() => setAgeMode("approximate")}
              style={[
                styles.choiceButton,
                ageMode === "approximate" && styles.choiceButtonActive,
              ]}
            >
              <Text
                style={[
                  styles.choiceButtonText,
                  ageMode === "approximate" && styles.choiceButtonTextActive,
                ]}
              >
                {t("addPet.ageApproximate")}
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setAgeMode("exact")}
              style={[
                styles.choiceButton,
                ageMode === "exact" && styles.choiceButtonActive,
              ]}
            >
              <Text
                style={[
                  styles.choiceButtonText,
                  ageMode === "exact" && styles.choiceButtonTextActive,
                ]}
              >
                {t("addPet.ageExact")}
              </Text>
            </Pressable>
          </View>

          {ageMode === "exact" ? (
            <Input
              type="text"
              placeholder="YYYY-MM-DD"
              value={birthdate}
              onChangeText={setBirthdate}
            />
          ) : (
            <View style={styles.row}>
              <View style={styles.halfField}>
                <Text style={styles.smallLabel}>{t("addPet.years")}</Text>
                <Input
                  type="number"
                  value={ageYears}
                  onChangeText={setAgeYears}
                />
              </View>
              <View style={styles.halfField}>
                <Text style={styles.smallLabel}>{t("addPet.months")}</Text>
                <Input
                  type="number"
                  value={ageMonths}
                  onChangeText={setAgeMonths}
                />
              </View>
            </View>
          )}

          <Text style={styles.label}>{t("addPet.avatar")}</Text>
          <Button variant="secondary" onPress={pickAvatar}>
            {avatarPreview ? t("addPet.avatarSelected") : t("addPet.avatarHint")}
          </Button>

          {avatarPreview && (
            <Image source={{ uri: avatarPreview }} style={styles.avatar} />
          )}

          <Button
            variant="primary"
            onPress={handleSubmit}
            disabled={isSubmitting || !isFormValid}
          >
            {isSubmitting ? t("addPet.submitting") : t("addPet.submit")}
          </Button>

          <Button variant="link" onPress={() => router.back()}>
            {t("addPet.cancel")}
          </Button>
        </View>

        {errorMessage ? (
          <Text style={sharedStyles.errorMessage}>{errorMessage}</Text>
        ) : null}
      </ScrollView>
    </RequireAuth>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 4,
  },
  smallLabel: {
    fontSize: 13,
    color: "#6b7280",
    marginBottom: 4,
  },
  row: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  halfField: {
    flex: 1,
  },
  choiceButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 8,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  choiceButtonActive: {
    borderColor: "#4f46e5",
    backgroundColor: "#eef2ff",
  },
  choiceButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    textAlign: "center",
  },
  choiceButtonTextActive: {
    color: "#4338ca",
  },
  avatar: {
    width: 128,
    height: 128,
    borderRadius: 64,
    alignSelf: "center",
    marginVertical: 12,
  },
});
