import React, { createContext, useState } from "react";
import i18n from "i18next";
import { I18nManager } from "react-native";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(i18n.language);

  const changeLanguage = (newLangauge) => {
    i18n.changeLanguage(newLangauge);
    setLanguage(newLangauge);
    I18nManager.forceRTL(newLangauge === "en" ? true : false);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
