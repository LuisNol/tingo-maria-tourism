<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppButton from '@/components/AppButton.vue'
import NavigationBar from '@/components/NavigationBar.vue'

const router = useRouter()
const route = useRoute()

const selectedDays = ref<number | null>(null)

const dayOptions = [1, 2, 3, 4]

const itineraries = {
  1: [
    { day: 'Día 1', activities: ['Cueva de las Lechuzas', 'Bella Durmiente'] },
  ],
  2: [
    { day: 'Día 1', activities: ['Cueva de las Lechuzas', 'Bella Durmiente', 'Almuerzo típico'] },
    { day: 'Día 2', activities: ['Laguna Los Milagros', 'Catarata Santa Carmen'] },
  ],
  3: [
    { day: 'Día 1', activities: ['Cueva de las Lechuzas', 'Bella Durmiente', 'Almuerzo típico'] },
    { day: 'Día 2', activities: ['Laguna Los Milagros', 'Catarata Santa Carmen', 'Parque Nacional'] },
    { day: 'Día 3', activities: ['Descanso en hotel', 'Compras locales', 'Cena de despedida'] },
  ],
  4: [
    { day: 'Día 1', activities: ['Cueva de las Lechuzas', 'Bella Durmiente', 'Almuerzo típico'] },
    { day: 'Día 2', activities: ['Laguna Los Milagros', 'Catarata Santa Carmen', 'Parque Nacional'] },
    { day: 'Día 3', activities: ['Descanso en hotel', 'Compras locales', 'Cena de despedida'] },
    { day: 'Día 4', activities: ['Visita a comunidades locales', 'Mercado tradicional', 'Regreso'] },
  ],
}

const selectedItinerary = computed(() => {
  if (selectedDays.value === null) return null
  return itineraries[selectedDays.value as keyof typeof itineraries]
})

const navItems = [
  { icon: '🏠', label: 'Inicio', path: '/home' },
  { icon: '🏞️', label: 'Lugares', path: '/places' },
  { icon: '🏨', label: 'Hoteles', path: '/hotels' },
  { icon: '🍽️', label: 'Restaurantes', path: '/restaurants' },
]

function navigateTo(path: string) {
  router.push(path)
}

function createItinerary() {
  if (selectedDays.value !== null) {
    console.log('Itinerario creado para', selectedDays.value, 'días')
  }
}
</script>

<template>
  <div class="planner-container">
    <header class="header">
      <div class="container">
        <h1>🗓️ Planificador</h1>
      </div>
    </header>

    <main class="container">
      <section class="question-section">
        <h2>¿Cuántos días estarás?</h2>
        <p class="question-text">Selecciona la duración de tu visita</p>

        <div class="options-grid">
          <button
            v-for="days in dayOptions"
            :key="days"
            class="day-option"
            :class="{ active: selectedDays === days }"
            @click="selectedDays = days"
          >
            <span class="day-number">{{ days }} día{{ days > 1 ? 's' : '' }}</span>
          </button>
        </div>

        <AppButton
          type="primary"
          :disabled="!selectedDays"
          @click="createItinerary"
        >
          Crear itinerario
        </AppButton>
      </section>

      <section v-if="selectedItinerary" class="itinerary-section">
        <h2>Tu plan sugerido</h2>
        <div
          v-for="item in selectedItinerary"
          :key="item.day"
          class="day-plan"
        >
          <h3 class="day-title">{{ item.day }}</h3>
          <ul class="activities-list">
            <li
              v-for="activity in item.activities"
              :key="activity"
              class="activity-item"
            >
              {{ activity }}
            </li>
          </ul>
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

.planner-container {
  min-height: 100vh;
  background-color: $color-white;
  padding-bottom: 60px;
}

.question-section {
  text-align: center;
  padding: 2rem 0;
}

.question-section h2 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: $color-dark;
}

.question-text {
  color: $color-medium;
  margin-bottom: 2rem;
}

.options-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.day-option {
  padding: 1.5rem 1rem;
  border: 2px solid $color-light;
  border-radius: 12px;
  cursor: pointer;
  transition: $transition-normal;
  background-color: $color-white;

  &:hover {
    border-color: $color-jungle;
  }

  &.active {
    border-color: $color-jungle;
    background-color: $color-jungle;
    color: $color-white;
  }
}

.day-number {
  font-size: 1.25rem;
  font-weight: 600;
}

.itinerary-section {
  margin-top: 2rem;
}

.itinerary-section h2 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: $color-dark;
}

.day-plan {
  background-color: $color-light;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1rem;
}

.day-title {
  font-size: $font-size-lg;
  font-weight: 600;
  margin-bottom: 1rem;
  color: $color-dark;
}

.activities-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.activity-item {
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  font-size: $font-size-base;
  color: $color-medium;

  &:last-child {
    border-bottom: none;
  }
}
</style>