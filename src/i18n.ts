import {initReactI18next} from 'react-i18next'
// eslint-disable-next-line import/no-named-as-default
import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import kg from './locales/kg/kg.json'
import ru from './locales/ru/ru.json'

// eslint-disable-next-line import/no-named-as-default-member
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      kg: {
        translation: kg
      },
      ru: {
        translation: ru
      }
    },
    lng: 'kg',
    fallbackLng: 'kg',
    interpolation: {
      escapeValue: false,
    },
  })

// eslint-disable-next-line import/no-default-export
export default i18n
