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

.input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid $color-light;
  border-radius: 8px;
  font-size: 1rem;
  background-color: $color-white;
  transition: border-color 0.3s ease;

  &::placeholder {
    color: $color-medium;
  }

  &:focus {
    outline: none;
    border-color: $color-jungle;
  }
}
</style>