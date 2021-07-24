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
  const [conversationModalVisibility, setModalConversationVisibility] = useState(false)
  const [alertVisibility, setAlertVisibility] = useState(false);

  // RTCPeerConnection
  const peerConnection = useRef(new RTCPeerConnection())
  peerConnection.current.onicecandidate = ({candidate}) => {
    console.log(candidate)
    if (candidate) {
      socket.emit(EVENTS_SOCKET.RELAY_ICE, {
        peerID: dialogParam,
        iceCandidate: candidate
      })
    }
  }

  peerConnection.current.ontrack = ({streams}) => {
    console.log(streams)
  }
  // ./RTCPeerConnection

  const startCall = async () => {
    const offer = await peerConnection.current.createOffer()
    setModalConversationVisibility(calling)
    setCalling(false)
    await peerConnection.current.setLocalDescription(offer)
    interlocutor && socket.emit(EVENTS_SOCKET.START_CALL, interlocutor.id)
  }

  const setRemoteMediaDescription = async (sessionDescription: any) => {
    await peerConnection.current?.setRemoteDescription(
      new RTCSessionDescription(sessionDescription)
    );

    if (sessionDescription.type === 'offer') {
      const answer = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(answer);

      socket.emit(EVENTS_SOCKET.RELAY_SDP, {
        interlocutor,
        sessionDescription: answer,
      });
    }
  }

  useEffect(() => {
    socket.on(EVENTS_SOCKET.SET_MEDIA_DESCRIPTION, setRemoteMediaDescription)
    socket.on(EVENTS_SOCKET.START_CALL, (data: any) => {
      setAlertVisibility(true)
    })
    socket.on(EVENTS_SOCKET.DECLINE_CALL, (data: any) => {
      setModalConversationVisibility(false)
      setAlertVisibility(false)
    })
    socket.on(EVENTS_SOCKET.ACCEPT_CALL, (data: any) => {
      setAlertVisibility(false)
      setModalConversationVisibility(true)
    })

    return () => {
      socket.off(EVENTS_SOCKET.SET_MEDIA_DESCRIPTION);
    }
  }, []);


  useEffect(() => {
    if (calling) {
      startCall()
    }
  }, [calling])

  const declineCall = () => {
    setModalConversationVisibility(false)
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
        />
      </Modal>

      <Modal modalVisibility={alertVisibility}>
        <CallAlert
          interlocutor={interlocutor}
          declineCall={declineCall}
          toggleVisibilityModal={setAlertVisibility}
          showVideoCallModal={() => setModalConversationVisibility(true)}
        />
      </Modal>
    </>
  )
}
