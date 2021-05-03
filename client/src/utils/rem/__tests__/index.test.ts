import {rem} from 'utils/rem'

describe('rem', () => {
  it('should return 1rem', () => {
    expect(rem(16)).toBe('1rem')
  })

  it('should return 0.5rem', () => {
    expect(rem(16, 32)).toBe('0.5rem')
  })
})
