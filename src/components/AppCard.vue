<script setup lang="ts">
interface Props {
  image: string
  title: string
  rating?: number
  price?: string
  type: 'place' | 'hotel' | 'restaurant'
}

defineProps<Props>()
</script>

<template>
  <div class="card">
    <img :src="image" :alt="title" class="card-image" />
    <div class="card-content">
      <h3 class="card-title">{{ title }}</h3>
      <div v-if="rating" class="rating">
        <div class="stars">
          <span v-for="i in 5" :key="i" class="star">
            ★
          </span>
        </div>
        <span class="score">{{ rating }}</span>
      </div>
      <p v-if="price" class="card-price">{{ price }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/variables.scss';

.card-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.card-content {
  padding: 1rem;
}

.card-title {
  font-size: $font-size-lg;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: $color-dark;
}

.card-price {
  font-size: $font-size-base;
  color: $color-jungle;
  font-weight: 600;
  margin-top: 0.5rem;
}
</style>