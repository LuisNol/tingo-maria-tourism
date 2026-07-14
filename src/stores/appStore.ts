import { defineStore } from 'pinia'
import type { Language, Place, Hotel, Restaurant, FavoriteItem } from '@/types'

const FAVORITES_KEY = 'explora_tingo_favorites'
const LANGUAGE_KEY = 'explora_tingo_language'

export const useAppStore = defineStore('app', {
  state: () => ({
    language: 'es' as Language,
    favorites: [] as FavoriteItem[],
    currentPlace: null as Place | null,
    currentHotel: null as Hotel | null,
    currentRestaurant: null as Restaurant | null,
    isLoading: false,
  }),

  getters: {
    isFavorite: (state) => {
      return (id: string, type: 'place' | 'hotel' | 'restaurant') => {
        return state.favorites.some(fav => fav.id === id && fav.type === type)
      }
    },
  },

  actions: {
    setLanguage(lang: Language) {
      this.language = lang
      localStorage.setItem(LANGUAGE_KEY, lang)
    },

    loadFromStorage() {
      const savedLanguage = localStorage.getItem(LANGUAGE_KEY)
      if (savedLanguage === 'en' || savedLanguage === 'es') {
        this.language = savedLanguage
      }

      const savedFavorites = localStorage.getItem(FAVORITES_KEY)
      if (savedFavorites) {
        try {
          const parsed = JSON.parse(savedFavorites)
          if (Array.isArray(parsed)) {
            this.favorites = parsed.filter((fav: FavoriteItem) =>
              fav.id && fav.type && ['place', 'hotel', 'restaurant'].includes(fav.type)
            )
          }
        } catch {
          this.favorites = []
        }
      }
    },

    toggleFavorite(item: FavoriteItem) {
      const index = this.favorites.findIndex(
        fav => fav.id === item.id && fav.type === item.type
      )
      if (index === -1) {
        this.favorites.push(item)
      } else {
        this.favorites.splice(index, 1)
      }
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(this.favorites))
    },

    removeFavorite(id: string, type: 'place' | 'hotel' | 'restaurant') {
      const index = this.favorites.findIndex(
        fav => fav.id === id && fav.type === type
      )
      if (index !== -1) {
        this.favorites.splice(index, 1)
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(this.favorites))
      }
    },

    setCurrentPlace(place: Place | null) {
      this.currentPlace = place
    },

    setCurrentHotel(hotel: Hotel | null) {
      this.currentHotel = hotel
    },

    setCurrentRestaurant(restaurant: Restaurant | null) {
      this.currentRestaurant = restaurant
    },

    setLoading(loading: boolean) {
      this.isLoading = loading
    },
  },
})