import 'jsdom-global/register';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({adapter: new Adapter()});

// Fail tests on any warning
console.error = (message: any) => {
  throw new Error(message);
};
