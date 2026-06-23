export type Locale = "en" | "es";

export type TranslationParams = Record<string, string | number>;

export type TranslationKey =
  | "addPet.title"
  | "addPet.subtitle"
  | "addPet.name"
  | "addPet.namePlaceholder"
  | "addPet.type"
  | "addPet.age"
  | "addPet.ageExact"
  | "addPet.ageApproximate"
  | "addPet.birthdate"
  | "addPet.years"
  | "addPet.months"
  | "addPet.avatar"
  | "addPet.avatarHint"
  | "addPet.avatarSelected"
  | "addPet.submit"
  | "addPet.submitting"
  | "addPet.cancel"
  | "addPet.nameRequired"
  | "addPet.avatarRequired"
  | "addPet.ageRequired"
  | "petType.DOG"
  | "petType.CAT"
  | "petType.OTHER"
  | "dashboard.addPet"
  | "dashboard.addAnotherPet"
  | "dashboard.yourPets"
  | "dashboard.loading"
  | "dashboard.emptyTitle"
  | "dashboard.emptySubtitle";
