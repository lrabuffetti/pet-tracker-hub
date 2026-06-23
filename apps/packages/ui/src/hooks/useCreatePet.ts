import { useMemo, useState } from "react";
import { useAuth } from "./useAuth";
import { createPetRequest } from "../services/pets";
import { uploadAvatarRequest } from "../services/uploads";
import type { PetType } from "../types/pet";
import type { AvatarFile } from "../types/upload";
import {
  computeEstimatedBirthdate,
  toBirthdateIso,
} from "../utils/birthdate";

export type AgeInputMode = "exact" | "approximate";

type UseCreatePetOptions = {
  apiBaseUrl?: string;
  onSuccess?: () => void;
};

export const useCreatePet = (options?: UseCreatePetOptions) => {
  const { getAccessToken } = useAuth();

  const [name, setName] = useState("");
  const [type, setType] = useState<PetType>("DOG");
  const [ageMode, setAgeMode] = useState<AgeInputMode>("approximate");
  const [birthdate, setBirthdate] = useState("");
  const [ageYears, setAgeYears] = useState("0");
  const [ageMonths, setAgeMonths] = useState("0");
  const [avatarFile, setAvatarFile] = useState<AvatarFile | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const resolvedBirthdate = useMemo(() => {
    if (ageMode === "exact") {
      return birthdate ? toBirthdateIso(birthdate) : undefined;
    }

    const years = Number.parseInt(ageYears, 10) || 0;
    const months = Number.parseInt(ageMonths, 10) || 0;

    if (years === 0 && months === 0) {
      return undefined;
    }

    return computeEstimatedBirthdate(years, months);
  }, [ageMode, ageMonths, ageYears, birthdate]);

  const isFormValid =
    name.trim() !== "" && resolvedBirthdate !== undefined;

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const accessToken = await getAccessToken();

      if (!accessToken) {
        throw new Error("You must be logged in to add a pet");
      }

      if (!resolvedBirthdate) {
        throw new Error("Please complete all required fields");
      }

      const avatarUrl = avatarFile
        ? await uploadAvatarRequest(
            accessToken,
            avatarFile,
            options?.apiBaseUrl,
          )
        : undefined;

      await createPetRequest(
        accessToken,
        {
          name: name.trim(),
          type,
          birthdate: resolvedBirthdate,
          avatarUrl,
        },
        options?.apiBaseUrl,
      );

      options?.onSuccess?.();
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to add pet",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
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
    avatarFile,
    setAvatarFile,
    isSubmitting,
    errorMessage,
    isFormValid,
    handleSubmit,
  };
};
