import type { Locale } from "../i18n/types";

export const formatPetAge = (
  birthdate: string | null,
  locale: Locale,
): string => {
  if (!birthdate) {
    return locale === "es" ? "Edad desconocida" : "Age unknown";
  }

  const birth = new Date(birthdate);
  const now = new Date();

  let years = now.getFullYear() - birth.getFullYear();
  let months = now.getMonth() - birth.getMonth();

  if (now.getDate() < birth.getDate()) {
    months -= 1;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  if (locale === "es") {
    if (years > 0 && months > 0) {
      return `${years} años, ${months} meses`;
    }
    if (years > 0) {
      return `${years} años`;
    }
    return `${months} meses`;
  }

  if (years > 0 && months > 0) {
    return `${years}y ${months}m`;
  }
  if (years > 0) {
    return `${years} years`;
  }
  return `${months} months`;
};
