import type {ChangeEvent, FC} from 'react'
import {useDispatch} from 'react-redux'
import classNames from 'classnames'
import {ReactComponent as Clip} from 'assets/icons/clip.svg'
import {uploadFile} from 'store/actions/files'
import {generateUuid} from 'utils/generateUuid'

interface FileUploaderProps {
  onChange?: () => void
  multiple?: boolean
  disabled?: boolean
}

export const FileUploader: FC<FileUploaderProps> = ({
  onChange,
  multiple,
  disabled,
}) => {
  const dispatch = useDispatch()
  const uploaderClassNames = classNames('file-uploader', {
    'file-uploader--disabled': disabled,
  })

  const onUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []).map((file) => ({
      file: file,
      id: generateUuid(),
      progress: 0,
    }))

    onChange?.()
    dispatch(uploadFile(files))
  }

  return (
    <div className={uploaderClassNames}>
      <label className="file-uploader__label">
        <Clip className="file-uploader__icon" />
        <input
          className="file-uploader__input"
          type="file"
          onChange={onUpload}
          multiple={multiple}
          disabled={disabled}
        />
      </label>
    </div>
  )
}
