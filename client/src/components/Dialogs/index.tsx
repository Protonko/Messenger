import type {IDialog} from 'models/dialog'
import type {RootState} from 'store/reducers'
import {useEffect, FC} from 'react'
import {useHistory, useLocation} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {getDialogs} from 'store/actions/dialogs'
import {Dialog} from 'components/common/Dialog'
import {Search} from 'components/common/Search'
import {ContentContainer} from 'components/common/ContentContainer'
import {CreateDialog} from 'components/CreateDialog'

export const Dialogs: FC = () => {
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()
  const {dialogs, loading, errorMessage} = useSelector(
    (state: RootState) => state.dialogs,
  )

  useEffect(() => {
    dispatch(getDialogs())
  }, [])

  const selectDialog = (id: string) => {
    history.push(`?dialog=${id}`)
  }

  const renderItem = (dialog: IDialog) => {
    const urlParams = new URLSearchParams(location.search)

    return (
      <li
        className="dialogs__item"
        key={dialog.id}
        onClick={() => selectDialog(dialog.id)}
      >
        <Dialog {...dialog} selected={urlParams.get('user') === dialog.id} />
      </li>
    )
  }

  return (
    <div className="dialogs">
      <div className="dialogs__header">
        <Search customStyles="dialogs__header-search-input" />
        <CreateDialog />
      </div>

      <ContentContainer loading={loading} errorMessage={errorMessage}>
        <ul className="dialogs__list list list--reset">
          {dialogs?.length ? (
            dialogs.map(renderItem)
          ) : (
            <li className="dialogs__item dialogs__item--empty">Empty</li>
          )}
        </ul>
      </ContentContainer>
    </div>
  )
}
