import 'jsdom-global/register';
import {configure} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({adapter: new Adapter()});

jest.mock('axios')

// Fail tests on any warning
console.error = (message: any) => {
  throw new Error(message);
};
