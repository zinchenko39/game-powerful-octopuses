import dotenv from 'dotenv'
import cors from 'cors'
import * as fs from 'fs'
import * as path from 'path'

dotenv.config()

import express from 'express'
import { sequelize } from './db'
import { createServer as createViteServer } from 'vite'
import type { ViteDevServer } from 'vite'
import jsesc from 'jsesc'
import router from './routes/router'

const isDev = () => process.env.NODE_ENV === 'development'
const CLIENT_PATH = path.resolve(__dirname + '/../client')
const CLIENT_DIST_PATH = path.join(CLIENT_PATH, 'dist')
const CLIENT_DIST_SSR_PATH = path.resolve(
  __dirname + '/../client/dist-ssr/client.cjs'
)

async function startServer() {
  const app = express()
  app.use(cors())
  app.use(express.json())

  const port = Number(process.env.SERVER_PORT) || 3001

  if (sequelize) {
    await sequelize.authenticate()
    await sequelize.sync()
  }

  app.use('/api/v2', router)

  let viteServer: ViteDevServer

  if (!isDev()) {
    app.use('/assets', express.static(path.resolve(CLIENT_DIST_PATH, 'assets')))
  } else {
    viteServer = await createViteDevServer(CLIENT_PATH)
    app.use(viteServer.middlewares)
  }

  app.use('*', async (req, res, next) => {
    if (req.originalUrl.indexOf('.') !== -1) {
      return
    }

    try {
      const html = await getSSRIndexHTML(req, res, viteServer)
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      if (viteServer) viteServer.ssrFixStacktrace(e as Error)
      next(e)
    }
  })

  if (!isDev()) {
    app.use(
      '/',
      express.static(CLIENT_DIST_PATH, { fallthrough: true, index: false })
    )
  }

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
