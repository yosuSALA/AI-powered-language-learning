"use client";
import { useState, useEffect } from "react";
import { Locale, getTranslations, LANGUAGES_LIST } from "./i18n";

export function useLocale() {
  const [locale, setLocale] = useState<Locale>("es");
  const [t, setT] = useState(() => getTranslations("es"));

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((cfg) => {
        const lang = cfg?.languages?.target || "es";
        const validLocales: Locale[] = ["es", "en", "fr", "de", "pt", "ja"];
        const locale: Locale = validLocales.includes(lang) ? lang : "es";
        setLocale(locale);
        setT(getTranslations(locale));
      })
      .catch(() => {
        // Keep defaults on error
      });
  }, []);

  return { locale, t, LANGUAGES_LIST };
}
