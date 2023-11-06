import type { ViteDevServer } from 'vite'

import * as path from 'path'

import * as fs from 'fs'

import type express from 'express'

import jsesc from 'jsesc'

const CLIENT_PATH = path.resolve(__dirname + '/../client')
const CLIENT_DIST_PATH = path.join(CLIENT_PATH, 'dist')
const CLIENT_DIST_SSR_PATH = path.resolve(
  __dirname + '/../client/dist-ssr/client.cjs'
)

const isDev = process.env.NODE_ENV === 'development'

interface SSRModule {
  render: (
    url: string,
    repository: unknown
  ) => Promise<[Record<string, unknown>, string]>
}

export async function getSSRIndexHTML(
  req: express.Request,
  res: express.Response,
  viteServer: ViteDevServer
) {
  const url = req.originalUrl
  const rootPath = isDev ? CLIENT_PATH : CLIENT_DIST_PATH

  // CheckAuth запишет пользователя в res.locals.user
  const user = res.locals.user

  console.log(user, ' user?')

  let template = fs.readFileSync(path.resolve(rootPath, 'index.html'), 'utf-8')

  let ssrModule: SSRModule | undefined = undefined

  if (isDev) {
    template = await viteServer.transformIndexHtml(url, template)
    ssrModule = (await viteServer.ssrLoadModule(
      path.resolve(rootPath, 'ssr.tsx')
    )) as SSRModule
  }

  if (!isDev) {
    ssrModule = await import(CLIENT_DIST_SSR_PATH)
  }

  let html = undefined

  if (ssrModule?.render) {
    const [initialState, appHtml] = await ssrModule.render(
      user ? url : '/signin', // делаем редирект на /signin если не авторизированы
      // Promise.reject обязательно, для store нужна ошибка
      {
        getCurrent: () =>
          user ? Promise.resolve(user) : Promise.reject('не авторизован'),
      }
    )

    const initStateSerialized = jsesc(JSON.stringify(initialState), {
      json: true,
      isScriptContext: true,
    })

    html = template
      .replace(`<!--ssr-outlet-->`, appHtml)
      .replace('`<!--store-data-->`', initStateSerialized)
  }

  return html
}
