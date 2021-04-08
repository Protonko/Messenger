import type {FC} from 'react'

export const Loader: FC = () => {
  const lines = new Array(12).fill('')

  const renderLine = (_: any, index: number) => {
    return <div className="loader__line" key={index} />
  }

  return (
    <div className="loader">
      {lines.map(renderLine)}
    </div>
  )
}
