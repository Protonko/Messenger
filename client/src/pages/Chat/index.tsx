import {useState} from 'react'
import {TextTypes} from 'models/common/text'
import {useSearchParams} from 'hooks/useSearchParams'
import {Text} from 'components/common/Text'
import {Dialogs} from 'components/Dialogs'
import {Messages} from 'components/Messages'
import {VideoCall} from 'components/VideoCall'
import {ChatHeader} from 'components/ChatHeader'
import {MessageForm} from 'components/MessageForm'
import {ChatContextProvider} from 'context/ChatContext'

const Chat = () => {
  const dialogParam = useSearchParams('dialog')
  const [calling, setCalling] = useState(false)

  return (
    <ChatContextProvider>
      <div className="container">
        <div className="chat">
          <div className="chat__section chat__section--header">
            <div className="chat__col chat__col--sm">
              <Text type={TextTypes.h4} customStyles="chat__title">
                Messenger
              </Text>
            </div>
            <div className="chat__col chat__col--lg">
              <ChatHeader onPhoneClick={() => setCalling(true)} />
            </div>
          </div>
          <div className="chat__section chat__section--body">
            <div className="chat__dialogs">
              <Dialogs />
            </div>
            <div className="chat__messages">
              <Messages />
              {dialogParam && <MessageForm />}
            </div>
          </div>
        </div>

        <VideoCall calling={calling} setCalling={setCalling} />
      </div>
    </ChatContextProvider>
  )
}

export default Chat
