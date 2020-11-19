import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import resources from "./language";

i18n.use(initReactI18next).init({
  resources,
  lng: resources.en_US.language,
  fallbackLng: resources.en_US.language,
  debug: false,
  interpolation: {
    escapeValue: false,
  },
  keySeparator: false,
});
export default i18n;
