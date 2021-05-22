import {Textarea} from 'components/common/Textarea'
import {Avatar} from 'components/common/Avatar'

export const CreateMessageForm = () => {
  return (
    <form className="create-message-form">
      <div className="create-message-form__row">
        <Avatar name="qwe" src="" />
        <Textarea placeholder="Write a message..." className="create-message-form__textarea" />
        <Avatar name="qwe" src="" />
      </div>

      <div className="create-message-form__row">
        send
      </div>
    </form>
  )

}
