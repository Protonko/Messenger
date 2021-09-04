import {useContext} from 'react'
import {useDispatch} from 'react-redux'
import {Button, ButtonModifier} from 'components/common/Button'
import {ChatContext} from 'context/ChatContext'
import {deleteMessages} from 'store/actions/message'
import {useSearchParams} from 'hooks/useSearchParams'

export const DeleteMessageForm = () => {
  const dispatch = useDispatch()
  const dialogId = useSearchParams('dialog')
  const {resetSelectedMessagesIds, selectedMessagesIds} =
    useContext(ChatContext)

  const onDelete = () => {
    if (dialogId) {
      dispatch(deleteMessages({messagesIds: selectedMessagesIds, dialogId}))
      resetSelectedMessagesIds()
    }
  }

  return (
    <div className="delete-message-form">
      <Button
        additionalClassName="delete-message-form__button delete-message-form__button--delete"
        text="DELETE"
        onClick={onDelete}
      />
      <Button
        additionalClassName="delete-message-form__button delete-message-form__button--cancel"
        modifier={ButtonModifier.LINKING}
        text="CANCEL"
        onClick={resetSelectedMessagesIds}
      />
    </div>
  )
}
