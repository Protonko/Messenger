import {FC, useState} from 'react'
import {ChatContext, defaultChatContextValue} from 'context/ChatContext'

export const ChatContextProvider: FC = ({children}) => {
  const [selectedMessagesIds, setSelectedMessagesIds] = useState(
    defaultChatContextValue.selectedMessagesIds,
  )

  const resetSelectedMessagesIds = () => {
    setSelectedMessagesIds([])
  }

  const toggleSelectMessageId = (messageId: string) => {
    if (selectedMessagesIds.includes(messageId)) {
      setSelectedMessagesIds((prevState) =>
        prevState.filter((id) => id !== messageId),
      )
    } else {
      setSelectedMessagesIds([...selectedMessagesIds, messageId])
    }
  }

  return (
    <ChatContext.Provider
      value={{
        selectedMessagesIds,
        toggleSelectMessageId,
        resetSelectedMessagesIds,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}
