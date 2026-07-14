<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useAppStore } from '@/stores/appStore'

const store = useAppStore()
const isOpen = ref(false)

const languages = ['English', 'Español']

const dropdownRef = ref<HTMLElement | null>(null)

function toggleDropdown() {
  isOpen.value = !isOpen.value
}

function selectLanguage(lang: string) {
  const langMap: Record<string, 'es' | 'en'> = {
    'Español': 'es',
    'English': 'en',
  }
  const code = langMap[lang] || 'es'
  store.setLanguage(code)
  isOpen.value = false
}

function handleClickOutside(event: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="language-selector" ref="dropdownRef" @click.stop>
    <button class="language-trigger" @click="toggleDropdown">
      <span>{{ store.language === 'en' ? 'English' : 'Español' }}</span>
      <span class="chevron" :class="{ 'up': isOpen }">▼</span>
    </button>

    <div v-if="isOpen" class="language-dropdown">
      <ul class="language-list">
        <li
          v-for="lang in languages"
          :key="lang"
          class="language-item"
          :class="{ active: (store.language === 'en' && lang === 'English') || (store.language === 'es' && lang === 'Español') }"
          @click="selectLanguage(lang)"
        >
          {{ lang }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.language-selector {
  position: relative;
  display: inline-block;
  z-index: 100;
}

.language-trigger {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  color: #212121;
  transition: all 0.2s ease;
  outline: none;
}

.language-trigger:hover {
  border-color: #bdbdbd;
}

.chevron {
  font-size: 0.7rem;
  color: #757575;
  transition: transform 0.2s ease;
}

.language-dropdown {
  position: absolute;
  top: 110%;
  right: 0;
  min-width: 120px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  border: 1px solid #e0e0e0;
  z-index: 100;
  margin-top: 0.5rem;
}

.language-list {
  list-style: none;
  margin: 0;
  padding: 0.5rem 0;
}

.language-item {
  padding: 0.6rem 1rem;
  text-align: left;
  color: #212121;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.85rem;
}

.language-item:hover {
  background-color: #f5f5f5;
}

.language-item:active {
  background-color: #f5f5f5;
}
</style>