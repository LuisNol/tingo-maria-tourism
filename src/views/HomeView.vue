<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { PLACES, WEATHER } from '@/data'
import AppCard from '@/components/AppCard.vue'
import NavigationBar from '@/components/NavigationBar.vue'
import LanguageSelector from '@/components/LanguageSelector.vue'
import { useTranslation } from '@/composables/useTranslation'

const { t } = useTranslation()

const router = useRouter()
const route = useRoute()

const searchQuery = ref('')

const filteredPlaces = computed(() => {
  if (!searchQuery.value) return PLACES.slice(0, 3)
  return PLACES.filter(place =>
    place.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    place.description.toLowerCase().includes(searchQuery.value.toLowerCase())
  ).slice(0, 3)
})

const categories = [
  { icon: '🏞️', label: t.value.navigation.places, path: '/places' },
  { icon: '🏨', label: t.value.navigation.hotels, path: '/hotels' },
  { icon: '🛏️', label: t.value.navigation.hotels, path: '/hotels' },
  { icon: '🍽️', label: t.value.navigation.restaurants, path: '/restaurants' },
  { icon: '🗺️', label: t.value.navigation.weather, path: '/weather' },
  { icon: '🎧', label: '🎧', path: '/places' },
  { icon: '🗓️', label: t.value.navigation.planner, path: '/planner' },
  { icon: '❤️', label: t.value.navigation.favorites, path: '/favorites' },
]

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
  <div class="home-container">
    <header class="header">
      <div class="container">
        <h1>{{ t.home.welcome }}</h1>
        <p>{{ t.home.location }}</p>
        <p class="weather">{{ t.home.weather }} {{ WEATHER.temperature }}°C</p>
      </div>
      <div class="language-selector">
        <LanguageSelector />
      </div>
    </header>

    <main class="container">
      <div class="search-bar">
        <input
          type="text"
          v-model="searchQuery"
          :placeholder="t.home.search"
          class="input"
        />
      </div>

      <section class="categories">
        <h2>{{ t.home.explore }}</h2>
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
        <h2>{{ t.home.featured }}</h2>
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
  position: relative;
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

.language-selector {
  position: absolute;
  top: 1rem;
  right: 1rem;
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