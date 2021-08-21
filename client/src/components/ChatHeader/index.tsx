import type {FC} from 'react'
import type {RootState} from 'store/reducers'
import {useSelector} from 'react-redux'
import {ReactComponent as Phone} from 'assets/icons/phone.svg'
import {TextTypes} from 'models/common/text'
import {Text} from 'components/common/Text'
import {useSearchParams} from 'hooks/useSearchParams'

interface IChatHeaderProps {
  onPhoneClick: () => void
}

export const ChatHeader: FC<IChatHeaderProps> = ({onPhoneClick}) => {
  const dialogParam = useSearchParams('dialog')
  const {dialogs} = useSelector((state: RootState) => state.dialogs)
  const interlocutor = dialogs?.find(({id}) => id === dialogParam)?.interlocutor

  if (interlocutor) {
    return (
      <div className="chat-header">
        <div className="chat-header__text">
          <Text type={TextTypes.h4} customStyles="chat-header__title">
            {interlocutor.full_name ?? ''}
          </Text>

          <Text type={TextTypes.p} customStyles="chat-header__description">
            {`(Last seen: ${new Date(interlocutor.last_seen).toLocaleString() ?? ''})`}
          </Text>
        </div>

        <Phone
          className="chat-header__call-icon"
          onClick={onPhoneClick}
        />
      </div>
    )
  }

  return <div className="chat-header" />
}
