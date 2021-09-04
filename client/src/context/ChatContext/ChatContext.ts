import {createContext} from 'react'

export interface IChatContext {
  selectedMessagesIds: string[]
  toggleSelectMessageId: (selectedMessageId: string) => void
  resetSelectedMessagesIds: () => void
}

export const defaultChatContextValue: IChatContext = {
  selectedMessagesIds: [],
  toggleSelectMessageId: () => {},
  resetSelectedMessagesIds: () => {},
}

export const ChatContext = createContext<IChatContext>(defaultChatContextValue)
