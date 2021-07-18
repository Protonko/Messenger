import {useEffect, useState, FC} from 'react'
import {ReactComponent as FileIcon} from 'assets/icons/file.svg'
import {Progressbar} from 'components/common/Progressbar'

interface IFileProps {
  value: number
  file: File
}

export const File: FC<IFileProps> = ({value, file}) => {
  const [preview, setPreview] = useState('')
  const convertToMB = (bytes: number) => {
    const CONVERSATION_VALUE = 1024
    return (bytes / CONVERSATION_VALUE ** 2).toFixed(2)
  }

  useEffect(() => {
    const objectUrl = URL.createObjectURL(new Blob([file]))
    setPreview(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [file])

  if (value < 100) {
    return <Progressbar value={value} />
  }

  if (file.type.startsWith('image')) {
    return (
      <div
        className="file-preview file-preview--image"
        style={{backgroundImage: `url(${preview})`}}
      >
        <div className="file-preview__remove">&times;</div>
      </div>
    )
  }

  return (
    <div className="file-preview file-preview--file">
      <div className="file-preview__remove">&times;</div>
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
