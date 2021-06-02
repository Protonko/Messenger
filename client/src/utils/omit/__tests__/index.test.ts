import {omit} from 'utils/omit'

describe('omit', () => {
  const obj = {
    key: 'value',
    secondKey: 'second value',
  }

  const result = {
    secondKey: 'second value',
  }

  it('should omit key', () => {
    expect(omit('key', obj)).toEqual(result)
  })
})
