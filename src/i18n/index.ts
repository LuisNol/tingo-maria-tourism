import type { Language } from '@/types'

export const translations = {
  en: {
    home: {
      welcome: 'Welcome to Tingo María',
      location: 'Explore the Amazon paradise',
      weather: 'Weather',
      search: 'Search places...',
      explore: 'Explore',
      featured: 'Featured places',
    },
  },
  es: {
    home: {
      welcome: 'Bienvenido a Tingo María',
      location: 'Explora el paraíso amazónico',
      weather: 'Clima',
      search: 'Buscar lugares...',
      explore: 'Explorar',
      featured: 'Lugares destacados',
    },
  },
} as const

export type Translations = typeof translations.en

export function getTranslations(lang: Language): Translations {
  return translations[lang] as Translations
}