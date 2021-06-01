import 'react-redux'

module.exports = {
  ...jest.requireActual('react-redux'),
  __esModule: true,
  useSelector: jest.fn(),
  useDispatch: () => jest.fn(),
  mockDispatch: jest.fn(),
  mockState: (state = {}) => {
    return jest.fn().mockImplementationOnce((callback) => {
      return callback(state)
    })
  },
}
