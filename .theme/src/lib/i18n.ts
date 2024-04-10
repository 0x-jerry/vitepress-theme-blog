import i18next from 'i18next'
import I18NextVue, { useTranslation } from 'i18next-vue'
import type { Plugin } from 'vue'

const locales = import.meta.glob('../../locales/*.yml', {
  eager: true,
})

export function useI18n() {
  return useTranslation()
}

export const install: Plugin = async (app) => {
  const _locales = Object.fromEntries(
    Object.entries(locales).map(([key, locale]) => {
      const _k = key.split('/').pop()?.replace('.yml', '')

      return [_k, locale]
    }),
  )
  console.log('i18n', _locales)

  await i18next.init({
    resources: {
      en: {
        translation: _locales.en,
      },
      zh: {
        translation: _locales.zh,
      },
    },
    fallbackLng: 'en',
  })
  app.use(I18NextVue, { i18next })
}
