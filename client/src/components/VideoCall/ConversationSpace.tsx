import type {FC} from 'react'
import type {IUser} from 'models/user'
import {useEffect, useRef, useState} from 'react'
import {ReactComponent as Phone} from 'assets/icons/phone.svg'
import callStartSound from 'assets/audio/call-start-sound.mp3'
import {Sizes} from 'models/common/sizes'
import {Button, ButtonModifier} from 'components/common/Button'
import {MediaCircle} from 'components/common/MediaCircle'
import {socket} from 'utils/socket'
import {EVENTS_SOCKET} from 'models/common/socket'

interface VideoCallProps {
  declineCall: () => void
  interlocutor: IUser
  peerConnection: RTCPeerConnection
  peerMediaElement: any
}

const INTERLOCUTOR_VIDEO_SIZE = 500
const audio = new Audio(callStartSound)

export const ConversationSpace: FC<VideoCallProps> = ({
  declineCall,
  interlocutor,
  peerConnection,
  peerMediaElement,
}) => {
  const mediaStream = useRef<MediaStream>()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [connecting, setConnecting] = useState(true);

  const getMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: {
          width: INTERLOCUTOR_VIDEO_SIZE,
          height: INTERLOCUTOR_VIDEO_SIZE,
        }
      })

      if (videoRef.current) videoRef.current.srcObject = stream
      mediaStream.current = stream
      setConnecting(false)
    } catch (error) {
      // TODO: FIX
      console.log(error)
    }
  }

  useEffect(() => {
    socket.on(EVENTS_SOCKET.ACCEPT_CALL, () => {
      if (mediaStream.current) {
        mediaStream.current.getTracks().forEach(track => {
          peerConnection.addTrack(track, mediaStream.current!);
        })
      }
    })

    audio.play()
    getMedia()

    return () => {
      mediaStream.current?.getTracks().forEach(track => track.stop())
      audio.pause()
      audio.currentTime = 0
    }
  }, [])

  return (
    <div className="conversation-space">
      <div className="conversation-space__area">
        <MediaCircle
          additionalClassName="conversation-space__area-circle conversation-space__area-circle--main"
          ref={peerMediaElement}
          size={Sizes.LARGE}
          connecting={false}
          user={interlocutor}
        />
        <MediaCircle
          additionalClassName="conversation-space__area-circle conversation-space__area-circle--subsidiary"
          ref={videoRef}
          size={Sizes.SMALL}
          connecting={connecting}
          user={interlocutor}
        />
      </div>

      <Button
        onClick={declineCall}
        additionalClassName="conversation-space__button"
        modifier={ButtonModifier.CIRCLE}
        icon={<Phone className="conversation-space__button-icon" />}
      />
    </div>
  )
}
