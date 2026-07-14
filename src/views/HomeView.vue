<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { PLACES } from '@/data'
import AppCard from '@/components/AppCard.vue'
import NavigationBar from '@/components/NavigationBar.vue'
import LanguageSelector from '@/components/LanguageSelector.vue'
import HeroBanner from '@/components/HeroBanner.vue'
import { useAppStore } from '@/stores/appStore'
import { translations } from '@/i18n/index'
import { navItems, useNavigation } from '@/composables/useNavigation'

const store = useAppStore()
const route = useRoute()

const state = reactive({
  lang: store.language as 'en' | 'es'
})

const updateLang = () => {
  state.lang = store.language
}

store.$subscribe(() => {
  updateLang()
})

const t = computed(() => translations[state.lang])

const searchQuery = ref('')

const filteredPlaces = computed(() => {
  if (!searchQuery.value) return PLACES.slice(0, 3)
  return PLACES.filter(place =>
    place.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    place.description.toLowerCase().includes(searchQuery.value.toLowerCase())
  ).slice(0, 3)
})

const categories = [
  { icon: '🏞️', label: 'Lugares', path: '/places' },
  { icon: '🏨', label: 'Hoteles', path: '/hotels' },
  { icon: '🍽️', label: 'Restaurantes', path: '/restaurants' },
  { icon: '🗺️', label: 'Clima', path: '/weather' },
  { icon: '🗓️', label: 'Planificador', path: '/planner' },
  { icon: '❤️', label: 'Favoritos', path: '/favorites' },
]

const { navigateTo } = useNavigation()
</script>

<template>
  <div class="home-container">
    <header class="header">
      <HeroBanner />
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
  position: relative;
  padding: 2rem 0;
}

.language-selector {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 2;
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