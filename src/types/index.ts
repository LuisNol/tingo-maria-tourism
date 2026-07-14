export type Language = 'es' | 'en'

export interface Place {
  id: string
  name: string
  description: string
  image: string
  rating: number
  hours: string
  price: string
  howToReach: string
  guideUrl?: string
  mapUrl?: string
}

export interface Hotel {
  id: string
  name: string
  description: string
  image: string
  rating: number
  price: string
  location: string
}

export interface Restaurant {
  id: string
  name: string
  description: string
  image: string
  rating: number
  cuisine: string
  location: string
}

export interface Weather {
  temperature: number
  condition: string
  humidity: number
  rain: number
  city: string
}

export interface ItineraryItem {
  id: string
  placeId: string
  time: string
  type: 'place' | 'meal' | 'activity'
}

export interface Itinerary {
  id: string
  title: string
  days: number
  items: ItineraryItem[]
}

export interface FavoriteItem {
  id: string
  type: 'place' | 'hotel' | 'restaurant'
}