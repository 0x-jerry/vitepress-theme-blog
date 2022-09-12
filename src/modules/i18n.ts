import { watch } from 'vue'
import { createI18n } from 'vue-i18n'
import { locale } from '@/logic'
import { UserModule } from '@/types'
import messages from '@intlify/unplugin-vue-i18n/messages'

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
