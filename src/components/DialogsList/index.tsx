// types
import {IDialog} from 'models/dialog'

import {FC} from 'react'
import hash from 'object-hash'
import {Dialog} from 'components/common/Dialog'

export interface IPropsDialogList {
  dialogs: Array<IDialog>
}

export const DialogsList: FC<IPropsDialogList> = ({dialogs}) => {
  const renderItem = (elem: IDialog) => {
    return <Dialog key={hash(elem)} />
  }

  return (
    <div className="dialog-list">{dialogs.map(renderItem)}</div>
  )
}
