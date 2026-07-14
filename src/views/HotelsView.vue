<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { HOTELS } from '@/data'
import AppCard from '@/components/AppCard.vue'
import NavigationBar from '@/components/NavigationBar.vue'
import { useTranslation } from '@/composables/useTranslation'

const { t } = useTranslation()

const router = useRouter()
const route = useRoute()

const searchQuery = ref('')

const filteredHotels = computed(() => {
  if (!searchQuery.value) return HOTELS
  return HOTELS.filter(hotel =>
    hotel.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    hotel.location.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const navItems = [
  { icon: '🏠', label: t.value.navigation.home, path: '/home' },
  { icon: '🏞️', label: t.value.navigation.places, path: '/places' },
  { icon: '🏨', label: t.value.navigation.hotels, path: '/hotels' },
  { icon: '🍽️', label: t.value.navigation.restaurants, path: '/restaurants' },
]

function navigateTo(path: string) {
  router.push(path)
}
</script>

<template>
  <div class="hotels-container">
    <header class="header">
      <div class="container">
        <h1>🏨 {{ t.hotels.title }}</h1>
      </div>
    </header>

    <main class="container">
      <div class="search-bar">
        <input
          type="text"
          v-model="searchQuery"
          :placeholder="t.hotels.search"
          class="input"
        />
      </div>

      <div class="item-grid">
        <AppCard
          v-for="hotel in filteredHotels"
          :key="hotel.id"
          :image="hotel.image"
          :title="hotel.name"
          :rating="hotel.rating"
          :price="hotel.price"
          type="hotel"
          :id="hotel.id"
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

.hotels-container {
  min-height: 100vh;
  background-color: $color-white;
  padding-bottom: 60px;
}
</style>