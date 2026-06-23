import type { CreatePetPayload, Pet } from "../types/pet";
import { fetchWithAuth } from "../utils/api";

export const createPetRequest = async (
  accessToken: string,
  payload: CreatePetPayload,
  apiBaseUrl?: string,
): Promise<Pet> => {
  const data = await fetchWithAuth(
    "/pets",
    accessToken,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
    apiBaseUrl,
  );

  return data as Pet;
};
