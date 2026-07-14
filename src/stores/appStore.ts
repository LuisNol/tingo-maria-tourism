import { defineStore } from 'pinia'
import type { Language, Place, Hotel, Restaurant, FavoriteItem } from '@/types'

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