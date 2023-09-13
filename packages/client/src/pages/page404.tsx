import { FC } from 'react'

type Page404Props = {
  description: string
}

export const Page404: FC<Page404Props> = ({ description }) => {
  const descriptionContent = description ? <div>{description}</div> : null

  return (
    <div>
      <div>404</div>
      <div>Страница не найдена</div>
      {descriptionContent}
    </div>
  )
}
