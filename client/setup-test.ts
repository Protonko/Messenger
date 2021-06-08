import 'jsdom-global/register'
import {configure} from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'

configure({adapter: new Adapter()})

jest.mock('axios')

const mockMath = Object.create(global.Math)
mockMath.random = () => 0.5
global.Math = mockMath

// Fail tests on any warning
console.error = (message: string) => {
  throw new Error(message)
}
