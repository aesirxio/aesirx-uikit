/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import common_dk from './dk/common.json';
import common_en from './en/common.json';
import common_es from './es/common.json';
import common_hr from './hr/common.json';
import common_th from './th/common.json';
import common_ua from './ua/common.json';
import common_vn from './vi/common.json';

const listLanguages = {
  en: {
    title: 'English',
    translation: common_en,
  },
  da: {
    title: 'Dansk',
    translation: common_dk,
  },
  vi: {
    title: 'Tiếng Việt',
    translation: common_vn,
  },
  th: {
    title: 'ภาษาไทย',
    translation: common_th,
  },
  hr: {
    title: 'Hrvatski',
    translation: common_hr,
  },
  uk: {
    title: 'Yкраїнська',
    translation: common_ua,
  },

  es: {
    title: 'Español',
    translation: common_es,
  },
};

if (i18n.isInitialized) {
  Object.entries(listLanguages).forEach(([key, val]) => {
    i18n.addResourceBundle(key, 'translation', val.translation);
  });
} else {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: listLanguages,
      lng: localStorage.getItem('i18nextLng') || 'en',
      fallbackLng: 'en',
      debug: !process.env.NODE_ENV || process.env.NODE_ENV === 'development',
    });
}
export { i18n };
