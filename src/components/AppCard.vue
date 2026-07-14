<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

interface Props {
  image: string
  title: string
  rating?: number
  price?: string
  type: 'place' | 'hotel' | 'restaurant'
  id?: string
}

const props = withDefaults(defineProps<Props>(), {
  rating: 0,
  price: '',
})

const router = useRouter()

const routePrefix = computed(() => {
  switch (props.type) {
    case 'place': return '/places'
    case 'hotel': return '/hotels'
    case 'restaurant': return '/restaurants'
    default: return '/places'
  }
})

function goToDetail() {
  if (props.id) {
    router.push(`${routePrefix.value}/${props.id}`)
  }
}

const fullStars = computed(() => Math.floor(props.rating || 0))
const hasHalfStar = computed(() => (props.rating || 0) % 1 >= 0.5)
</script>

<template>
  <div class="card" @click="goToDetail">
    <img :src="image" :alt="title" class="card-image" />
    <div class="card-content">
      <h3 class="card-title">{{ title }}</h3>
      <div v-if="rating" class="rating">
        <div class="stars">
          <span
            v-for="i in 5"
            :key="i"
            class="star"
            :class="{
              'filled': i <= fullStars,
              'half': i === fullStars + 1 && hasHalfStar
            }"
          >
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

.card {
  background-color: $color-white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
  }
}

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

.stars {
  display: flex;
  gap: 0.125rem;

  .star {
    color: $color-sun;
    font-size: 1rem;
  }

  .star.filled {
    color: $color-sun;
  }

  .star.half {
    background: linear-gradient(90deg, $color-sun 50%, transparent 50%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
}

.score {
  font-weight: 600;
  color: $color-dark;
  margin-left: 0.5rem;
}
</style>