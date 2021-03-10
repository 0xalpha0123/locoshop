import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import translationEN from "../public/locales/en/translation.json";
import translationFR from "../public/locales/fr/translation.json";
import i18nConfig from "../config/i18n.json";
// not like to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init

const languages = i18nConfig.languages;
// the translations
const resources = {
  en: {
    translation: translationEN,
  },
  fr: {
    translation: translationFR,
  },
};

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: i18nConfig.fallbackLng,
    lng: i18nConfig.lng,
    debug: true,
    whitelist: languages,
    resources: resources,
  });

export default i18n;
