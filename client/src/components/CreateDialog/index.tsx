import type {RootState} from 'store/reducers'
import type {IUser} from 'models/user'
import {useRef, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {ReactComponent as PencilPaper} from 'assets/icons/pencil-paper.svg'
import {TextTypes} from 'models/common/text'
import {Modal} from 'components/common/Modal'
import {Text} from 'components/common/Text'
import {User} from 'components/common/User'
import {ContentContainer} from 'components/common/ContentContainer'
import {getUsers, resetUsersState} from 'store/actions/users'

export const CreateDialog = () => {
  const {users, loading, errorMessage} = useSelector((state: RootState) => state.users)
  const dispatch = useDispatch()
  const [modalVisibility, setModalVisibility] = useState(false);
  const buttonRef = useRef(null)

  const renderUsers = (user: IUser) => {
    return (
      <li className="users__item" key={user.id}>
        <User name={user.full_name} src={user.avatar ?? ''} description={user.last_seen.toString()} />
      </li>
    )
  }

  const onOpenModal = () => {
    dispatch(getUsers())
    setModalVisibility(true)
  }

  return (
    <>
      <PencilPaper
        ref={buttonRef}
        className="dialogs__header-button"
        onClick={onOpenModal}
      />

      <Modal
        customStyles="dialogs-modal"
        initiatorRef={buttonRef}
        modalVisibility={modalVisibility}
        toggleVisibilityModal={setModalVisibility}
        onClose={() => dispatch(resetUsersState())}
        width={420}
        height={200}
      >
        <header className="dialogs-modal__section dialogs-modal__section--header">
          <Text type={TextTypes.h4} customStyles="dialogs-modal__title">
            New dialog
          </Text>
        </header>

        <div className="dialogs-modal__section dialogs-modal__section--body">
          <ContentContainer loading={loading} errorMessage={errorMessage}>
            <ul className="users list list--reset">
              {users?.length ? users.map(renderUsers) : <li className="users__item users__item--empty">Empty</li>}
            </ul>
          </ContentContainer>
        </div>
      </Modal>
    </>
  )
}
