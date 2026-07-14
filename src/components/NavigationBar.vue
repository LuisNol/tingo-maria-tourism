<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

interface Props {
  items: Array<{ icon: string; label: string; path: string }>
  activePath: string
  position?: 'bottom' | 'left' | 'right' | 'top'
}

const props = withDefaults(defineProps<Props>(), {
  position: 'bottom',
})

const emit = defineEmits<{
  (e: 'navigate', path: string): void
}>()

function navigate(path: string) {
  emit('navigate', path)
}
</script>

<template>
  <nav class="nav-wrapper" :class="`nav--${position}`">
    <div class="nav-container">
      <button
        v-for="item in items"
        :key="item.label"
        class="nav-item"
        :class="{ active: item.path === activePath }"
        @click="navigate(item.path)"
      >
        <span class="nav-icon">{{ item.icon }}</span>
        <span class="nav-label">{{ item.label }}</span>
      </button>
    </div>
  </nav>
</template>

<style scoped lang="scss">
@import '@/styles/variables.scss';

.nav-wrapper {
  position: fixed;
  background-color: $color-white;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
}

.nav--bottom {
  bottom: 0;
  left: 0;
  right: 0;
}

.nav--top {
  top: 0;
  left: 0;
  right: 0;
  flex-direction: row;
}

.nav--left {
  top: 0;
  left: 0;
  bottom: 0;
  flex-direction: column;
  width: 60px;
}

.nav--right {
  top: 0;
  right: 0;
  bottom: 0;
  flex-direction: column;
  width: 60px;
}

.nav-container {
  display: flex;
  justify-content: space-around;
  gap: 0.5rem;
  padding: 1rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.75rem;
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: $font-size-sm;
  color: $color-medium;
  transition: $transition-normal;
  border-radius: 8px;

  &:hover {
    color: $color-jungle;
    background-color: $color-light;
  }

  &.active {
    color: $color-jungle;
    font-weight: 600;
  }
}

.nav-icon {
  font-size: 1.25rem;
}

.nav-label {
  font-size: $font-size-xs;
  white-space: nowrap;
}

.nav--left .nav-container,
.nav--right .nav-container {
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  gap: 1rem;
  padding: 2rem 0.5rem;
}

.nav--left .nav-label,
.nav--right .nav-label {
  font-size: 0.75rem;
}
</style>