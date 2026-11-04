/*
 * Translation scaffold.
 * English is the source language. Add Spanish strings here and expose a language
 * switch in the UI when the translated content has been reviewed.
 */
(() => {
  "use strict";
  const translations = {
    en: {},
    es: {}
  };

  window.setLanguage = function setLanguage(language) {
    const dictionary = translations[language];
    if (!dictionary) return false;

    document.documentElement.lang = language;
    document.querySelectorAll("[data-i18n]").forEach(element => {
      const key = element.dataset.i18n;
      if (Object.prototype.hasOwnProperty.call(dictionary, key)) {
        element.textContent = dictionary[key];
      }
    });
    return true;
  };
})();
