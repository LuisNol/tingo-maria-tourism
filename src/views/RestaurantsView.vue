<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { RESTAURANTS } from '@/data'
import AppCard from '@/components/AppCard.vue'
import NavigationBar from '@/components/NavigationBar.vue'
import { useTranslation } from '@/composables/useTranslation'

const { t } = useTranslation()

const router = useRouter()
const route = useRoute()

const searchQuery = ref('')

const filteredRestaurants = computed(() => {
  if (!searchQuery.value) return RESTAURANTS
  return RESTAURANTS.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    restaurant.cuisine.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    restaurant.location.toLowerCase().includes(searchQuery.value.toLowerCase())
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
  <div class="restaurants-container">
    <header class="header">
      <div class="container">
        <h1>🍽️ {{ t.restaurants.title }}</h1>
      </div>
    </header>

    <main class="container">
      <div class="search-bar">
        <input
          type="text"
          v-model="searchQuery"
          :placeholder="t.restaurants.search"
          class="input"
        />
      </div>

      <div class="item-grid">
        <AppCard
          v-for="restaurant in filteredRestaurants"
          :key="restaurant.id"
          :image="restaurant.image"
          :title="restaurant.name"
          :rating="restaurant.rating"
          type="restaurant"
          :id="restaurant.id"
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

.restaurants-container {
  min-height: 100vh;
  background-color: $color-white;
  padding-bottom: 60px;
}
</style>