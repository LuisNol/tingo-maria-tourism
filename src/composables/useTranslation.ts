import { ref, computed } from 'vue'
import { useAppStore } from '@/stores/appStore'
import { translations } from '@/i18n/index'

const currentLang = ref<'en' | 'es'>('es')

window.addEventListener('language-changed', (e: Event) => {
  currentLang.value = (e as CustomEvent<string>).detail as 'en' | 'es'
})

export function useTranslation() {
  const store = useAppStore()
  currentLang.value = store.language
  
  const t = computed(() => translations[currentLang.value])
  return { t }
}