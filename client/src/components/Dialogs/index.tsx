import type {IDialog} from 'models/dialog'
import type {RootState} from 'store/reducers'
import {useEffect, FC} from 'react'
import {useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {useSearchParams} from 'hooks/useSearchParams'
import {useTyping} from 'hooks/useTyping'
import {changeReadStatus, getDialogs} from 'store/actions/dialogs'
import {socket} from 'utils/socket'
import {EVENTS_SOCKET} from 'models/common/socket'
import {Dialog} from 'components/common/Dialog'
import {Search} from 'components/common/Search'
import {ContentContainer} from 'components/common/ContentContainer'
import {CreateDialog} from 'components/CreateDialog'

export const Dialogs: FC = () => {
  const history = useHistory()
  const dialogParam = useSearchParams('dialog')
  const [typing, typingHandler] = useTyping()
  const dispatch = useDispatch()
  const {account} = useSelector((state: RootState) => state.auth)
  const {dialogs, loading, errorMessage} = useSelector(
    (state: RootState) => state.dialogs,
  )

  useEffect(() => {
    socket.on(EVENTS_SOCKET.NEW_DIALOG, (dialog: IDialog) => {
      console.log(dialog)
    })

    socket.on(EVENTS_SOCKET.READ_MESSAGE, (dialogId: string) => {
      dispatch(changeReadStatus(dialogId))
    })

    socket.on(EVENTS_SOCKET.TYPING_MESSAGE, () => {
      typingHandler()
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
        <Dialog
          {...dialog}
          isTyping={typing}
          isOwnMessage={account?.id === dialog.lastMessage?.author?.id}
          selected={dialogParam === dialog.id}
        />
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
