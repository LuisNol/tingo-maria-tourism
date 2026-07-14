<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useAppStore } from '@/stores/appStore'
import NavigationBar from '@/components/NavigationBar.vue'

const store = useAppStore()
const router = useRouter()
const route = useRoute()

const languages = [
  { code: 'es', flag: '🇪🇸', name: 'Español' },
  { code: 'en', flag: '🇺🇸', name: 'English' },
]

const navItems = [
  { icon: '🏠', label: 'Inicio', path: '/home' },
  { icon: '🏞️', label: 'Lugares', path: '/places' },
  { icon: '🏨', label: 'Hoteles', path: '/hotels' },
  { icon: '🍽️', label: 'Restaurantes', path: '/restaurants' },
]

function setLanguage(lang: 'es' | 'en') {
  store.setLanguage(lang)
}

function navigateTo(path: string) {
  router.push(path)
}
</script>

<template>
  <div class="language-container">
    <header class="header">
      <div class="container">
        <h1>🌍 Idioma</h1>
      </div>
    </header>

    <main class="container">
      <section class="language-section">
        <h2>Selecciona un idioma</h2>

        <div class="language-options">
          <button
            v-for="lang in languages"
            :key="lang.code"
            class="language-option"
            :class="{ active: store.language === lang.code }"
            @click="setLanguage(lang.code as 'es' | 'en')"
          >
            <span class="flag">{{ lang.flag }}</span>
            <span class="name">{{ lang.name }}</span>
            <span v-if="store.language === lang.code" class="check">✓</span>
          </button>
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

.language-container {
  min-height: 100vh;
  background-color: $color-white;
  padding-bottom: 60px;
}

.language-section {
  text-align: center;
  padding: 2rem 0;
}

.language-section h2 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: $color-dark;
}

.language-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;
  margin: 0 auto;
}

.language-option {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1.5rem;
  background-color: $color-light;
  border: 2px solid transparent;
  border-radius: 12px;
  cursor: pointer;
  transition: $transition-normal;

  &:hover {
    border-color: $color-jungle;
  }

  &.active {
    border-color: $color-jungle;
    background-color: $color-jungle;
    color: $color-white;
  }
}

.flag {
  font-size: 2rem;
}

.name {
  font-size: 1.25rem;
  font-weight: 600;
}

.check {
  font-size: 1.5rem;
  margin-left: auto;
  opacity: 0;
  transition: opacity 0.3s ease;

  .active & {
    opacity: 1;
  }
}
</style>