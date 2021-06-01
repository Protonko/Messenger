import type {RootState} from 'store/reducers'
import type {IUser} from 'models/user'
import {forwardRef} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {TextTypes} from 'models/common/text'
import {setSelectedUserId} from 'store/actions/users'
import {Text} from 'components/common/Text'
import {User} from 'components/common/User'
import {ContentContainer} from 'components/common/ContentContainer'

interface ISelectUsersProps {
  setModalStepOneVisibility: (visible: boolean) => void
  setModalStepTwoVisibility: (visible: boolean) => void
}

export const SelectUsers = forwardRef<HTMLUListElement, ISelectUsersProps>(
  ({setModalStepOneVisibility, setModalStepTwoVisibility}, ref) => {
    const {users, loading, errorMessage} = useSelector(
      (state: RootState) => state.users,
    )
    const dispatch = useDispatch()

    const renderUsers = (user: IUser) => {
      return (
        <li
          className="users__item"
          key={user.id}
          onClick={() => onSelectUser(user.id)}
        >
          <User
            name={user.full_name}
            src={user.avatar ?? ''}
            description={user.last_seen.toString()}
          />
        </li>
      )
    }

    const onSelectUser = (id: string) => {
      setModalStepOneVisibility(false)
      setModalStepTwoVisibility(true)
      dispatch(setSelectedUserId(id))
    }

    return (
      <>
        <header className="dialogs-modal__section dialogs-modal__section--header">
          <Text type={TextTypes.h4} customStyles="dialogs-modal__title">
            Select user
          </Text>
        </header>

        <div className="dialogs-modal__section dialogs-modal__section--body">
          <ContentContainer loading={loading} errorMessage={errorMessage}>
            <ul className="users list list--reset" ref={ref}>
              {users?.length ? (
                users.map(renderUsers)
              ) : (
                <li className="users__item users__item--empty">Empty</li>
              )}
            </ul>
          </ContentContainer>
        </div>
      </>
    )
  },
)
