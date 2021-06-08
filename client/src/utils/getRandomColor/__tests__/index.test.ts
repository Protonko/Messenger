import {getRandomColor} from 'utils/getRandomColor'

describe('getRandomColor', () => {
  it('Should return #7fffff color', () => {
    expect(getRandomColor()).toBe('#7fffff')
  })
})
