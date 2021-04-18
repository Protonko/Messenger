import {TextTypes} from 'models/common/text'
import {Text} from 'components/common/Text'
import {Dialogs} from 'components/Dialogs'

export const Chat = () => {
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
            <Dialogs dialogs={[]} />
          </div>
          <div className="chat__messages">
            Messages
          </div>
        </div>
      </div>
    </div>
  )
}
