import {DialogsList} from './components/DialogsList';
import {Input} from './components/common/Input';
import {Status} from './models/common/status';

function App() {
  return (
    <>
      <Input value={''} placeholder={'233'} onChange={event => {}} withLabel={true} />
      <DialogsList dialogs={[{
        name: 'string fjew9fghrge rnveiovjreh89t u34rwe0f jerg9e4hy90fjergirehfgjewfmergiorehgreg',
        description: 'string',
        avatar: 'string',
        date: '01.01.10',
        time: null,
        status: Status.MUTED,
        readStatus: null,
        messages: 0
      }, {
        name: 'string',
        description: 'string',
        avatar: 'string',
        date: '10.10.01',
        time: null,
        status: Status.ACTIVE,
        readStatus: null,
        messages: 22
      }]} />
    </>
  )
}

export default App
