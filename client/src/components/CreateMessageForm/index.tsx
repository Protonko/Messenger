import type {EmojiData} from 'emoji-mart'
import type {RootState} from 'store/reducers'
import {useState, useCallback, useMemo, FormEvent} from 'react'
import {useDispatch, useSelector} from 'react-redux'
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
import {File as FileComponent} from 'components/common/File'

export const CreateMessageForm = () => {
  const dialogParam = useSearchParams('dialog')
  const {dialogs, account} = useSelector((state: RootState) => ({
    ...state.dialogs,
    ...state.auth,
  }))
  const dispatch = useDispatch()
  const [value, setValue] = useState('')
  const [file, setFile] = useState<File>()
  const interlocutor = useMemo(
    () => dialogs?.find((dialog) => dialog.id === dialogParam)?.interlocutor,
    [dialogs, dialogParam],
  )

  const emitWriteMessage = useCallback(
    throttle(() => {
      if (interlocutor && account) {
        socket.emit(EVENTS_SOCKET.TYPING_MESSAGE, interlocutor.id, account.id)
      }
    }, TYPING_TIMEOUT),
    [dialogs],
  )

  const onRemoveFile = () => {
    setFile(undefined)
  }

  const onChange = (value: string) => {
    emitWriteMessage()
    setValue(value)
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!interlocutor || !dialogParam) {
      return dispatch(commonError('ID not found!'))
    }

    dispatch(
      createMessage({
        text: value,
        dialogId: dialogParam,
        interlocutorId: interlocutor.id,
        attachment: file,
      }),
    )

    setValue('')
    setFile(undefined)
  }

  const onSelect = (data: EmojiData) => {
    if ('native' in data) {
      setValue((prev) => `${prev} ${data.native}`)
    }
  }

  const renderFile = () => {
    if (file) {
      return (
        <FileComponent
          additionalClassName="create-message-form__file"
          file={file}
          onRemove={onRemoveFile}
        />
      )
    } else {
      return null
    }
  }

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

          {renderFile()}

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
              <FileUploader onChange={setFile} />
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
