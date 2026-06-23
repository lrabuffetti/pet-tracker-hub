export const computeEstimatedBirthdate = (
  years: number,
  months: number,
): string => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setFullYear(date.getFullYear() - years);
  date.setMonth(date.getMonth() - months);
  return date.toISOString();
};

export const toBirthdateIso = (dateValue: string): string => {
  if (dateValue.includes("T")) {
    return dateValue;
  }

  return new Date(`${dateValue}T00:00:00`).toISOString();
};
