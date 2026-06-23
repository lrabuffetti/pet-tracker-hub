import type { MedicalEntryType, Pet, PetType } from "./pet";

export type DashboardAlert = {
  id: string;
  petId: string;
  petName: string;
  petAvatarUrl: string | null;
  type: MedicalEntryType;
  title: string;
  nextDueDate: string;
  isOverdue: boolean;
  daysUntilDue: number;
};

export type DashboardData = {
  pets: Pet[];
  alerts: DashboardAlert[];
  hasPets: boolean;
};

export type { PetType };
