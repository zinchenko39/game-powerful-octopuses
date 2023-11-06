import { createServer as createViteServer } from 'vite'

export async function createViteDevServer(srcPath: string) {
  const viteServer = await createViteServer({
    server: { middlewareMode: true },
    root: srcPath,
    appType: 'custom',
  })

  return viteServer
}
