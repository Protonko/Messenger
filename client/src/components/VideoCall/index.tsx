import type {FC} from 'react'
import type {IUser} from 'models/user'
import {ReactComponent as Phone} from 'assets/icons/phone.svg'
import {Sizes} from 'models/common/sizes'
import {Button, ButtonModifier} from 'components/common/Button'
import {VideoCircle} from 'components/common/VideoCircle'

interface VideoCallProps {
  toggleVisibilityModal: (visibility: boolean) => void
  // TODO: Может быть стоит передавать это не в пропсах
  interlocutor: IUser
}

export const VideoCall: FC<VideoCallProps> = ({
  toggleVisibilityModal,
  interlocutor,
}) => {
  const endCall = () => toggleVisibilityModal(false)

  return (
    <div className="video-call">
      <div className="video-call__area">
        <VideoCircle
          additionalClassName="video-call__area-circle video-call__area-circle--main"
          size={Sizes.LARGE}
          connecting={true}
          user={interlocutor}
        />
        <VideoCircle
          additionalClassName="video-call__area-circle video-call__area-circle--subsidiary"
          size={Sizes.SMALL}
          connecting={true}
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
