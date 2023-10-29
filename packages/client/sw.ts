import { RouterName } from './src/router/types'

const CACHE_NAME = 'my-game-cache-v1'
const urlsToCache: string[] = [
  RouterName.main,
  RouterName.signIn,
  RouterName.signUp,
  RouterName.about,
  RouterName.error500,
  RouterName.forum,
  RouterName.forumTopicId,
  RouterName.leaderBoard,
  RouterName.others,
  RouterName.profile,
  RouterName.settings,
]

self.addEventListener('install', (event: any) => {
  event.waitUntil(
    (async () => {
      try {
        const cache = await caches.open(CACHE_NAME)
        await cache.addAll(urlsToCache)
      } catch (error) {
        console.error('Error during installation:', error)
      }
    })()
  )
})

self.addEventListener('fetch', (event: any) => {
  event.respondWith(
    (async () => {
      try {
        let response = await caches.match(event.request)
        if (response) {
          return response
        }

        response = await fetch(event.request)
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response
        }

        const responseToCache = response.clone()
        const cache = await caches.open(CACHE_NAME)
        cache.put(event.request, responseToCache)

        return response
      } catch (error) {
        console.error('Error during fetch:', error)
        throw error
      }
    })()
  )
})

self.addEventListener('activate', (event: any) => {
  const cacheWhitelist = [CACHE_NAME]

  event.waitUntil(
    (async () => {
      try {
        const cacheNames = await caches.keys()
        await Promise.all(
          cacheNames.map(async cacheName => {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              await caches.delete(cacheName)
            }
          })
        )
      } catch (error) {
        console.error('Error during activation:', error)
      }
    })()
  )
})
