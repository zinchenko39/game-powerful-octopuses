import { useEffect, useState } from 'react'
import { OAuthService } from '../../services'
import icon from './oauth.svg'
import { HOST_URL } from '../../globals'
import { Button } from '@mui/material'

export function OAuth() {
  const [serverId, setServerId] = useState('')

  useEffect(() => {
    const getServiceId = async () => {
      try {
        const response = await OAuthService.getServiceId()
        if ('service_id' in response) {
          setServerId(response.service_id)
        }
      } catch (error) {
        console.error(error)
      }
    }
    getServiceId()
  }, [])

  const oauthLink = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${serverId}&redirect_uri=${HOST_URL}`

  return (
    <Button>
      <a href={oauthLink}>
        <img src={icon} alt="oauth" />
      </a>
    </Button>
  )
}
