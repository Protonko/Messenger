import {useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {EVENTS_SOCKET} from 'models/common/socket'
import {socket} from 'utils/socket'
import {getMessages} from 'store/actions/message'
import {Message} from 'components/common/Message'

export const Messages = () => {
  const location = useLocation()
  const dispatch = useDispatch()

  useEffect(() => {
    socket.on(EVENTS_SOCKET.NEW_MESSAGE, () => {
      console.log('created')
    })
  }, [])

  useEffect(() => {
    const dialogParam = new URLSearchParams(location.search).get('dialog')
    dialogParam && dispatch(getMessages(dialogParam))
  }, [location])

  const renderMessages = () => {
    return (
      <li className="messages__item">
        <Message name="name" src="#" />
      </li>
    )
  }

  return (
    <ul className="messages list list--reset">{[1, 2].map(renderMessages)}</ul>
  )
}
