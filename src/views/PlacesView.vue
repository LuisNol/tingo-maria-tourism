<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { PLACES } from '@/data'
import AppCard from '@/components/AppCard.vue'
import NavigationBar from '@/components/NavigationBar.vue'

const router = useRouter()
const route = useRoute()

const searchQuery = ref('')

const filteredPlaces = computed(() => {
  if (!searchQuery.value) return PLACES
  return PLACES.filter(place =>
    place.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    place.description.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const navItems = [
  { icon: '🏠', label: 'Inicio', path: '/home' },
  { icon: '🏞️', label: 'Lugares', path: '/places' },
  { icon: '🏨', label: 'Hoteles', path: '/hotels' },
  { icon: '🍽️', label: 'Restaurantes', path: '/restaurants' },
]

function navigateTo(path: string) {
  router.push(path)
}
</script>

<template>
  <div class="places-container">
    <header class="header">
      <div class="container">
        <h1>🏞️ Lugares turísticos</h1>
      </div>
    </header>

    <main class="container">
      <div class="search-bar">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="🔍 Buscar lugar..."
          class="input"
        />
      </div>

      <div class="item-grid">
        <AppCard
          v-for="place in filteredPlaces"
          :key="place.id"
          :image="place.image"
          :title="place.name"
          :rating="place.rating"
          :price="place.price"
          type="place"
          :id="place.id"
        />
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

.places-container {
  min-height: 100vh;
  background-color: $color-white;
  padding-bottom: 60px;
}
</style>