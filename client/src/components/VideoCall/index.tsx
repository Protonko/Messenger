import type {IUser} from 'models/user'
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
  const {account} = useSelector((state: RootState) => state.auth)
  const interlocutor = dialogs?.find(({id}) => id === dialogParam)?.interlocutor
  const [conversationModalVisibility, setConversationModalVisibility] = useState(false)
  const [alertVisibility, setAlertVisibility] = useState(false)
  const [connecting, setConnecting] = useState(true)
  const [initiator, setInitiator] = useState<IUser>()
  const peerMediaElement = useRef<HTMLVideoElement>(null)
  const peerConnection = useRef(new RTCPeerConnection())

  peerConnection.current.onicecandidate = ({candidate}) => {
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

  const startCall = () => {
    if (!account) return

    setConversationModalVisibility(calling)
    setCalling(false)
    interlocutor && socket.emit(EVENTS_SOCKET.START_CALL, interlocutor.id, account.id)
  }

  const createAnswer = async () => {
    const answer = await peerConnection.current.createAnswer()
    await peerConnection.current.setLocalDescription(answer)
    initiator && socket.emit(EVENTS_SOCKET.RELAY_SESSION_DESCRIPTION, initiator.id, answer)
  }

  const createOffer = async () => {
    const offer = await peerConnection.current.createOffer()
    await peerConnection.current.setLocalDescription(offer)
    interlocutor && socket.emit(EVENTS_SOCKET.RELAY_SESSION_DESCRIPTION, interlocutor.id, offer)
  }

  const setRemoteMediaDescription = async (sessionDescription: RTCSessionDescriptionInit) => {
    await peerConnection.current.setRemoteDescription(
      new RTCSessionDescription(sessionDescription)
    )

    if (sessionDescription.type === 'offer') {
      await createAnswer()
    }
  }

  useEffect(() => {
    if (!dialogs) return

    peerConnection.current = new RTCPeerConnection()

    socket.on(EVENTS_SOCKET.DECLINE_CALL, () => {
      setConversationModalVisibility(false)
      setAlertVisibility(false)
    })

    socket.on(EVENTS_SOCKET.START_CALL, (initiator: IUser) => {
      setAlertVisibility(true)
      setInitiator(initiator)
    })

    socket.on(EVENTS_SOCKET.SESSION_DESCRIPTION, (data: RTCSessionDescriptionInit) => {
      setRemoteMediaDescription(data)
    })

    socket.on(EVENTS_SOCKET.ICE_CANDIDATE, async (iceCandidate: RTCIceCandidate) => {
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

  const renderConversationSpace = () => {
    if (interlocutor || initiator) {
      return (
        <ConversationSpace
          connecting={connecting}
          interlocutor={interlocutor || initiator!}
          declineCall={declineCall}
          peerConnection={peerConnection.current}
          peerMediaElement={peerMediaElement}
        />
      )
    }

    return null
  }

  const renderCallAlert = () => {
    if (initiator) {
      return (
        <CallAlert
          initiator={initiator}
          declineCall={declineCall}
          createOffer={createOffer}
          toggleVisibilityModal={setAlertVisibility}
          showConversationModal={() => setConversationModalVisibility(true)}
        />
      )
    }

    return null
  }

  return (
    <>
      <Modal modalVisibility={conversationModalVisibility}>
        {renderConversationSpace()}
      </Modal>

      <Modal modalVisibility={alertVisibility}>
        {renderCallAlert()}
      </Modal>
    </>
  )
}
