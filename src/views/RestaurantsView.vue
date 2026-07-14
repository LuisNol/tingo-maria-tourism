<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { RESTAURANTS } from '@/data'
import NavigationBar from '@/components/NavigationBar.vue'

const router = useRouter()
const route = useRoute()

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
  <div class="restaurants-container">
    <header class="header">
      <div class="container">
        <h1>🍽️ Restaurantes</h1>
      </div>
    </header>

    <main class="container">
      <div class="search-bar">
        <input type="text" placeholder="🔍 Buscar..." class="input" />
      </div>

      <div class="item-grid">
        <div
          v-for="restaurant in RESTAURANTS"
          :key="restaurant.id"
          class="restaurant-card"
        >
          <img :src="restaurant.image" :alt="restaurant.name" class="restaurant-image" />
          <div class="restaurant-info">
            <h3 class="restaurant-name">{{ restaurant.name }}</h3>
            <p class="restaurant-cuisine">{{ restaurant.cuisine }}</p>
            <div class="rating">
              <div class="stars">
                <span v-for="i in 5" :key="i" class="star">
                  ★
                </span>
              </div>
              <span class="score">{{ restaurant.rating }}</span>
            </div>
            <p class="restaurant-location">{{ restaurant.location }}</p>
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

.restaurants-container {
  min-height: 100vh;
  background-color: $color-white;
  padding-bottom: 60px;
}

.restaurant-card {
  display: flex;
  flex-direction: column;
  background-color: $color-white;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: $transition-normal;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
  }
}

.restaurant-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.restaurant-info {
  padding: 1rem;
}

.restaurant-name {
  font-size: $font-size-lg;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: $color-dark;
}

.restaurant-cuisine {
  font-size: $font-size-sm;
  color: $color-medium;
  margin-bottom: 0.5rem;
}

.restaurant-location {
  font-size: $font-size-sm;
  color: $color-medium;
}
</style>