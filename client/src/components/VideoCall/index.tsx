import type {RootState} from 'store/reducers'
import {useState, useEffect, FC} from 'react'
import {useSelector} from 'react-redux'
import {EVENTS_SOCKET} from 'models/common/socket'
import {useSearchParams} from 'hooks/useSearchParams'
import {socket} from 'utils/socket'
import {Modal} from 'components/common/Modal'
import {CallAlert} from 'components/VideoCall/CallAlert'
import {ConversationSpace} from 'components/VideoCall/ConversationSpace'

interface IVideoCallProps {
  calling: boolean
  setCalling: (calling: boolean) => void
}

export const VideoCall: FC<IVideoCallProps> = ({calling, setCalling}) => {
  const dialogParam = useSearchParams('dialog')
  const {dialogs} = useSelector((state: RootState) => state.dialogs)
  const interlocutor = dialogs?.find(({id}) => id === dialogParam)?.interlocutor
  const [modalVisibility, setModalVisibility] = useState(false)
  const [alertVisibility, setAlertVisibility] = useState(false);

  useEffect(() => {
    socket.on(EVENTS_SOCKET.START_CALL, (data: any) => {
      setAlertVisibility(true)
    })

    if (calling) {
      setModalVisibility(calling)
      setCalling(false)
      interlocutor && socket.emit(EVENTS_SOCKET.START_CALL, interlocutor.id)
    }
  }, [calling])

  if (!interlocutor) {
    return null
  }

  return (
    <>
      <Modal modalVisibility={modalVisibility}>
        <ConversationSpace
          interlocutor={interlocutor}
          toggleVisibilityModal={setModalVisibility}
        />
      </Modal>

      <Modal modalVisibility={alertVisibility}>
        <CallAlert
          interlocutor={interlocutor}
          toggleVisibilityModal={setAlertVisibility}
          showVideoCallModal={() => setModalVisibility(true)}
        />
      </Modal>
    </>
  )
}
