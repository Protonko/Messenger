import {ReadStatus, Status} from 'models/common/status'
import {TextTypes} from 'models/common/text'
import {Text} from 'components/common/Text'
import {Dialog} from 'components/common/Dialog'
import {Search} from 'components/common/Search'

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
            <Search />
            <Dialog avatar={''} date={'asdfsf'} description={''} messages={0} name={'wqe'} readStatus={ReadStatus.READ} status={Status.ACTIVE} time={'koj'} />
            <Dialog avatar={''} date={''} description={''} messages={2} name={'wqe'} readStatus={null} status={Status.ACTIVE} time={''} />
          </div>
          <div className="chat__messages">
            Messages
          </div>
        </div>
      </div>
    </div>
  )
}
