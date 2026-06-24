"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useDashboard } from "../hooks/useDashboard";
import type { Pet } from "../types/pet";

type PetContextValue = {
  pets: Pet[];
  selectedPetId: string | null;
  selectedPet: Pet | null;
  setSelectedPetId: (id: string) => void;
  isLoading: boolean;
  reloadPets: () => Promise<void>;
};

type PetProviderProps = {
  children: ReactNode;
  apiBaseUrl?: string;
};

const PetContext = createContext<PetContextValue | null>(null);

export const PetProvider = ({ children, apiBaseUrl }: PetProviderProps) => {
  const { data, isLoading, reload } = useDashboard({ apiBaseUrl });
  const [selectedPetId, setSelectedPetIdState] = useState<string | null>(null);

  const pets = data?.pets ?? [];

  useEffect(() => {
    const currentPets = data?.pets ?? [];

    if (currentPets.length === 0) {
      setSelectedPetIdState(null);
      return;
    }

    const isCurrentPetValid =
      selectedPetId !== null &&
      currentPets.some((pet) => pet.id === selectedPetId);

    if (!isCurrentPetValid) {
      setSelectedPetIdState(currentPets[0]!.id);
    }
  }, [data?.pets, selectedPetId]);

  const setSelectedPetId = useCallback((id: string) => {
    setSelectedPetIdState(id);
  }, []);

  const selectedPet = useMemo(
    () => pets.find((pet) => pet.id === selectedPetId) ?? null,
    [pets, selectedPetId],
  );

  const value = useMemo(
    () => ({
      pets,
      selectedPetId,
      selectedPet,
      setSelectedPetId,
      isLoading,
      reloadPets: reload,
    }),
    [pets, selectedPetId, selectedPet, setSelectedPetId, isLoading, reload],
  );

  return <PetContext.Provider value={value}>{children}</PetContext.Provider>;
};

export const usePetContext = () => {
  const context = useContext(PetContext);

  if (!context) {
    throw new Error("usePetContext must be used within a PetProvider");
  }

  return context;
};
