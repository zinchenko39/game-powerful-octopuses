// делаем доступ к файлу process.env.NODE_ENV
import dotenv from 'dotenv'

dotenv.config()

// cors - для межсетевого взаимодействия
import cors from 'cors'
// express -
import express from 'express'
// vite - сборщик
import type { ViteDevServer } from 'vite'

// ???
import { createClientAndConnect } from './db'

// cookie-parser - делаем доступным объект с куками в req.cookies
import cookieParser, { CookieParseOptions } from 'cookie-parser'

// ???
import * as path from 'path'
import checkAuth from './middleware/checkAuth'
import { createViteDevServer } from './create-vite-dev-server'
import { getSSRIndexHTML } from './get-ssr-index-html'

const PORT = Number(process.env.SERVER_PORT) || 3001
const isDev = process.env.NODE_ENV === 'development'

// определяем путь до папки 'client'
const CLIENT_PATH = path.resolve(__dirname + '/../client')
const CLIENT_DIST_PATH = path.join(CLIENT_PATH, 'dist')

createClientAndConnect()

// app.get('/', (_, res) => {
//   res.json('👋 Howdy from the server :)')
// })

// app.listen(port, () => {
//   console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
// })

async function startServer() {
  const app = express()

  app.use(cookieParser() as (options: CookieParseOptions) => void)

  app.use('*', req => {
    console.log(req, ' cookies')
  })

  // переадресация запросов
  // app.use(
  //   '/api/v2',
  //   createProxyMiddleware({
  //     changeOrigin: true,
  //     cookieDomainRewrite: {
  //       '*': '',
  //     },
  //     target: 'https://ya-praktikum.tech',
  //   })
  // )

  let viteServer: ViteDevServer

  if (!isDev) {
    app.use('/assets', express.static(path.resolve(CLIENT_DIST_PATH, 'assets')))
  }

  if (isDev) {
    viteServer = await createViteDevServer(CLIENT_PATH)

    app.use(viteServer.middlewares)
  }

  app.use(cors())

  // app.get('/', (_, res) => {
  //   res.json('👋 Howdy from the server :)')
  // })

  app.use(['/forum'], async (req, res, next) => {
    await checkAuth(req, res, next)
    if (!res.locals.user) {
      res.status(401).send('Not authorized')
    }
  })

  app.use('*', async (req, res, next) => {
    if (req.originalUrl.indexOf('.') !== -1) {
      return
    }

    await checkAuth(req, res, next)

    try {
      const html = await getSSRIndexHTML(req, res, viteServer)

      req.headers = { ...(req.headers || {}), 'Content-Type': 'text/html' }

      // console.log(html, ' html')

      res.status(200).end(html)
    } catch (e) {
      if (viteServer) viteServer.ssrFixStacktrace(e as Error)
      next(e)
    }
  })

  app.listen(PORT, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${PORT}`)
  })
}

startServer()
