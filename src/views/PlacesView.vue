<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { PLACES } from '@/data'
import NavigationBar from '@/components/NavigationBar.vue'

const router = useRouter()
const route = useRoute()

const navItems = [
  { icon: '🏠', label: 'Inicio', path: '/home' },
  { icon: '🏞️', label: 'Lugares', path: '/places' },
  { icon: '🏨', label: 'Hoteles', path: '/hotels' },
  { icon: '🍽️', label: 'Restaurantes', path: '/restaurants' },
]

function goToDetail(id: string) {
  router.push(`/places/${id}`)
}

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
        <input type="text" placeholder="🔍 Buscar lugar..." class="input" />
      </div>

      <div class="item-grid">
        <div
          v-for="place in PLACES"
          :key="place.id"
          class="place-card"
          @click="goToDetail(place.id)"
        >
          <img :src="place.image" :alt="place.name" class="place-image" />
          <div class="place-info">
            <h3 class="place-name">{{ place.name }}</h3>
            <div class="rating">
              <div class="stars">
                <span v-for="i in 5" :key="i" class="star">
                  ★
                </span>
              </div>
              <span class="score">{{ place.rating }}</span>
            </div>
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

.places-container {
  min-height: 100vh;
  background-color: $color-white;
  padding-bottom: 60px;
}

.place-card {
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

.place-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.place-info {
  padding: 1rem;
}

.place-name {
  font-size: $font-size-lg;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: $color-dark;
}
</style>