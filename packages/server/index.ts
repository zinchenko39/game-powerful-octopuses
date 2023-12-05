import dotenv from 'dotenv'
import cors from 'cors'
import * as fs from 'fs'
import * as path from 'path'
import cookieParser, { CookieParseOptions } from 'cookie-parser'
import { createProxyMiddleware } from 'http-proxy-middleware'
import helmet from 'helmet'

dotenv.config()

import express from 'express'
import { sequelize } from './db'
import { createServer as createViteServer } from 'vite'
import type { ViteDevServer } from 'vite'
import jsesc from 'jsesc'
import router from './routes/router'
import checkAuth from './middleware/checkAuth'
import { YANDEX_API_PATH, YANDEX_URL } from './constants'

const isDev = () => process.env.NODE_ENV === 'development'
const CLIENT_PATH = path.resolve(__dirname + '/../client')
const CLIENT_DIST_PATH = path.join(CLIENT_PATH, 'dist')
const CLIENT_DIST_SSR_PATH = path.resolve(
  __dirname + '/../client/dist-ssr/client.cjs'
)

async function startServer() {
  const app = express()

  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  )

  app.use(cookieParser() as (options: CookieParseOptions) => void)

  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          'https://cdn.jsdelivr.net/npm/@mui/material@5.2.5/dist/',
        ],
      },
    })
  )

  app.use(
    YANDEX_API_PATH,
    createProxyMiddleware({
      changeOrigin: true,
      cookieDomainRewrite: {
        '*': '',
      },
      target: YANDEX_URL,
    })
  )

  app.use(express.json())

  const port = Number(process.env.SERVER_PORT) || 3001

  await sequelize.authenticate()
  await sequelize.sync()

  app.use('/api/v1', async (req, res, next) => {
    await checkAuth(req, res, next)
  })

  app.use('/api/v1', router)

  // let viteServer: ViteDevServer

  // if (!isDev()) {
  //   app.use('/assets', express.static(path.resolve(CLIENT_DIST_PATH, 'assets')))
  // } else {
  //   viteServer = await createViteDevServer(CLIENT_PATH)
  //   app.use(viteServer.middlewares)
  // }

  // app.use('*', async (req, res, next) => {
  //   if (req.originalUrl.indexOf('.') !== -1) {
  //     return
  //   }

  //   if (req.originalUrl.includes('/api/v1')) return

  //   const isAuth = false;

  //   if (!isAuth) {
  //     const url = req.originalUrl;

  //     console.log(url, ' urlaaaaaaaaaaa?')

  //     if (url !== '/') {
  //       res.redirect('/');
  //     }
  //   }

  //   // await checkAuth(req, res, next)

  //   try {
  //     console.log(1)
  //     const html = await getSSRIndexHTML(req, res, viteServer)

  //     res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
  //   } catch (e) {
  //     console.log(2)
  //     if (viteServer) viteServer.ssrFixStacktrace(e as Error)
  //     next(e)
  //   }
  // })

  // console.log(3)

  // if (!isDev()) {
  //   console.log(4)
  //   app.use(
  //     '/',
  //     express.static(CLIENT_DIST_PATH, { fallthrough: true, index: false })
  //   )
  // }

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
  })
}

interface SSRModule {
  render: (url: string) => Promise<[Record<string, unknown>, string]>
}

async function getSSRIndexHTML(
  req: express.Request,
  res: express.Response,
  viteServer: ViteDevServer
) {
  const url = req.originalUrl
  const rootPath = isDev() ? CLIENT_PATH : CLIENT_DIST_PATH

  // CheckAuth запишет пользователя в res.locals.user
  //const user = res.locals.user

  let template = fs.readFileSync(path.resolve(rootPath, 'index.html'), 'utf-8')

  let ssrModule: SSRModule

  if (isDev()) {
    template = await viteServer.transformIndexHtml(url, template)
    ssrModule = (await viteServer.ssrLoadModule(
      path.resolve(rootPath, 'ssr.tsx')
    )) as SSRModule
  } else {
    ssrModule = await import(CLIENT_DIST_SSR_PATH)
  }

  const [initialState, appHtml] = await ssrModule.render(url)

  const initStateSerialized = jsesc(JSON.stringify(initialState), {
    json: true,
    isScriptContext: true,
  })

  const html = template
    .replace(`<!--ssr-outlet-->`, appHtml)
    .replace('`<!--store-data-->`', initStateSerialized)

  return html
}

async function createViteDevServer(srcPath: string) {
  const viteServer = await createViteServer({
    server: { middlewareMode: true },
    root: srcPath,
    appType: 'custom',
  })

  return viteServer
}

startServer()
