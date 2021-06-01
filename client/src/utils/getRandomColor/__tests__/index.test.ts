import {getRandomColor} from 'utils/getRandomColor'

describe('getRandomColor', () => {
  const mockMath = Object.create(global.Math)
  mockMath.random = () => 0.5
  global.Math = mockMath

  it('Should return #7fffff color', () => {
    expect(getRandomColor()).toBe('#7fffff')
  })
})
