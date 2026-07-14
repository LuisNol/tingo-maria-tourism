<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { PLACES } from '@/data'
import { useAppStore } from '@/stores/appStore'
import AppButton from '@/components/AppButton.vue'
import NavigationBar from '@/components/NavigationBar.vue'

const route = useRoute()
const router = useRouter()
const store = useAppStore()

const place = computed(() => {
  const id = route.params.id as string
  return PLACES.find(p => p.id === id) || null
})

const navItems = [
  { icon: '🏠', label: 'Inicio', path: '/home' },
  { icon: '🏞️', label: 'Lugares', path: '/places' },
  { icon: '🏨', label: 'Hoteles', path: '/hotels' },
  { icon: '🍽️', label: 'Restaurantes', path: '/restaurants' },
]

function goBack() {
  router.back()
}

function toggleFavorite() {
  if (place.value) {
    store.toggleFavorite({ id: place.value.id, type: 'place' })
  }
}

function isFavorite() {
  if (!place.value) return false
  return store.isFavorite(place.value.id, 'place')
}

function navigateTo(path: string) {
  router.push(path)
}
</script>

<template>
  <div v-if="place" class="detail-container">
    <div class="detail-image">
      <img :src="place.image" :alt="place.name" />
      <button class="back-btn" @click="goBack">←</button>
    </div>

    <div class="container">
      <div class="detail-content">
        <h1 class="detail-title">{{ place.name }}</h1>

        <div class="rating">
          <div class="stars">
            <span v-for="i in 5" :key="i" class="star">
              ★
            </span>
          </div>
          <span class="score">{{ place.rating }}</span>
        </div>

        <p class="description">{{ place.description }}</p>

        <div class="info-grid">
          <div class="info-item">
            <strong>Horario:</strong>
            <p>{{ place.hours }}</p>
          </div>
          <div class="info-item">
            <strong>Precio:</strong>
            <p>{{ place.price }}</p>
          </div>
          <div class="info-item">
            <strong>Cómo llegar:</strong>
            <p>{{ place.howToReach }}</p>
          </div>
        </div>

        <div class="actions">
          <AppButton type="primary">
            🎧 Escuchar guía
          </AppButton>
          <AppButton type="secondary">
            🗺️ Ver mapa
          </AppButton>
          <AppButton type="yellow" :class="{ 'favorited': isFavorite() }" @click="toggleFavorite">
            ❤️ {{ isFavorite() ? 'Quitar de favoritos' : 'Añadir a favoritos' }}
          </AppButton>
          <AppButton type="outline">
            📤 Compartir
          </AppButton>
        </div>
      </div>
    </div>

    <NavigationBar
      :items="navItems"
      :active-path="route.path"
      @navigate="navigateTo"
    />
  </div>

  <div v-else class="not-found">
    <h2>Lugar no encontrado</h2>
    <AppButton @click="goBack">← Volver</AppButton>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/variables.scss';

.detail-container {
  min-height: 100vh;
  background-color: $color-white;
  padding-bottom: 60px;
}

.detail-image {
  position: relative;
  height: 300px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.back-btn {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background-color: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: $transition-normal;

  &:hover {
    background-color: $color-white;
  }
}

.detail-content {
  padding: 2rem 0;
}

.detail-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: $color-dark;
}

.description {
  font-size: $font-size-base;
  line-height: 1.6;
  color: $color-medium;
  margin-bottom: 1.5rem;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.info-item {
  background-color: $color-light;
  padding: 1rem;
  border-radius: 8px;

  strong {
    display: block;
    margin-bottom: 0.25rem;
    color: $color-dark;
  }

  p {
    margin: 0;
    color: $color-medium;
  }
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
}

.favorited {
  background-color: $color-jungle !important;
}

.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  text-align: center;
}
</style>