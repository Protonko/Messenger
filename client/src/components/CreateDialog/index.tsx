import type {RootState} from 'store/reducers'
import {useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {ReactComponent as PencilPaper} from 'assets/icons/pencil-paper.svg'
import {getUsers, resetUsersState} from 'store/actions/users'
import {resetCreateDialogState} from 'store/actions/dialogs'
import {Modal} from 'components/common/Modal'
import {WriteMessage} from './WriteMessage'
import {SelectUsers} from './SelectUsers'

export const CreateDialog = () => {
  const {createErrorMessage} = useSelector((state: RootState) => state.dialogs)
  const dispatch = useDispatch()
  const [modalStepOneVisibility, setModalStepOneVisibility] = useState(false)
  const [modalStepTwoVisibility, setModalStepTwoVisibility] = useState(false)
  const buttonRef = useRef(null)
  const usersRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    if (createErrorMessage === false) {
      setModalStepTwoVisibility(false)
    }
  }, [createErrorMessage])

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
        additionalClassName="dialogs-modal"
        initiatorRef={buttonRef}
        modalVisibility={modalStepOneVisibility}
        toggleVisibilityModal={setModalStepOneVisibility}
        width={420}
        withModalTemplate={true}
      >
        <SelectUsers
          ref={usersRef}
          setModalStepOneVisibility={setModalStepOneVisibility}
          setModalStepTwoVisibility={setModalStepTwoVisibility}
        />
      </Modal>

      {/* Step two - write a message modal */}
      <Modal
        additionalClassName="dialogs-modal"
        initiatorRef={usersRef}
        modalVisibility={modalStepTwoVisibility}
        toggleVisibilityModal={setModalStepTwoVisibility}
        onClose={() => {
          dispatch(resetUsersState())
          dispatch(resetCreateDialogState())
        }}
        width={420}
        height={300}
        withModalTemplate={true}
      >
        <WriteMessage />
      </Modal>
    </>
  )
}
