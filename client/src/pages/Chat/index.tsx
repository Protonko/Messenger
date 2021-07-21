import type {RootState} from 'store/reducers'
import {useSelector} from 'react-redux'
import {ReactComponent as Phone} from 'assets/icons/phone.svg'
import {TextTypes} from 'models/common/text'
import {useSearchParams} from 'hooks/useSearchParams'
import {Text} from 'components/common/Text'
import {Dialogs} from 'components/Dialogs'
import {Messages} from 'components/Messages'
import {CreateMessageForm} from 'components/CreateMessageForm'
import {VideoCall} from 'components/VideoCall'
import {Modal} from 'components/common/Modal'
import {useState} from 'react'

const Chat = () => {
  const dialogParam = useSearchParams('dialog')
  const {dialogs} = useSelector((state: RootState) => state.dialogs)
  const [modalVisibility, setModalVisibility] = useState(false)
  const interlocutor = dialogs?.find(({id}) => id === dialogParam)?.interlocutor

  return (
    <div className="container">
      <div className="chat">
        <div className="chat__section chat__section--header">
          <div className="chat__col chat__col--sm">
            <Text type={TextTypes.h4} customStyles="chat__title">
              Messenger
            </Text>
          </div>
          <div className="chat__col chat__col--lg chat__col--space-between">
            <Text type={TextTypes.h4} customStyles="chat__title">
              {interlocutor?.full_name ?? ''}
            </Text>

            {interlocutor && (
              <Phone
                className="chat__call-icon"
                onClick={() => setModalVisibility(true)}
              />
            )}
          </div>
        </div>
        <div className="chat__section chat__section--body">
          <div className="chat__dialogs">
            <Dialogs />
          </div>
          <div className="chat__messages">
            <Messages />
            {dialogParam && <CreateMessageForm />}
          </div>
        </div>
      </div>

      <Modal modalVisibility={modalVisibility}>
        {/* TODO: исправить типизацию interlocutor */}
        <VideoCall
          interlocutor={interlocutor!}
          toggleVisibilityModal={setModalVisibility}
        />
      </Modal>
    </div>
  )
}

export default Chat
