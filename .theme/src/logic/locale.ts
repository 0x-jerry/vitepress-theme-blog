import { useLocalStorage } from '@vueuse/core'

export const locale = useLocalStorage('locale-language', 'zh')
