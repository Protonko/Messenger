import type {EmojiData} from 'emoji-mart'
import type {RootState} from 'store/reducers'
import type {IUploadFile} from 'models/file'
import {useState, useCallback, useMemo, FormEvent} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {ReactComponent as Microphone} from 'assets/icons/microphone.svg'
import {EVENTS_SOCKET} from 'models/common/socket'
import {socket} from 'utils/socket'
import throttle from 'utils/throttle'
import {useSearchParams} from 'hooks/useSearchParams'
import {TYPING_TIMEOUT} from 'static/constants'
import {createMessage} from 'store/actions/message'
import {commonError} from 'store/actions/error'
import {Textarea} from 'components/common/Textarea'
import {Avatar} from 'components/common/Avatar'
import {Button} from 'components/common/Button'
import {Emoji} from 'components/common/Emoji'
import {FileUploader} from 'components/common/FileUploader'
import {File} from 'components/common/File'

export const CreateMessageForm = () => {
  const dialogParam = useSearchParams('dialog')
  const {dialogs, account, files} = useSelector((state: RootState) => ({
    ...state.dialogs,
    ...state.auth,
    ...state.files,
  }))
  const dispatch = useDispatch()
  const [value, setValue] = useState('')
  const interlocutor = useMemo(
    () => dialogs?.find((dialog) => dialog.id === dialogParam)?.interlocutor,
    [dialogs, dialogParam],
  )

  const emitWriteMessage = useCallback(
    throttle(() => {
      interlocutor && socket.emit(EVENTS_SOCKET.TYPING_MESSAGE, interlocutor.id)
    }, TYPING_TIMEOUT),
    [dialogs],
  )

  const onChange = (value: string) => {
    emitWriteMessage()
    setValue(value)
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!interlocutor || !dialogParam) {
      return dispatch(commonError('ID not found!'))
    }

    setValue('')

    dispatch(
      createMessage({
        text: value,
        dialogId: dialogParam,
        interlocutorId: interlocutor.id,
      }),
    )
  }

  const onSelect = (data: EmojiData) => {
    if ('native' in data) {
      setValue((prev) => `${prev} ${data.native}`)
    }
  }

  const renderItem = (file: IUploadFile) => (
    <li className="create-message-form__file" key={file.id}>
      <File file={file.file} value={file.progress} />
    </li>
  )

  return (
    <form className="create-message-form" onSubmit={onSubmit}>
      <div className="create-message-form__row">
        <Avatar name={account?.full_name} src={account?.avatar ?? ''} />
        <div className="create-message-form__fields">
          <Textarea
            placeholder="Write a message..."
            className="create-message-form__textarea"
            value={value}
            onChange={onChange}
          />
          <ul className="create-message-form__files list list--reset">
            {files?.length ? files.map(renderItem) : null}
          </ul>
        </div>
        <Avatar
          name={interlocutor?.full_name}
          src={interlocutor?.avatar ?? ''}
        />
      </div>

      <div className="create-message-form__row create-message-form__actions">
        <div className="create-message-form__col">
          <ul className="create-message-form__icons list list--reset">
            <li className="create-message-form__icons-item">
              <FileUploader multiple={true} />
            </li>
            <li className="create-message-form__icons-item">
              <Microphone className="create-message-form__icon" />
            </li>
            <li className="create-message-form__icons-item">
              <Emoji onSelect={onSelect} />
            </li>
          </ul>
        </div>

        <div className="create-message-form__col">
          <Button type="submit" text="SEND" />
        </div>
      </div>
    </form>
  )
}
