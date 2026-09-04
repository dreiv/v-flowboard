import { createI18n } from 'vue-i18n'
import en from './locales/en.json'

// Structured by domain (common.*, nav.*, tasks.*, journal.*) so new locales
// can be dropped in as sibling files under ./locales without touching app code.
export const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: { en },
})
