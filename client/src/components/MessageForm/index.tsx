import {useContext} from 'react'
import {ChatContext} from 'context/ChatContext'
import {DeleteMessageForm} from './DeleteMessageForm'
import {CreateMessageForm} from './CreateMessageForm'

export const MessageForm = () => {
  const {selectedMessagesIds} = useContext(ChatContext)

  if (selectedMessagesIds.length) {
    return <DeleteMessageForm />
  }

  return <CreateMessageForm />
}
