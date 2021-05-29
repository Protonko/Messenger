import {useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import {EVENTS_SOCKET} from 'models/common/socket'
import {socket} from 'utils/socket'
import {Message} from 'components/common/Message'


export const Messages = () => {
  const location = useLocation()

  useEffect(() => {
    socket.on(EVENTS_SOCKET.NEW_MESSAGE, () => {
      console.log('created')
    })
  }, [])

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    console.log('User', urlParams.get('user'))
  }, [location])

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
