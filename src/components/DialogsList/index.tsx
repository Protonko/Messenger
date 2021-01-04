// types
import {IDialog} from 'models/dialog'

import {FC} from 'react'
import hash from 'object-hash'
import {Dialog} from 'components/common/Dialog'

export interface IPropsDialogList {
  dialogs: Array<IDialog>
}

export const DialogsList: FC<IPropsDialogList> = ({dialogs}) => {
  const renderItem = (dialog: IDialog) => {
    return (
      <li className="dialogs__item" key={hash(dialog)}>
        <Dialog {...dialog} />
      </li>
    )
  }

  return (
    <div className="dialogs">
      <ul className="dialogs__list list list--reset">
        {dialogs.map(renderItem)}
      </ul>
    </div>
  )
}
