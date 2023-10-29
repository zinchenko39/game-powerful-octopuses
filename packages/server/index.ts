import dotenv from 'dotenv'
import cors from 'cors'
import { renderToString } from 'react-dom/server'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react'
import register from 'ignore-styles'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import { App } from '../client/src/App'

dotenv.config()

import express from 'express'
import { createClientAndConnect } from './db'

createClientAndConnect()

function makeHTMLPage(content: string) {
  return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>From SSR with Love</title>
        </head>
        <body>
        <div id="root">${content}</div>
        </body>
        </html>
`
}

async function startServer() {
  const app = express()
  app.use(cors())
  register(['.css', '.scss'])
  const port = Number(process.env.SERVER_PORT) || 3001

  app.get('/', (_, res) => {
    const appContentHTML = renderToString(App())
    res.send(makeHTMLPage(appContentHTML))
  })

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
  })
}

startServer()
