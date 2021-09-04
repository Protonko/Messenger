import {mount} from 'enzyme'
import {ChatContextProvider} from 'context/ChatContext/ChatContextProvider'

describe('ChatContextProvider', () => {
  const children = <div>123</div>
  it('Should render component', () => {
    expect(
      mount(<ChatContextProvider>{children}</ChatContextProvider>),
    ).toMatchSnapshot('ChatContextProvider')
  })
})
