<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isVisible = ref(true)

onMounted(() => {
  setTimeout(() => {
    isVisible.value = false
    router.replace('/home')
  }, 3000)
})
</script>

<template>
  <div class="splash-container">
    <div class="splash-content" v-show="isVisible">
      <div class="logo">🌿</div>
      <h1 class="title">EXPLORA TINGO</h1>
      <p class="subtitle">Descubre Tingo María</p>
      <div class="loading">
        <div class="spinner"></div>
        <p>Cargando...</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/variables.scss';

.splash-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, $color-jungle 0%, $color-sky 100%);
  color: $color-white;
}

.splash-content {
  text-align: center;
  padding: 2rem;
}

.logo {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  letter-spacing: 2px;
}

.subtitle {
  font-size: 1.25rem;
  opacity: 0.9;
  margin-bottom: 2rem;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: $color-white;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>