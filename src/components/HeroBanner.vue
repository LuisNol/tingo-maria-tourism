<script setup lang="ts">
import { WEATHER } from '@/data'

interface WeatherCard {
  icon: string
  label: string
  value: string
}

const weatherCards: WeatherCard[] = [
  { icon: '💧', label: 'Humedad', value: '82%' },
  { icon: '☁️', label: 'Lluvia', value: '10%' },
  { icon: '☀️', label: 'Soleado', value: '10 h' },
]
</script>

<template>
  <div class="hero-banner">
    <div class="hero-content">
      <h1 class="hero-title">Welcome to Tingo María</h1>
      <p class="hero-subtitle">Explore the Amazon paradise</p>
      <p class="hero-weather">Weather {{ WEATHER.temperature }}°C</p>
    </div>

    <div class="weather-cards">
      <div
        v-for="card in weatherCards"
        :key="card.label"
        class="weather-card"
      >
        <div class="card-icon">{{ card.icon }}</div>
        <div class="card-label">{{ card.label }}</div>
        <div class="card-value">{{ card.value }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.hero-banner {
  position: relative;
  min-height: 60vh;
  background-image: url('@/assets/portadaplaza.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 4rem 2rem;
  color: #ffffff;
}

.hero-banner::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
  z-index: 0;
}

.hero-content {
  position: relative;
  z-index: 1;
  margin-bottom: 2rem;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 0.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.hero-subtitle {
  font-size: 1.25rem;
  margin: 0 0 0.75rem;
  opacity: 0.95;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.hero-weather {
  font-size: 1.125rem;
  margin: 0;
  opacity: 0.9;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.weather-cards {
  position: relative;
  z-index: 1;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.weather-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 1.25rem 1.5rem;
  text-align: center;
  min-width: 100px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.card-icon {
  font-size: 1.75rem;
  margin-bottom: 0.25rem;
}

.card-label {
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
  opacity: 0.9;
}

.card-value {
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
}

@media (max-width: 768px) {
  .hero-banner {
    min-height: 50vh;
    padding: 3rem 1.5rem;
  }

  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .hero-weather {
    font-size: 1rem;
  }

  .weather-card {
    padding: 1rem 1.25rem;
    min-width: 85px;
  }

  .card-icon {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 1.75rem;
  }

  .weather-cards {
    gap: 0.75rem;
  }

  .weather-card {
    min-width: 80px;
    padding: 0.875rem 1rem;
  }
}
</style>