import type {FC} from 'react';
import type {IDialog} from 'models/dialog'
import hash from 'object-hash'
import {Dialog} from 'components/common/Dialog'
import {Search} from 'components/common/Search'

interface IPropsDialogs {
  dialogs: IDialog[]
}

export const Dialogs: FC<IPropsDialogs> = ({dialogs}) => {
  const renderItem = (dialog: IDialog) => {
    return (
      <li className="dialogs__item" key={hash(dialog)}>
        <Dialog {...dialog} />
      </li>
    )
  }

  return (
    <div className="dialogs">
      <div className="dialogs__search">
        <Search />
      </div>

      <ul className="dialogs__list list list--reset">
        {dialogs.map(renderItem)}
      </ul>
    </div>
  )
}
