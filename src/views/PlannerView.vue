<script setup lang="ts">
import { ref, computed, unref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppButton from '@/components/AppButton.vue'
import NavigationBar from '@/components/NavigationBar.vue'
import { useTranslation } from '@/composables/useTranslation'

const { t } = useTranslation()

const router = useRouter()
const route = useRoute()

const selectedDays = ref<number | null>(null)

const dayOptions = [1, 2, 3, 4]

const itineraries = {
  1: [
    { day: 'Day 1', activities: ['Cueva de las Lechuzas', 'Bella Durmiente'] },
  ],
  2: [
    { day: 'Day 1', activities: ['Cueva de las Lechuzas', 'Bella Durmiente', 'Typical lunch'] },
    { day: 'Day 2', activities: ['Laguna Los Milagros', 'Catarata Santa Carmen'] },
  ],
  3: [
    { day: 'Day 1', activities: ['Cueva de las Lechuzas', 'Bella Durmiente', 'Typical lunch'] },
    { day: 'Day 2', activities: ['Laguna Los Milagros', 'Catarata Santa Carmen', 'National Park'] },
    { day: 'Day 3', activities: ['Hotel rest', 'Local shopping', 'Farewell dinner'] },
  ],
  4: [
    { day: 'Day 1', activities: ['Cueva de las Lechuzas', 'Bella Durmiente', 'Typical lunch'] },
    { day: 'Day 2', activities: ['Laguna Los Milagros', 'Catarata Santa Carmen', 'National Park'] },
    { day: 'Day 3', activities: ['Hotel rest', 'Local shopping', 'Farewell dinner'] },
    { day: 'Day 4', activities: ['Local communities visit', 'Traditional market', 'Return'] },
  ],
}

const selectedItinerary = computed(() => {
  if (selectedDays.value === null) return null
  return itineraries[selectedDays.value as keyof typeof itineraries]
})

const navItems = [
  { icon: '🏠', label: 'Home', path: '/home' },
  { icon: '🏞️', label: 'Places', path: '/places' },
  { icon: '🏨', label: 'Hotels', path: '/hotels' },
  { icon: '🍽️', label: 'Restaurants', path: '/restaurants' },
]

function navigateTo(path: string) {
  router.push(path)
}

function createItinerary() {
  if (selectedDays.value !== null) {
    console.log('Itinerary created for', selectedDays.value, 'days')
  }
}
</script>

<template>
  <div class="planner-container">
    <header class="header">
      <div class="container">
        <h1>🗓️ Planner</h1>
      </div>
    </header>

    <main class="container">
      <section class="question-section">
        <h2>How many days will you stay?</h2>
        <p class="question-text">Select the duration of your visit</p>

        <div class="options-grid">
          <button
            v-for="days in dayOptions"
            :key="days"
            class="day-option"
            :class="{ active: selectedDays === days }"
            @click="selectedDays = days"
          >
            <span class="day-number">{{ days }} day{{ days > 1 ? 's' : '' }}</span>
          </button>
        </div>

        <AppButton
          type="primary"
          :disabled="!selectedDays"
          @click="createItinerary"
        >
          Create itinerary
        </AppButton>
      </section>

      <section v-if="selectedItinerary" class="itinerary-section">
        <h2>Your suggested plan</h2>
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