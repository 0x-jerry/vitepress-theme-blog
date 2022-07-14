import { watch } from 'vue'
import { createI18n } from 'vue-i18n'
import { locale } from '~/logic'
import { UserModule } from '~/types'

// Import i18n resources
// https://vitejs.dev/guide/features.html#glob-import
const messages = Object.fromEntries(
  Object.entries(import.meta.glob<any>('../../locales/*.y(a)?ml', { eager: true })).map(
    ([key, value]) => {
      const yaml = key.endsWith('.yaml')
      return [key.slice(14, yaml ? -5 : -4), value.default]
    },
  ),
)

export const install: UserModule = ({ app }) => {
  const i18n = createI18n({
    legacy: false,
    locale: locale.value,
    fallbackLocale: 'en',
    globalInjection: true,
    messages,
  })

  watch(
    () => i18n.global.locale.value,
    (newLocale) => {
      locale.value = newLocale
    },
  )

  app.use(i18n)
}
