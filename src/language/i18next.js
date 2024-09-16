import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import languageDetector from "@os-team/i18next-react-native-language-detector";


const resources = {
    en: {
        translation: require('../locales/en.json')
    },
    ta: {
        translation: require('../locales/ta.json'),
    },
    tl: {
        translation: require('../locales/tl.json'),
    },
    hi: {
        translation: require('../locales/hi.json'),
    },
}

i18n.use(languageDetector).use(initReactI18next).init({
    fallbackLng: 'en',
    compatibilityJSON: 'v3',
    resources: resources,
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;