import { useCallback, useEffect, useState } from 'react'
import { OAuthService } from '../../services'
import icon from './oauth.svg'
import { HOST_URL } from '../../globals'
import { Button } from '@mui/material'

export function OAuth() {
  const [serverId, setServerId] = useState('')

  const getServiceId = useCallback(async () => {
    const response = await OAuthService.getServiceId()
    if ('service_id' in response) {
      setServerId(response.service_id)
    } else {
      console.error('Ошибка получения id сервиса')
    }
  }, [])

  useEffect(() => {
    getServiceId()
    return () => {
      setServerId('')
    }
  }, [])

  const signInOauth = useCallback(() => {
    const link = ` https://oauth.yandex.ru/authorize?response_type=code&client_id=${serverId}&redirect_uri=${HOST_URL}`
    return (
      <a href={link}>
        <img src={icon} alt="oauth" />
      </a>
    )
  }, [serverId])

  return <Button>{signInOauth()}</Button>
}
