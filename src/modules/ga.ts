import { UserModule } from '~/types'
import VueGtag, { trackRouter } from 'vue-gtag-next'

export const install: UserModule = ({ isClient, app, router }) => {
  if (!isClient) return

  app.use(VueGtag, {
    property: {
      id: 'UA-101492756-1',
    },
  })

  trackRouter(router)
}
