import {TextTypes} from 'models/common/text'
import {useSearchParams} from 'hooks/useSearchParams'
import {Text} from 'components/common/Text'
import {Dialogs} from 'components/Dialogs'
import {Messages} from 'components/Messages'
import {CreateMessageForm} from 'components/CreateMessageForm'

const Chat = () => {
  const dialogParam = useSearchParams('dialog')

  return (
    <div className="container">
      <div className="chat">
        <div className="chat__section chat__section--header">
          <Text type={TextTypes.h4} customStyles="chat__title">
            Messenger
          </Text>
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
    </div>
  )
}

export default Chat
