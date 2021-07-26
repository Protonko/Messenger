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
  const peerMediaElement = useRef<HTMLVideoElement>()
  const peerConnection = useRef(new RTCPeerConnection())

  peerConnection.current.onicecandidate = ({candidate}) => {
    if (candidate) {
      socket.emit(EVENTS_SOCKET.RELAY_ICE, interlocutor, candidate)
    }
  }

  peerConnection.current.ontrack = ({streams}) => {
    console.log('ONTRACK')
    console.log(streams)

    if (peerMediaElement.current) {
      peerMediaElement.current.srcObject = streams[0];
    } else {
      setTimeout(() => {
        if (peerMediaElement.current) {
          peerMediaElement.current.srcObject = streams[0];
        }
      }, 1000);
    }
  }

  const startCall = async () => {
    setConversationModalVisibility(calling)
    setCalling(false)
    interlocutor && socket.emit(EVENTS_SOCKET.START_CALL, interlocutor.id)
  }

  const setRemoteMediaDescription = async (sessionDescription: RTCSessionDescriptionInit) => {
    peerConnection.current?.setRemoteDescription(
      new RTCSessionDescription(sessionDescription)
    )

    if (sessionDescription.type === 'offer') {
      const answer = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(answer);

      interlocutor && socket.emit(EVENTS_SOCKET.RELAY_SESSION_DESCRIPTION, interlocutor.id, answer);
    }
  }

  useEffect(() => {
    socket.on(EVENTS_SOCKET.START_CALL, () => {
      setAlertVisibility(true)
    })
    socket.on(EVENTS_SOCKET.DECLINE_CALL, () => {
      setConversationModalVisibility(false)
      setAlertVisibility(false)
    })
    socket.on(EVENTS_SOCKET.ACCEPT_CALL, () => {
      console.log('ACCEPT')
    })
    socket.on(EVENTS_SOCKET.SESSION_DESCRIPTION, (data: RTCSessionDescriptionInit) => {
      setRemoteMediaDescription(data)
    })
    socket.on(EVENTS_SOCKET.ICE_CANDIDATE, async (iceCandidate: RTCIceCandidate) => {
      await peerConnection.current.addIceCandidate(
        new RTCIceCandidate(iceCandidate)
      )
    })

    return () => {
      socket.off(EVENTS_SOCKET.SESSION_DESCRIPTION);
    }
  }, [dialogs]);

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
