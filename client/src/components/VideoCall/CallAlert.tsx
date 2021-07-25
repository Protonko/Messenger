import type {IUser} from 'models/user'
import {useEffect, FC} from 'react'
import callSound from 'assets/audio/call-sound.mp3'
import {ReactComponent as Phone} from 'assets/icons/phone.svg'
import {Sizes} from 'models/common/sizes'
import {Button, ButtonModifier} from 'components/common/Button'
import {MediaCircle} from 'components/common/MediaCircle'
import {socket} from 'utils/socket'
import {EVENTS_SOCKET} from 'models/common/socket'

interface ICallAlertProps {
  interlocutor: IUser
  toggleVisibilityModal: (visibility: boolean) => void
  showVideoCallModal: () => void
  declineCall: () => void
  peerConnection: RTCPeerConnection
}

const audio = new Audio(callSound)

export const CallAlert: FC<ICallAlertProps> = (
  {interlocutor,
    toggleVisibilityModal,
    showVideoCallModal,
    declineCall,
    peerConnection,
  }) => {
  useEffect(() => {
    audio.play()

    return () => {
      audio.pause()
      audio.currentTime = 0
    }
  }, [])

  const onAcceptCall = async () => {
    const offer = await peerConnection.createOffer()
    await peerConnection.setLocalDescription(offer)
    socket.emit(EVENTS_SOCKET.CREATE_OFFER, interlocutor.id, offer)
    toggleVisibilityModal(false)
    showVideoCallModal()
  }

  return (
    <div className="call-alert">
      <MediaCircle
        additionalClassName="call-alert__circle"
        size={Sizes.LARGE}
        connecting={true}
        user={interlocutor}
      />

      <ul className='call-alert__actions list list--reset'>
        <li className='call-alert__action'>
          <Button
            onClick={onAcceptCall}
            additionalClassName="call-alert__button call-alert__button--accept"
            modifier={ButtonModifier.CIRCLE}
            icon={<Phone className="call-alert__button-icon" />}
          />
        </li>
        <li className='call-alert__action'>
          <Button
            onClick={declineCall}
            additionalClassName="call-alert__button call-alert__button--decline"
            modifier={ButtonModifier.CIRCLE}
            icon={<Phone className="call-alert__button-icon" />}
          />
        </li>
      </ul>
    </div>
  )
}
