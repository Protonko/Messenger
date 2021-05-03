import {useState} from 'react'
import {ReactComponent as PencilPaper} from 'assets/icons/pencil-paper.svg'
import {TextTypes} from 'models/common/text'
import {Modal} from 'components/common/Modal'
import {Text} from 'components/common/Text'
import {User} from 'components/common/User'

export const CreateDialog = () => {
  const [modalVisibility, setModalVisibility] = useState(true);
  return (
    <>
      <PencilPaper
        className="dialogs__header-button"
        onClick={() => setModalVisibility(true)}
      />

      <Modal
        customStyles="dialogs-modal"
        modalVisibility={modalVisibility}
        toggleVisibilityModal={setModalVisibility}
        width={420}
        height={200}
      >
        <header className="dialogs-modal__section dialogs-modal__section--header">
          <Text type={TextTypes.h4} customStyles="dialogs-modal__title">
            New dialog
          </Text>

        </header>
        <div className="dialogs-modal__section dialogs-modal__section--body">
          <User name={'123 123'} src={''} description={'wqdwf'} />
        </div>
      </Modal>
    </>
  )
}
