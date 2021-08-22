import type {FC} from 'react'
import {ReactComponent as FileIcon} from 'assets/icons/file.svg'

export interface IFileLinkProps {
  link: string
}

export const FileLink: FC<IFileLinkProps> = ({link}) => {
  return (
    <a download href={link} className="file-link">
      <FileIcon className="file-link__icon" />
      <div className="file-link__info">
        <span className="file-link__info-name">{link.split('/').pop()}</span>
      </div>
    </a>
  )
}
