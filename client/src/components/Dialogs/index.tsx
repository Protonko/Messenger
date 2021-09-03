import type {IDialog} from 'models/dialog'
import type {RootState} from 'store/reducers'
import {useEffect, useState, FC, MouseEvent as ReactMouseEvent} from 'react'
import {useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {useSearchParams} from 'hooks/useSearchParams'
import {useTyping} from 'hooks/useTyping'
import {changeReadStatus, getDialogs, updateLastMessage} from 'store/actions/dialogs'
import {socket} from 'utils/socket'
import {EventsSocket} from 'models/common/socket'
import {Dialog} from 'components/common/Dialog'
import {Search} from 'components/common/Search'
import {ContentContainer} from 'components/common/ContentContainer'
import {CreateDialog} from 'components/CreateDialog'

export const Dialogs: FC = () => {
  const history = useHistory()
  const dialogParam = useSearchParams('dialog')
  const [typing, typingHandler] = useTyping()
  const [typingMessageAuthorId, seTypingMessageAuthorId] = useState<string>()
  const dispatch = useDispatch()
  const {account} = useSelector((state: RootState) => state.auth)
  const {dialogs, loading, errorMessage} = useSelector(
    (state: RootState) => state.dialogs,
  )

  useEffect(() => {
    socket.on(EventsSocket.NEW_DIALOG, (dialog: IDialog) => {
      console.log(dialog)
    })

    socket.on(EventsSocket.READ_MESSAGE, (dialogId: string) => {
      dispatch(changeReadStatus(dialogId))
    })

    socket.on(EventsSocket.TYPING_MESSAGE, (authorId: string) => {
      seTypingMessageAuthorId(authorId)
      typingHandler()
    })

    socket.on(EventsSocket.UPDATE_LAST_MESSAGE, (dialog: IDialog) => {
      dispatch(updateLastMessage(dialog))
    })
  }, [])

  useEffect(() => {
    dispatch(getDialogs())
  }, [])

  const selectDialog = (
    event: ReactMouseEvent<HTMLUListElement, MouseEvent>,
  ) => {
    const element = (event.target as HTMLUListElement).closest('.dialogs__item')

    if (!element) return

    history.push(`?dialog=${element.id}`)
  }

  const renderItem = (dialog: IDialog) => {
    return (
      <li className="dialogs__item" key={dialog.id} id={dialog.id}>
        <Dialog
          {...dialog}
          isTyping={typingMessageAuthorId === dialog.interlocutor.id && typing}
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
        <ul className="dialogs__list list list--reset" onClick={selectDialog}>
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
