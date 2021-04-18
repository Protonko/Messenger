import type {IDialog} from 'models/dialog'
import {useEffect, FC} from 'react';
import {useDispatch} from 'react-redux'
import hash from 'object-hash'
import {Dialog} from 'components/common/Dialog'
import {Search} from 'components/common/Search'
import {getDialogs} from 'store/actions/dialogs'

interface IPropsDialogs {
  dialogs: IDialog[]
}

export const Dialogs: FC<IPropsDialogs> = ({dialogs}) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getDialogs())
  }, [])
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
