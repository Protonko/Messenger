// types
import {Status} from 'models/common/status';
import {TextTypes} from 'models/common/text';

import {FC} from 'react'
import {Text} from 'components/common/Text';
import {Counter} from 'components/common/Counter';
import {Avatar} from 'components/common/Avatar';

export const Dialog: FC = () => {
  return (
    <div className="dialog">
        <Avatar src={''} />
        <div className="dialog__text">
          <Text type={TextTypes.h4}>Title</Text>
          <Text>jdifjsifjdfij</Text>
        </div>
        <div className="dialog__info">
          <Text>19:33</Text>
          <Counter count={2} status={Status.MUTED} />
        </div>
    </div>
  )
}
