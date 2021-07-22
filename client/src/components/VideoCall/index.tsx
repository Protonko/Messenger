import type {FC} from 'react'
import type {IUser} from 'models/user'
import {useEffect, useRef, useState} from 'react'
import {ReactComponent as Phone} from 'assets/icons/phone.svg'
import {Sizes} from 'models/common/sizes'
import {Button, ButtonModifier} from 'components/common/Button'
import {MediaCircle} from 'components/common/MediaCircle'

interface VideoCallProps {
  toggleVisibilityModal: (visibility: boolean) => void
  // TODO: Может быть стоит передавать это не в пропсах
  interlocutor: IUser
}

const INTERLOCUTOR_VIDEO_SIZE = 500

export const VideoCall: FC<VideoCallProps> = ({
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
    getMedia()

    return () => mediaStream.current?.getTracks().forEach(track => track.stop())
  }, [])

  return (
    <div className="video-call">
      <div className="video-call__area">
        <MediaCircle
          additionalClassName="video-call__area-circle video-call__area-circle--main"
          size={Sizes.LARGE}
          connecting={true}
          user={interlocutor}
        />
        <MediaCircle
          additionalClassName="video-call__area-circle video-call__area-circle--subsidiary"
          ref={videoRef}
          size={Sizes.SMALL}
          connecting={connecting}
          user={interlocutor}
        />
      </div>

      <Button
        onClick={endCall}
        additionalClassName="video-call__button"
        modifier={ButtonModifier.CIRCLE}
        icon={<Phone className="video-call__button-icon" />}
      />
    </div>
  )
}
