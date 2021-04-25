import {isDarkColor} from 'utils/isDarkColor'

describe('isDarkColor', () => {
  const blackRGB = {
    red: 0,
    green: 0,
    blue: 0,
  }
  const whiteRGB = {
    red: 255,
    green: 255,
    blue: 255,
  }

  it('Should return true', () => {
    expect(isDarkColor(blackRGB)).toBe(true)
  })

  it('Should get string value', () => {
    expect(isDarkColor('#ffffff')).toBe(false)
  })

  it('Should get invalid string value', () => {
    expect(isDarkColor('test')).toBe(true)
  })

  it('Should return false', () => {
    expect(isDarkColor(whiteRGB)).toBe(false)
  })
})
