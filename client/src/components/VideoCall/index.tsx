import type {RootState} from 'store/reducers'
import {useState, useEffect, useRef, FC} from 'react'
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
  const [conversationModalVisibility, setConversationModalVisibility] = useState(false)
  const [alertVisibility, setAlertVisibility] = useState(false)
  const [connecting, setConnecting] = useState(true)
  const peerMediaElement = useRef<HTMLVideoElement>()
  const peerConnection = useRef(new RTCPeerConnection())

  peerConnection.current.onicecandidate = ({candidate}) => {
    console.log('ICE CANDIDATE', 4)
    if (candidate) {
      socket.emit(EVENTS_SOCKET.RELAY_ICE, interlocutor, candidate)
    }
  }

  peerConnection.current.ontrack = ({streams}) => {
    if (peerMediaElement.current) {
      peerMediaElement.current.srcObject = streams[0]
      setConnecting(false)
    }
  }

  const startCall = async () => {
    setConversationModalVisibility(calling)
    setCalling(false)
    interlocutor && socket.emit(EVENTS_SOCKET.START_CALL, interlocutor.id)
  }

  const setRemoteMediaDescription = async (sessionDescription: RTCSessionDescriptionInit) => {
    await peerConnection.current.setRemoteDescription(
      new RTCSessionDescription(sessionDescription)
    )

    // create answer
    if (sessionDescription.type === 'offer') {
      const answer = await peerConnection.current.createAnswer()
      await peerConnection.current.setLocalDescription(answer)
      interlocutor && socket.emit(EVENTS_SOCKET.RELAY_SESSION_DESCRIPTION, interlocutor.id, answer)
      console.log('CREATE ANSWER', 3)
    }
  }

  useEffect(() => {
    if (!dialogs) return

    socket.on(EVENTS_SOCKET.START_CALL, () => {
      setAlertVisibility(true)
    })
    socket.on(EVENTS_SOCKET.DECLINE_CALL, () => {
      setConversationModalVisibility(false)
      setAlertVisibility(false)
    })
    socket.on(EVENTS_SOCKET.SESSION_DESCRIPTION, (data: RTCSessionDescriptionInit) => {
      setRemoteMediaDescription(data)
    })
    socket.on(EVENTS_SOCKET.ICE_CANDIDATE, async (iceCandidate: RTCIceCandidate) => {
      console.log('ADD_CANDIDATE', 4)
      await peerConnection.current.addIceCandidate(
        new RTCIceCandidate(iceCandidate)
      )
    })
  }, [dialogs])

  useEffect(() => {
    return () => {
      socket.off(EVENTS_SOCKET.SESSION_DESCRIPTION)
    }
  }, [])

  useEffect(() => {
    if (!calling) return

    startCall()
    setCalling(false)
  }, [calling])

  const declineCall = () => {
    setConversationModalVisibility(false)
    setAlertVisibility(false)
    socket.emit(EVENTS_SOCKET.DECLINE_CALL, interlocutor?.id)
  }

  if (!interlocutor) {
    return null
  }

  return (
    <>
      <Modal modalVisibility={conversationModalVisibility}>
        <ConversationSpace
          connecting={connecting}
          interlocutor={interlocutor}
          declineCall={declineCall}
          peerConnection={peerConnection.current}
          peerMediaElement={peerMediaElement}
        />
      </Modal>

      <Modal modalVisibility={alertVisibility}>
        <CallAlert
          interlocutor={interlocutor}
          declineCall={declineCall}
          toggleVisibilityModal={setAlertVisibility}
          showConversationModal={() => setConversationModalVisibility(true)}
          peerConnection={peerConnection.current}
        />
      </Modal>
    </>
  )
}
