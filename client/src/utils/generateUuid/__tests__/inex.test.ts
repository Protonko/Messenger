import {generateUuid} from 'utils/generateUuid'

describe('generateUuid', () => {
  Math.random = () => 0.5

  it('Should generate uuid', () => {
    expect(generateUuid()).toBe('88888888-8888-4888-8888-888888888888')
  })
})
