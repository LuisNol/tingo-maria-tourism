<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { HOTELS } from '@/data'
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
  <div class="hotels-container">
    <header class="header">
      <div class="container">
        <h1>🏨 Hoteles</h1>
      </div>
    </header>

    <main class="container">
      <div class="search-bar">
        <input type="text" placeholder="🔍 Buscar..." class="input" />
      </div>

      <div class="item-grid">
        <div
          v-for="hotel in HOTELS"
          :key="hotel.id"
          class="hotel-card"
        >
          <img :src="hotel.image" :alt="hotel.name" class="hotel-image" />
          <div class="hotel-info">
            <h3 class="hotel-name">{{ hotel.name }}</h3>
            <p class="hotel-location">{{ hotel.location }}</p>
            <div class="rating">
              <div class="stars">
                <span v-for="i in 5" :key="i" class="star">
                  ★
                </span>
              </div>
              <span class="score">{{ hotel.rating }}</span>
            </div>
            <p class="hotel-price">{{ hotel.price }}</p>
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

.hotels-container {
  min-height: 100vh;
  background-color: $color-white;
  padding-bottom: 60px;
}

.hotel-card {
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

.hotel-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.hotel-info {
  padding: 1rem;
}

.hotel-name {
  font-size: $font-size-lg;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: $color-dark;
}

.hotel-location {
  font-size: $font-size-sm;
  color: $color-medium;
  margin-bottom: 0.5rem;
}

.hotel-price {
  font-size: $font-size-base;
  color: $color-jungle;
  font-weight: 600;
  margin-top: 0.5rem;
}
</style>