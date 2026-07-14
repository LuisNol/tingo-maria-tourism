<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/stores/appStore'
import { PLACES, HOTELS, RESTAURANTS } from '@/data'
import AppButton from '@/components/AppButton.vue'
import NavigationBar from '@/components/NavigationBar.vue'
import { navItems, useNavigation } from '@/composables/useNavigation'

const store = useAppStore()
const route = useRoute()

const getItemType = (type: string) => {
  const types: Record<string, string> = {
    place: 'Lugar turístico',
    hotel: 'Hotel',
    restaurant: 'Restaurante',
  }
  return types[type] || ''
}

const getItemRoute = (type: string, id: string) => {
  const routes: Record<string, string> = {
    place: `/places/${id}`,
    hotel: `/hotels/${id}`,
    restaurant: `/restaurants/${id}`,
  }
  return routes[type] || '/home'
}

const favoriteItems = computed(() => {
  return store.favorites
    .map(fav => {
      if (fav.type === 'place') {
        const place = PLACES.find(p => p.id === fav.id)
        return place ? { ...place, type: 'place', id: fav.id } : null
      }
      if (fav.type === 'hotel') {
        const hotel = HOTELS.find(h => h.id === fav.id)
        return hotel ? { ...hotel, type: 'hotel', id: fav.id } : null
      }
      if (fav.type === 'restaurant') {
        const restaurant = RESTAURANTS.find(r => r.id === fav.id)
        return restaurant ? { ...restaurant, type: 'restaurant', id: fav.id } : null
      }
      return null
    })
    .filter((item): item is NonNullable<typeof item> => item !== null)
})

const { navigateTo } = useNavigation()

function viewDetails(item: { type: string; id: string }) {
  navigateTo(getItemRoute(item.type, item.id))
}

function removeFavorite(item: { type: string; id: string }) {
  store.removeFavorite(item.id, item.type as 'place' | 'hotel' | 'restaurant')
}
</script>

<template>
  <div class="favorites-container">
    <header class="header">
      <div class="container">
        <h1>❤️ Mis favoritos</h1>
      </div>
    </header>

    <main class="container">
      <div v-if="favoriteItems.length === 0" class="empty-state">
        <div class="empty-icon">❤️</div>
        <h2>Aún no tienes favoritos</h2>
        <p>Guarda lugares, hoteles o restaurantes en tus favoritos</p>
      </div>

      <div v-else class="favorites-grid">
        <div
          v-for="item in favoriteItems"
          :key="item.id + item.type"
          class="favorite-item"
        >
          <img :src="item.image" :alt="item.name" class="favorite-image" />
          <div class="favorite-info">
            <h3 class="favorite-name">{{ item.name }}</h3>
            <p class="favorite-type">{{ getItemType(item.type) }}</p>
            <AppButton type="outline" @click="viewDetails({ type: item.type, id: item.id })">
              Ver detalles
            </AppButton>
            <AppButton type="yellow" @click="removeFavorite({ type: item.type, id: item.id })">
              ❌ Quitar de favoritos
            </AppButton>
          </div>
        </div>
      </div>
    </main>

    <NavigationBar
      :items="navItems"
      :active-path="route.path"
      @navigate="navigateTo"
    />
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/variables.scss';

.favorites-container {
  min-height: 100vh;
  background-color: $color-white;
  padding-bottom: 60px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.empty-state h2 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: $color-dark;
}

.empty-state p {
  color: $color-medium;
}

.favorites-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

.favorite-item {
  display: flex;
  background-color: $color-white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.favorite-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.favorite-info {
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.favorite-name {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: $color-dark;
}

.favorite-type {
  font-size: $font-size-sm;
  color: $color-medium;
  margin-bottom: 1rem;
}

.favorite-info .btn {
  width: 100%;
  justify-content: center;
}
</style>