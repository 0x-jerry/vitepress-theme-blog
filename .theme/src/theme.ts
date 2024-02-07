import { type Theme } from 'vitepress'
import Layout from './Layout.vue'
import { createI18n } from './lib/i18n'
import { locale } from './logic'
import messages from '@intlify/unplugin-vue-i18n/messages'

import 'heti'
import 'normalize.css'
import './styles/main.less'
import 'uno.css'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

export const theme: Theme = {
  Layout,
  NotFound: () => 'custom 404', // <- this is a Vue 3 functional component
  enhanceApp({ app, router, siteData }) {
    const i18n = createI18n({
      legacy: false,
      locale: locale.value,
      fallbackLocale: 'en',
      globalInjection: true,
      messages,
    })

    app.use(i18n)

    // app is the Vue 3 app instance from `createApp()`. router is VitePress'
    // custom router. `siteData`` is a `ref`` of current site-level metadata.
  },
}
