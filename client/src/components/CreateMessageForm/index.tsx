import type {EmojiData} from 'emoji-mart'
import {useState, FormEvent} from 'react'
import {ReactComponent as Clip} from 'assets/icons/clip.svg'
import {ReactComponent as Microphone} from 'assets/icons/microphone.svg'
import {Textarea} from 'components/common/Textarea'
import {Avatar} from 'components/common/Avatar'
import {Button} from 'components/common/Button'
import {Emoji} from 'components/common/Emoji'

export const CreateMessageForm = () => {
  const [value, setValue] = useState('')

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('created')
  }

  const onSelect = (data: EmojiData) => {
    if ('native' in data) {
      setValue((prev) => `${prev} ${data.native}`)
    }
  }

  return (
    <form className="create-message-form" onSubmit={onSubmit}>
      <div className="create-message-form__row">
        <Avatar name="qwe" src="" />
        <Textarea
          placeholder="Write a message..."
          className="create-message-form__textarea"
          value={value}
          onChange={setValue}
        />
        <Avatar name="qwe" src="" />
      </div>

      <div className="create-message-form__row create-message-form__actions">
        <div className="create-message-form__col">
          <ul className="create-message-form__icons list list--reset">
            <li className="create-message-form__icons-item">
              <Clip className="create-message-form__icon" />
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
