import { useRouter } from 'vue-router'

export const navItems = [
  { icon: '🏠', label: 'Inicio', path: '/home' },
  { icon: '🏞️', label: 'Lugares', path: '/places' },
  { icon: '🏨', label: 'Hoteles', path: '/hotels' },
  { icon: '🍽️', label: 'Restaurantes', path: '/restaurants' },
]

export function useNavigation() {
  const router = useRouter()

  function navigateTo(path: string) {
    router.push(path)
  }

  return { navigateTo }
}