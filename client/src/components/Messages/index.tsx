import type {RootState} from 'store/reducers'
import type {IMessage} from 'models/message'
import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {EVENTS_SOCKET} from 'models/common/socket'
import {socket} from 'utils/socket'
import {useSearchParams} from 'hooks/useSearchParams'
import {getMessages} from 'store/actions/message'
import {Message} from 'components/common/Message'
import {ContentContainer} from 'components/common/ContentContainer'
import {Tag} from 'components/common/Tag'

export const Messages = () => {
  const dialogParam = useSearchParams('dialog')
  const dispatch = useDispatch()
  const {messages} = useSelector((state: RootState) => state.message)

  useEffect(() => {
    socket.on(EVENTS_SOCKET.NEW_MESSAGE, () => {
      console.log('created')
    })
  }, [])

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
    <ContentContainer loading={false} errorMessage={null}>
      <ul className="messages list list--reset">
        {renderContent()}
      </ul>
    </ContentContainer>
  )
}
