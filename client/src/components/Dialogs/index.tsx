import type {IDialog} from 'models/dialog'
import type {IMessage} from 'models/message'
import type {RootState} from 'store/reducers'
import {useEffect, FC} from 'react'
import {useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {useSearchParams} from 'hooks/useSearchParams'
import {getDialogs} from 'store/actions/dialogs'
import {socket} from 'utils/socket'
import {EVENTS_SOCKET} from 'models/common/socket'
import {Dialog} from 'components/common/Dialog'
import {Search} from 'components/common/Search'
import {ContentContainer} from 'components/common/ContentContainer'
import {CreateDialog} from 'components/CreateDialog'
import {appendMessage} from 'store/actions/message'

export const Dialogs: FC = () => {
  const history = useHistory()
  const dialogParam = useSearchParams('dialog')
  const dispatch = useDispatch()
  const {dialogs, loading, errorMessage} = useSelector(
    (state: RootState) => state.dialogs,
  )

  useEffect(() => {
    socket.on(EVENTS_SOCKET.NEW_DIALOG, (dialog: IDialog) => {
      console.log(dialog)
    })
  }, [])

  useEffect(() => {
    dispatch(getDialogs())
  }, [])

  const selectDialog = (id: string) => {
    history.push(`?dialog=${id}`)
  }

  const renderItem = (dialog: IDialog) => {
    return (
      <li
        className="dialogs__item"
        key={dialog.id}
        onClick={() => selectDialog(dialog.id)}
      >
        <Dialog {...dialog} selected={dialogParam === dialog.id} />
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
