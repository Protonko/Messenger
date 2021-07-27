import type {IUser} from 'models/user'
import {useEffect, FC} from 'react'
import callSound from 'assets/audio/call-sound.mp3'
import {ReactComponent as Phone} from 'assets/icons/phone.svg'
import {Sizes} from 'models/common/sizes'
import {EVENTS_SOCKET} from 'models/common/socket'
import {Button, ButtonModifier} from 'components/common/Button'
import {MediaCircle} from 'components/common/MediaCircle'
import {socket} from 'utils/socket'

interface ICallAlertProps {
  interlocutor: IUser
  toggleVisibilityModal: (visibility: boolean) => void
  showConversationModal: () => void
  declineCall: () => void
  peerConnection: RTCPeerConnection
}

const audio = new Audio(callSound)

export const CallAlert: FC<ICallAlertProps> = ({
    interlocutor,
    toggleVisibilityModal,
    showConversationModal,
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
    showConversationModal()
    toggleVisibilityModal(false)

    peerConnection.onicecandidate = ({candidate}) => {
      if (candidate) {
        socket.emit(EVENTS_SOCKET.RELAY_ICE, interlocutor, candidate)
      }
    }

    // Create offer
    const offer = await peerConnection.createOffer()
    await peerConnection.setLocalDescription(offer)
    socket.emit(EVENTS_SOCKET.RELAY_SESSION_DESCRIPTION, interlocutor.id, offer)
    console.log('CREATE OFFER', 1)
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
