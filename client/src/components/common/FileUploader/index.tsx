import type {ChangeEvent, FC} from 'react'
import classNames from 'classnames'
import {ReactComponent as Clip} from 'assets/icons/clip.svg'

export interface IFileUploaderProps {
  onChange: (file: File) => void
  disabled?: boolean
}

export const FileUploader: FC<IFileUploaderProps> = ({
  onChange,
  disabled,
}) => {
  const uploaderClassNames = classNames('file-uploader', {
    'file-uploader--disabled': disabled,
  })

  const onUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file =  event.target.files?.[0]

    file && onChange(file)
  }

  return (
    <div className={uploaderClassNames}>
      <label className="file-uploader__label">
        <Clip className="file-uploader__icon" />
        <input
          name="file"
          className="file-uploader__input"
          type="file"
          onChange={onUpload}
          disabled={disabled}
        />
      </label>
    </div>
  )
}
