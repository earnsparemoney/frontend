import { createApp } from './main'
import { isPC } from './utils/utils'

export default context => {
  return new Promise((resolve, reject) => {
    const { app, router } = createApp()

    router.isPC = isPC(context.ua)
    router.push(context.url)

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()

      if (!matchedComponents.length) {
        return reject(new Error({ code: 404 }))
      }

      resolve(app)
    }, reject)
  })
}
