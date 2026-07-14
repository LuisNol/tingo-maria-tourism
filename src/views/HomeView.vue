<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { PLACES, WEATHER } from '@/data'
import AppCard from '@/components/AppCard.vue'
import NavigationBar from '@/components/NavigationBar.vue'

const router = useRouter()
const route = useRoute()

const categories = [
  { icon: '🏞️', label: 'Lugares turísticos', path: '/places' },
  { icon: '🏨', label: 'Hoteles', path: '/hotels' },
  { icon: '🛏️', label: 'Hospedajes' },
  { icon: '🍽️', label: 'Restaurantes', path: '/restaurants' },
  { icon: '🗺️', label: 'Mapa' },
  { icon: '🎧', label: 'Guía Virtual' },
  { icon: '🗓️', label: 'Planificador', path: '/planner' },
  { icon: '🌍', label: 'Idioma', path: '/language' },
  { icon: '❤️', label: 'Favoritos', path: '/favorites' },
]

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
  <div class="home-container">
    <header class="header">
      <div class="container">
        <h1>👋 Bienvenido</h1>
        <p>📍 Tingo María</p>
        <p class="weather">🌤️ {{ WEATHER.temperature }}°C</p>
      </div>
    </header>

    <main class="container">
      <div class="search-bar">
        <input type="text" placeholder="🔍 Buscar..." class="input" />
      </div>

      <section class="categories">
        <h2>Explorar</h2>
        <div class="categories-grid">
          <button
            v-for="category in categories"
            :key="category.label"
            class="category-btn"
            @click="navigateTo(category.path)"
          >
            <span class="category-icon">{{ category.icon }}</span>
            <span>{{ category.label }}</span>
          </button>
        </div>
      </section>

      <section class="featured-places">
        <h2>Lugares destacados</h2>
        <div class="item-grid">
          <AppCard
            v-for="place in PLACES.slice(0, 3)"
            :key="place.id"
            :image="place.image"
            :title="place.name"
            :rating="place.rating"
            :price="place.price"
            type="place"
          />
        </div>
      </section>
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

.home-container {
  min-height: 100vh;
  background-color: $color-white;
}

.header {
  background: linear-gradient(135deg, $color-jungle 0%, $color-sky 100%);
  color: $color-white;
  padding: 2rem 0;
}

.header h1 {
  font-size: 2rem;
  margin-bottom: 0.25rem;
}

.header p {
  opacity: 0.9;
  font-size: 1rem;
}

.weather {
  font-size: 1.25rem;
  margin-top: 0.5rem;
}

.search-bar {
  margin: 1.5rem 0;
}

.categories {
  margin-bottom: 2rem;
}

.categories h2 {
  font-size: $font-size-2xl;
  margin-bottom: 1rem;
  color: $color-dark;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
}

.category-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 1rem;
  background-color: $color-light;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: $transition-normal;
  text-align: center;

  &:hover {
    background-color: $color-jungle;
    color: $color-white;
  }

  .category-icon {
    font-size: 2rem;
  }
}

.featured-places h2 {
  font-size: $font-size-2xl;
  margin-bottom: 1rem;
  color: $color-dark;
}

.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: $color-white;
  padding: 1rem;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-around;
  gap: 0.5rem;
}
</style>