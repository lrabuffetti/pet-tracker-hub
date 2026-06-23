export type PetType = "DOG" | "CAT" | "OTHER";

export type PetGender = "MALE" | "FEMALE";

export type MedicalEntryType =
  | "VACCINE"
  | "DEWORMING"
  | "CHECKUP"
  | "SURGERY"
  | "MEDICATION";

export type Pet = {
  id: string;
  userId: string;
  name: string;
  type: PetType;
  breed: string | null;
  birthdate: string | null;
  weight: number | null;
  gender: PetGender | null;
  avatarUrl: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CreatePetPayload = {
  name: string;
  type: PetType;
  birthdate?: string;
  avatarUrl?: string;
};
