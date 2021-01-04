// types
import {TextSize, TextTypes} from 'models/common/text';
import {IDialog} from 'models/dialog';

import {FC} from 'react'
import Dotdotdot from 'react-dotdotdot';
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
  status,
  readStatus,
}) => {
  const dateTime = time ?? date;

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
            <Counter count={2} status={status} />
          </div>
        </div>
    </div>
  )
}
