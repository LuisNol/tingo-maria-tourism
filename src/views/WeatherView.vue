<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { WEATHER } from '@/data'
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
  <div class="weather-container">
    <header class="header">
      <div class="container">
        <h1>🌦️ Clima</h1>
      </div>
    </header>

    <main class="container">
      <div class="weather-card">
        <div class="weather-main">
          <h2 class="city">{{ WEATHER.city }}</h2>
          <div class="temperature">
            <span class="temp-value">{{ WEATHER.temperature }}°</span>
            <span class="temp-unit">C</span>
          </div>
          <div class="condition">{{ WEATHER.condition }}</div>
        </div>

        <div class="weather-details">
          <div class="detail-item">
            <div class="detail-icon">💧</div>
            <div class="detail-info">
              <span class="detail-label">Humedad</span>
              <span class="detail-value">{{ WEATHER.humidity }}%</span>
            </div>
          </div>

          <div class="detail-item">
            <div class="detail-icon">🌧️</div>
            <div class="detail-info">
              <span class="detail-label">Lluvia</span>
              <span class="detail-value">{{ WEATHER.rain }}%</span>
            </div>
          </div>

          <div class="detail-item">
            <div class="detail-icon">☀️</div>
            <div class="detail-info">
              <span class="detail-label">Soleado</span>
              <span class="detail-value">10 h</span>
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

.weather-container {
  min-height: 100vh;
  background-color: $color-white;
  padding-bottom: 60px;
}

.weather-card {
  background: linear-gradient(135deg, $color-jungle 0%, $color-sky 100%);
  color: $color-white;
  border-radius: 20px;
  padding: 2rem;
  margin: 2rem 0;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.weather-main {
  text-align: center;
  margin-bottom: 2rem;
}

.city {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.temperature {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  margin-bottom: 0.5rem;
}

.temp-value {
  font-size: 4rem;
  font-weight: 700;
}

.temp-unit {
  font-size: 1.5rem;
  opacity: 0.9;
}

.condition {
  font-size: 1.25rem;
  opacity: 0.9;
}

.weather-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background-color: rgba(255, 255, 255, 0.15);
  padding: 1rem;
  border-radius: 12px;
}

.detail-icon {
  font-size: 1.5rem;
}

.detail-info {
  display: flex;
  flex-direction: column;
}

.detail-label {
  font-size: $font-size-sm;
  opacity: 0.9;
}

.detail-value {
  font-size: $font-size-base;
  font-weight: 600;
}
</style>