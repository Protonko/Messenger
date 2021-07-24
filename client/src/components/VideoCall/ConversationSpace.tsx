import type {FC} from 'react'
import type {IUser} from 'models/user'
import {useEffect, useRef, useState} from 'react'
import {ReactComponent as Phone} from 'assets/icons/phone.svg'
import callStartSound from 'assets/audio/call-start-sound.mp3'
import {Sizes} from 'models/common/sizes'
import {Button, ButtonModifier} from 'components/common/Button'
import {MediaCircle} from 'components/common/MediaCircle'

interface VideoCallProps {
  toggleVisibilityModal: (visibility: boolean) => void
  interlocutor: IUser
}

const INTERLOCUTOR_VIDEO_SIZE = 500
const audio = new Audio(callStartSound)

export const ConversationSpace: FC<VideoCallProps> = ({
  toggleVisibilityModal,
  interlocutor,
}) => {
  const mediaStream = useRef<MediaStream>()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [connecting, setConnecting] = useState(true);

  const endCall = () => toggleVisibilityModal(false)

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
          size={Sizes.LARGE}
          connecting={true}
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
        onClick={endCall}
        additionalClassName="conversation-space__button"
        modifier={ButtonModifier.CIRCLE}
        icon={<Phone className="conversation-space__button-icon" />}
      />
    </div>
  )
}
