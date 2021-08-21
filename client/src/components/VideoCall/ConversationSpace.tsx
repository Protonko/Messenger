import type {IUser} from 'models/user'
import {useEffect, useRef, FC, RefObject} from 'react'
import {ReactComponent as Phone} from 'assets/icons/phone.svg'
import callStartSound from 'assets/audio/call-start-sound.mp3'
import {Sizes} from 'models/common/sizes'
import {Button, ButtonModifier} from 'components/common/Button'
import {MediaCircle} from 'components/common/MediaCircle'

interface VideoCallProps {
  connecting: boolean
  declineCall: () => void
  interlocutor: IUser
  peerConnection: RTCPeerConnection
  peerMediaElement: RefObject<HTMLVideoElement>
}

const INTERLOCUTOR_VIDEO_SIZE = 500
const audio = new Audio(callStartSound)

export const ConversationSpace: FC<VideoCallProps> = ({
  connecting,
  declineCall,
  interlocutor,
  peerConnection,
  peerMediaElement,
}) => {
  const mediaStream = useRef<MediaStream>()
  const videoRef = useRef<HTMLVideoElement>(null)

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
    } catch (error) {
      console.log(error)
    }
  }

  useEffect( () => {
    (async function() {
      await audio.play()
      await getMedia()

      if (mediaStream.current) {
        mediaStream.current.getTracks().forEach(track => {
          peerConnection.addTrack(track, mediaStream.current!);
        })
      }
    })()

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
          connecting={connecting}
          user={interlocutor}
        />
        <MediaCircle
          additionalClassName="conversation-space__area-circle conversation-space__area-circle--subsidiary"
          ref={videoRef}
          size={Sizes.SMALL}
          connecting={false}
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
