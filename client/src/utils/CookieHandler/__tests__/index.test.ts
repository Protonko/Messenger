import {CookieHandler} from 'utils/CookieHandler'

describe('CookieHandler', () => {
  global.document.cookie = 'test=test'

  it('getCookie', () => {
    expect(CookieHandler.getCookie('test')).toBe('test')
  })

  it('getCookie without value', () => {
    expect(CookieHandler.getCookie('non-existent_key')).toBe('')
  })

  it('setCookie with expires options', () => {
    CookieHandler.setCookie('key', 'value', {
      expires: new Date('2021-12-02'),
    })
    expect(CookieHandler.getCookie('key')).toBe('value')
  })

  it('setCookie without options', () => {
    CookieHandler.setCookie('key1', 'value1')
    expect(CookieHandler.getCookie('key1')).toBe('value1')
  })

  it('deleteCookie', () => {
    CookieHandler.deleteCookie('key1')
    expect(CookieHandler.getCookie('key1')).toBe('')
  })
})
