import {useContext} from 'react'
import {useDispatch} from 'react-redux'
import {Button, ButtonModifier} from 'components/common/Button'
import {ChatContext} from 'context/ChatContext'
import {deleteMessages} from 'store/actions/message'
import {useSearchParams} from 'hooks/useSearchParams'

export const DeleteMessageForm = () => {
  const dispatch = useDispatch()
  const dialogId = useSearchParams('dialog')
  const {resetSelectedMessagesIds, selectedMessagesIds} = useContext(ChatContext)

  const onDelete = () => {
    if (dialogId) {
      dispatch(deleteMessages({messagesIds: selectedMessagesIds, dialogId}))
    }
  }

  return (
    <div className="delete-message-form">
      <Button text="DELETE" onClick={onDelete} />
      <Button
        modifier={ButtonModifier.LINKING}
        text="CANCEL"
        onClick={resetSelectedMessagesIds}
      />
    </div>
  )
}
