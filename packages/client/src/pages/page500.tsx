import { FC } from 'react'

type Page500Props = {
  description: string
}

export const Page500: FC<Page500Props> = ({ description }) => {
  const descriptionContent = description ? <div>{description}</div> : null

  return (
    <div>
      <div>500</div>
      <div>Ошибка сервера</div>
      {descriptionContent}
    </div>
  )
}
