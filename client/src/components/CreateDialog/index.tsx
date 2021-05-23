import type {RootState} from 'store/reducers'
import type {IUser} from 'models/user'
import {useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {ReactComponent as PencilPaper} from 'assets/icons/pencil-paper.svg'
import {TextTypes} from 'models/common/text'
import {getUsers, resetUsersState, setSelectedUserId} from 'store/actions/users'
import {createDialog, resetCreateDialogState} from 'store/actions/dialogs'
import {Modal} from 'components/common/Modal'
import {Text} from 'components/common/Text'
import {User} from 'components/common/User'
import {Button} from 'components/common/Button'
import {Textarea} from 'components/common/Textarea'
import {ContentContainer} from 'components/common/ContentContainer'

export const CreateDialog = () => {
  const {users, loading, errorMessage, creating, createErrorMessage} = useSelector((state: RootState) => ({
    ...state.users,
    ...state.dialogs,
  }))
  const dispatch = useDispatch()
  const [modalStepOneVisibility, setModalStepOneVisibility] = useState(false)
  const [modalStepTwoVisibility, setModalStepTwoVisibility] = useState(false)
  const buttonRef = useRef(null)
  const usersRef = useRef(null)
  const message = useRef('')

  useEffect(() => {
    if (createErrorMessage === false) {
      setModalStepTwoVisibility(false)
    }
  }, [createErrorMessage])

  const renderUsers = (user: IUser) => {
    return (
      <li className="users__item" key={user.id} onClick={() => onClickUser(user.id)}>
        <User name={user.full_name} src={user.avatar ?? ''} description={user.last_seen.toString()} />
      </li>
    )
  }

  const onClickUser = (id: string) => {
    setModalStepOneVisibility(false)
    setModalStepTwoVisibility(true)
    dispatch(setSelectedUserId(id))
  }

  const onOpenModal = () => {
    dispatch(getUsers())
    setModalStepOneVisibility(true)
  }

  return (
    <>
      <PencilPaper
        ref={buttonRef}
        className="dialogs__header-button"
        onClick={onOpenModal}
      />

      {/* Step one - select users modal */}
      <Modal
        customStyles="dialogs-modal"
        initiatorRef={buttonRef}
        modalVisibility={modalStepOneVisibility}
        toggleVisibilityModal={setModalStepOneVisibility}
        width={420}
      >
        <header className="dialogs-modal__section dialogs-modal__section--header">
          <Text type={TextTypes.h4} customStyles="dialogs-modal__title">
            Select user
          </Text>
        </header>

        <div className="dialogs-modal__section dialogs-modal__section--body">
          <ContentContainer loading={loading} errorMessage={errorMessage}>
            <ul className="users list list--reset" ref={usersRef}>
              {users?.length ? users.map(renderUsers) : <li className="users__item users__item--empty">Empty</li>}
            </ul>
          </ContentContainer>
        </div>
      </Modal>

      {/* Step two - write a message modal */}
      <Modal
        customStyles="dialogs-modal"
        initiatorRef={usersRef}
        modalVisibility={modalStepTwoVisibility}
        toggleVisibilityModal={setModalStepTwoVisibility}
        onClose={() => {
          dispatch(resetUsersState())
          dispatch(resetCreateDialogState())
        }}
        width={420}
        height={300}
      >
        <header className="dialogs-modal__section dialogs-modal__section--header">
          <Text type={TextTypes.h4} customStyles="dialogs-modal__title">
            Write a message
          </Text>
        </header>

        <div className="dialogs-modal__section dialogs-modal__section--body">
          <ContentContainer
            customStyles={'dialogs-modal__error'}
            errorMessage={createErrorMessage}
            loading={creating}
          >
            <div className="dialogs-modal__textarea">
              <Textarea
                rows={10}
                value={message.current}
                onChange={value => message.current = value}
              />
            </div>
          </ContentContainer>
        </div>

        <footer className="dialogs-modal__section dialogs-modal__section--footer">
          <Button text="Create dialog" onClick={() => dispatch(createDialog(message.current))} />
        </footer>
      </Modal>
    </>
  )
}
