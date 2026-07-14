<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { PLACES } from '@/data'
import AppButton from '@/components/AppButton.vue'
import NavigationBar from '@/components/NavigationBar.vue'
import { navItems, useNavigation } from '@/composables/useNavigation'

const route = useRoute()
const router = useRouter()

const place = computed(() => {
  const id = route.params.id as string
  return PLACES.find(p => p.id === id) || null
})

const isPlaying = ref(false)
const audio = ref<HTMLAudioElement | null>(null)

const audioSrc = computed(() => {
  if (!place.value) return ''
  return place.value.guideUrl?.replace('https://example.com/guide/', 'https://example.com/audio/') || ''
})

onMounted(() => {
  if (audioSrc.value) {
    audio.value = new Audio(audioSrc.value)
  }
})

function togglePlay() {
  if (!audio.value) return
  
  if (isPlaying.value) {
    audio.value.pause()
    isPlaying.value = false
  } else {
    audio.value.play()
    isPlaying.value = true
    audio.value.onended = () => {
      isPlaying.value = false
    }
  }
}

function goBack() {
  router.back()
}

const { navigateTo } = useNavigation()
</script>

<template>
  <div v-if="place" class="audio-guide-container">
    <header class="header">
      <div class="container">
        <button class="back-btn" @click="goBack">←</button>
        <h1>🎧 Guía Virtual</h1>
      </div>
    </header>

    <main class="container">
      <div class="guide-card">
        <img :src="place.image" :alt="place.name" class="guide-image" />
        <h2 class="guide-title">{{ place.name }}</h2>
        <p class="guide-description">{{ place.description }}</p>
        
        <div class="player-section">
          <AppButton type="primary" @click="togglePlay">
            {{ isPlaying ? '⏸️ Pausar' : '▶️ Escuchar' }}
          </AppButton>
          <div v-if="isPlaying" class="playing-indicator">
            <span class="pulse">●</span> Reproduciendo...
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

  <div v-else class="not-found">
    <h2>Lugar no encontrado</h2>
    <AppButton @click="goBack">← Volver</AppButton>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/variables.scss';

.audio-guide-container {
  min-height: 100vh;
  background-color: $color-white;
  padding-bottom: 60px;
}

.header {
  background: linear-gradient(135deg, $color-jungle 0%, $color-sky 100%);
  color: $color-white;
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 10;
}

.header .container {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.back-btn {
  background: none;
  border: none;
  color: $color-white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: $transition-normal;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
}

.guide-card {
  background-color: $color-white;
  border-radius: 16px;
  padding: 2rem;
  margin: 2rem 0;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.guide-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 1.5rem;
}

.guide-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: $color-dark;
}

.guide-description {
  font-size: $font-size-base;
  color: $color-medium;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.player-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.playing-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: $color-jungle;
  font-weight: 600;
}

.pulse {
  animation: pulse 1s infinite;
  color: $color-jungle;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
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