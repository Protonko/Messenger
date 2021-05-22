import {useEffect} from 'react'
import {EVENTS_SOCKET} from 'models/common/socket'
import {socket} from 'utils/socket'
import {Message} from 'components/common/Message'


export const Messages = () => {
  useEffect(() => {
    socket.on(EVENTS_SOCKET.NEW_MESSAGE, () => {
      console.log('created')
    })
  })
  const renderMessages = () => {
    return (
      <li className="messages__item">
        <Message name="name" src="#" />
      </li>
    )
  }

  return (
    <ul className="messages list list--reset">
      {[1, 2].map(renderMessages)}
    </ul>
  )
}
