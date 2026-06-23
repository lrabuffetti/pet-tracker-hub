import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { en } from "./locales/en";
import { es } from "./locales/es";
import type { Locale, TranslationKey, TranslationParams } from "./types";

const dictionaries = { en, es };

const detectLocale = (): Locale => {
  if (typeof navigator !== "undefined") {
    const language = navigator.language;

    if (language?.startsWith("es")) {
      return "es";
    }
  }

  try {
    const resolved = Intl.DateTimeFormat().resolvedOptions().locale;

    if (resolved?.startsWith("es")) {
      return "es";
    }
  } catch {
    // Fall back to English.
  }

  return "en";
};

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey, params?: TranslationParams) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

type I18nProviderProps = {
  children: ReactNode;
  initialLocale?: Locale;
};

export const I18nProvider = ({
  children,
  initialLocale,
}: I18nProviderProps) => {
  const [locale, setLocale] = useState<Locale>(initialLocale ?? detectLocale());

  const t = useCallback(
    (key: TranslationKey, params?: TranslationParams) => {
      const template = dictionaries[locale][key] ?? dictionaries.en[key] ?? key;

      if (!params) {
        return template;
      }

      return Object.entries(params).reduce(
        (result, [paramKey, paramValue]) =>
          result.replaceAll(`{{${paramKey}}}`, String(paramValue)),
        template,
      );
    },
    [locale],
  );

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t,
    }),
    [locale, t],
  );

  return (
    <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useTranslation must be used within an I18nProvider");
  }

  return context;
};
