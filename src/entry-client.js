
/* eslint-disable no-console */

import { createApp } from './main'
import { isPC } from './utils/utils'

const { app, router } = createApp()

router.isPC = isPC()

router.onReady(() => {
  app.$mount('#app')
})

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/serviceWorker.js').then(registration => {
      console.log('SW registered: ', registration)
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError)
    })
  })
}
