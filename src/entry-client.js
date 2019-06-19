/* eslint-disable no-console */

import { createApp } from './main'

// window.Promise = Promise

const { app, router } = createApp()

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
