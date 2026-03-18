import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    ns: [
      "guidelines"
    ],
    defaultNS: "guidelines",
    fallbackNS: "guidelines",
    fallbackLng: "pt",
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: "/demoapp/locales/{{lng}}/{{ns}}.json",
    }
  });

export const t = (key, options) => i18n.t(key, options);

export default i18n;
