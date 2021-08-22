import {useEffect, useState, FC} from 'react'
import classNames from 'classnames'
import {ReactComponent as FileIcon} from 'assets/icons/file.svg'

export interface IFileProps {
  file: File
  link?: string
  onRemove?: (name: string, lastModified: number) => void
  additionalClassName?: string
}

export const File: FC<IFileProps> = ({file, onRemove, additionalClassName}) => {
  const [preview, setPreview] = useState('')
  const isImage = file.type.startsWith('image')
  const fileClassNames = classNames(
    'file-preview',
    {'file-preview--image': isImage},
    {'file-preview--file': !isImage},
    {[additionalClassName ?? '']: !!additionalClassName},
  )

  const convertToMB = (bytes: number) => {
    const CONVERSATION_VALUE = 1024
    return (bytes / CONVERSATION_VALUE ** 2).toFixed(2)
  }

  useEffect(() => {
    const objectUrl = URL.createObjectURL(new Blob([file]))
    setPreview(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [file])

  const renderRemoveIcon = () => {
    if (onRemove) {
      return (
        <div
          className="file-preview__remove"
          onClick={() => onRemove(file.name, file.lastModified)}
        >
          &times;
        </div>
      )
    }

    return null
  }

  if (file.type.startsWith('image')) {
    return (
      <div
        className={fileClassNames}
        style={{backgroundImage: `url(${preview})`}}
      >
        {renderRemoveIcon()}
      </div>
    )
  }

  return (
    <div className={fileClassNames}>
      {renderRemoveIcon()}

      <FileIcon className="file-preview__icon" />
      <div className="file-preview__info">
        <span className="file-preview__info-name">{file.name}</span>
        <span className="file-preview__info-size">
          {convertToMB(file.size)} MB
        </span>
      </div>
    </div>
  )
}
