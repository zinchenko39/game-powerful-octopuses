import { Client } from 'pg'

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT, HOST } =
  process.env

export const createClientAndConnect = async (): Promise<Client | null> => {
  console.log(POSTGRES_USER, POSTGRES_USER, POSTGRES_DB, POSTGRES_PORT)
  try {
    const client = new Client({
      user: POSTGRES_USER,
      host: HOST,
      database: POSTGRES_DB,
      password: POSTGRES_PASSWORD,
      port: Number(POSTGRES_PORT),
    })

    await client.connect()

    const res = await client.query('SELECT NOW()')
    console.log('  ➜ 🎸 Connected to the database at:', res?.rows?.[0].now)
    client.end()

    return client
  } catch (e) {
    console.error(e)
  }

  return null
}
