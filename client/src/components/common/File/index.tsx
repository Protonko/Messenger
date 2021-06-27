import type {FC} from 'react'
import {ReactComponent as FileIcon} from 'assets/icons/file.svg'
import {Progressbar} from 'components/common/Progressbar'
import img from '../../../assets/images/placeholder-image.png'

interface IFileProps {
  value: number
  file: File
}

export const File: FC<IFileProps> = ({value, file}) => {
  if (value < 100) {
    return <Progressbar value={value} />
  }

  if (file.type.startsWith('image')) {
    return (
      <div
        className="file-preview file-preview--image"
        style={{backgroundImage: `url(${img})`}}
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
        <span className="file-preview__info-name">file.zip</span>
        <span className="file-preview__info-size">12 MB</span>
      </div>
    </div>
  )
}
