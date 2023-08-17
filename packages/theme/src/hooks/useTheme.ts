import { ThemeOption } from '@@/types'
import { useData } from 'vitepress'

export function useTheme() {
  const data = useData<ThemeOption>()
  return data.theme
}
