import type {IDialog} from 'models/dialog'
import {useEffect, FC} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {ReactComponent as PencilPaper} from 'assets/icons/pencil-paper.svg'
import {RootState} from 'store/reducers'
import {getDialogs} from 'store/actions/dialogs'
import {Dialog} from 'components/common/Dialog'
import {Search} from 'components/common/Search'
import {ContentContainer} from 'components/common/ContentContainer'

export const Dialogs: FC = () => {
  const dispatch = useDispatch()
  const {dialogs, loading, errorMessage} = useSelector((state: RootState) => state.dialogs)

  useEffect(() => {
    dispatch(getDialogs())
  }, [])

  const renderItem = (dialog: IDialog) => {
    return (
      <li className="dialogs__item" key={dialog.id}>
        <Dialog {...dialog} />
      </li>
    )
  }

  return (
    <div className="dialogs">
      <div className="dialogs__header">
        <Search customStyles="dialogs__header-search-input" />
        <PencilPaper className="dialogs__header-button" />
      </div>

      <ContentContainer loading={loading} errorMessage={errorMessage}>
        <ul className="dialogs__list list list--reset">
          {dialogs?.length ? dialogs.map(renderItem) : <li className="dialogs__item dialogs__item--empty">Empty</li>}
        </ul>
      </ContentContainer>
    </div>
  )
}
