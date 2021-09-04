import type {RootState} from 'store/reducers'
import type {IMessage} from 'models/message'
import {
  useContext,
  useEffect,
  useRef,
  FC,
  MouseEvent as ReactMouseEvent,
} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {EventsSocket} from 'models/common/socket'
import {socket} from 'utils/socket'
import {useSearchParams} from 'hooks/useSearchParams'
import {useTyping} from 'hooks/useTyping'
import {
  appendMessage,
  deleteMessagesSuccess,
  getMessages,
} from 'store/actions/message'
import {Message} from 'components/common/Message'
import {ContentContainer} from 'components/common/ContentContainer'
import {Tag} from 'components/common/Tag'
import {Typing} from 'components/common/Typing'
import {ChatContext} from 'context/ChatContext'

export const Messages: FC = () => {
  const listRef = useRef<HTMLUListElement>(null)
  const dialogParam = useSearchParams('dialog')
  const [typing, typingHandler] = useTyping()
  const {selectedMessagesIds, toggleSelectMessageId} = useContext(ChatContext)
  const dispatch = useDispatch()
  const {messages, loading, errorMessage} = useSelector(
    (state: RootState) => state.message,
  )

  useEffect(() => {
    socket.on(EventsSocket.NEW_MESSAGE, (message: IMessage) => {
      const isCurrentDialog = dialogParam === message.dialog

      dispatch(appendMessage({message, isCurrentDialog}))
      isCurrentDialog &&
        socket.emit(EventsSocket.READ_MESSAGE, message.author.id, dialogParam)
    })

    socket.on(EventsSocket.TYPING_MESSAGE, () => {
      typingHandler()
    })

    socket.on(
      EventsSocket.DELETE_MESSAGES,
      (messagesIds: string[], dialogId: string) => {
        dispatch(deleteMessagesSuccess({messagesIds, dialogId}))
      },
    )
  }, [])

  useEffect(() => {
    listRef.current?.scrollTo(0, listRef.current.scrollHeight)
  }, [messages])

  useEffect(() => {
    if (dialogParam && !messages?.[dialogParam]?.length) {
      dispatch(getMessages(dialogParam))
    }
  }, [dialogParam])

  const toggleSelectMessage = (
    event: ReactMouseEvent<HTMLUListElement, MouseEvent>,
  ) => {
    const element = (event.target as HTMLUListElement).closest(
      '.messages__item',
    )

    if (!element) return

    toggleSelectMessageId(element.id)
  }

  const renderMessages = (message: IMessage) => {
    return (
      <li className="messages__item" key={message.id} id={message.id}>
        <Message
          {...message}
          selected={selectedMessagesIds.includes(message.id)}
        />
      </li>
    )
  }

  const renderContent = () => {
    const emptyMessage = dialogParam
      ? 'No messages here yet...'
      : 'Please select a chat to start messaging...'

    if (dialogParam && messages?.[dialogParam]?.length) {
      return messages[dialogParam].map(renderMessages)
    }

    return (
      <li className="messages__item messages__item--empty">
        <Tag text={emptyMessage} />
      </li>
    )
  }

  return (
    <ContentContainer loading={loading} errorMessage={errorMessage}>
      <ul
        ref={listRef}
        className="messages list list--reset"
        onClick={toggleSelectMessage}
      >
        {renderContent()}

        {typing && (
          <li className="messages__item messages__item--typing">
            <Typing />
          </li>
        )}
      </ul>
    </ContentContainer>
  )
}
