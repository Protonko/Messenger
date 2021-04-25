import {hexToRgb} from 'utils/hexToRGB'

describe('hexToRGB', () => {
  it('Should return rgb from hex', () => {
    expect(hexToRgb('#000000')).toEqual({
      red: 0,
      green: 0,
      blue: 0,
    })
  })

  it('Should return null', () => {
    expect(hexToRgb('test')).toBe(null)
  })
})
