import type {RootState} from 'store/reducers'
import type {IMessage} from 'models/message'
import {useEffect, useRef} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {EVENTS_SOCKET} from 'models/common/socket'
import {socket} from 'utils/socket'
import {useSearchParams} from 'hooks/useSearchParams'
import {useTyping} from 'hooks/useTyping'
import {appendMessage, getMessages} from 'store/actions/message'
import {Message} from 'components/common/Message'
import {ContentContainer} from 'components/common/ContentContainer'
import {Tag} from 'components/common/Tag'
import {Typing} from 'components/common/Typing'

export const Messages = () => {
  const listRef = useRef<HTMLUListElement>(null)
  const dialogParam = useSearchParams('dialog')
  const [typing, typingHandler] = useTyping()
  const dispatch = useDispatch()
  const {messages, loading, errorMessage} = useSelector(
    (state: RootState) => state.message,
  )

  useEffect(() => {
    socket.on(EVENTS_SOCKET.NEW_MESSAGE, (message: IMessage) => {
      dispatch(appendMessage(message))
    })
    socket.on(EVENTS_SOCKET.TYPING_MESSAGE, () => {
      typingHandler()
    })
  }, [])

  useEffect(() => {
    listRef.current?.scrollTo(0, listRef.current.scrollHeight)
  }, [messages])

  useEffect(() => {
    if (dialogParam && !messages?.[dialogParam]?.length) {
      dispatch(getMessages(dialogParam))
    }
  }, [dialogParam])

  const emptyMessage = dialogParam
    ? 'No messages here yet...'
    : 'Please select a chat to start messaging...'

  const renderMessages = (message: IMessage) => {
    return (
      <li className="messages__item" key={message.id}>
        <Message {...message} />
      </li>
    )
  }

  const renderContent = () => {
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
      <ul ref={listRef} className="messages list list--reset">
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
