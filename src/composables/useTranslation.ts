import { computed } from 'vue'
import { useAppStore } from '@/stores/appStore'
import { translations } from '@/i18n/translations'

export function useTranslation() {
  const store = useAppStore()
  
  const t = computed(() => translations[store.language])
  
  return { t }
}