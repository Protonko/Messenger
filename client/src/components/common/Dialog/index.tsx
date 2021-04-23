import type {FC} from 'react'
import type {IDialog} from 'models/dialog'
import {ReadStatus} from 'models/common/status'
import {TextSize, TextTypes} from 'models/common/text'
import {ReactComponent as DoubleCheck} from 'assets/icons/double-check.svg'
import {ReactComponent as Check} from 'assets/icons/check.svg'
import {COLORS} from 'static/colors'
import {Text} from 'components/common/Text'
import {Counter} from 'components/common/Counter'
import {Avatar} from 'components/common/Avatar'

export const Dialog: FC<IDialog> = ({
  name,
  description,
  avatar,
  edited,
  createdAt,
  updatedAt,
  messages,
  status,
  readStatus,
}) => {
  const counter = messages.toString().length > 2 ? '99+' : messages

  const renderStatus = () => {
    if (!!counter) {
      return <Counter count={counter} status={status}/>
    }

    if (readStatus) {
      const props = {
        width: 15,
        height: 15,
        color: COLORS.dustyGray,
      }
      return readStatus === ReadStatus.READ ? <DoubleCheck {...props} /> : <Check {...props} />
    }

    return null
  }

  return (
    <div className="dialog">
      <Avatar src={avatar} />

      <div className="dialog__data">
        <div className="dialog__text">
          <Text
            type={TextTypes.h4}
            customStyles="dialog__text-title"
            numberOfLines={1}
          >
            {name}
          </Text>
          <Text>{description}</Text>
        </div>

        <div className="dialog__info">
          <Text
            type={TextTypes.mixed}
            size={TextSize.EXTRA_SMALL}
            customStyles="dialog__info-date"
          >
            {new Date(edited ? updatedAt : createdAt).toLocaleDateString()}
          </Text>

          {renderStatus()}
        </div>
      </div>
    </div>
  )
}
