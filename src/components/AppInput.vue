<script setup lang="ts">
interface Props {
  placeholder?: string
  type?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Buscar...',
  type: 'text',
})
</script>

<template>
  <div class="input-wrapper">
    <input
      :type="type"
      :placeholder="placeholder"
      class="input"
    />
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/variables.scss';

.input-wrapper {
  position: relative;
}

.input-wrapper::before {
  content: '🔍';
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: $color-medium;
  pointer-events: none;
}
</style>