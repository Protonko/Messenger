// types
import {TextSize, TextTypes} from 'models/common/text';
import {IDialog} from 'models/dialog';

import {FC} from 'react'
import {Text} from 'components/common/Text';
import {Counter} from 'components/common/Counter';
import {Avatar} from 'components/common/Avatar';

interface IPropsDialog extends IDialog {}

export const Dialog: FC<IPropsDialog> = ({
  name,
  description,
  avatar,
  date,
  time,
  messages,
  status,
  readStatus,
}) => {
  const dateTime = time ?? date;
  const counter = messages.toString().length > 2 ? '99+' : messages;

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
            {dateTime}
          </Text>

          {!!messages ? <Counter count={counter} status={status}/> : null}
        </div>
      </div>
    </div>
  )
}
