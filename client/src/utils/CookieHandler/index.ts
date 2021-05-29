export class CookieHandler {
  static getCookie(name: string) {
    return document.cookie
        .split('; ')
        .find(row => row.startsWith(`${name}=`))
        ?.split('=')[1]
      ?? ''
  }

  static setCookie(name: string, value: string, options: Record<string, any> = {}) {
    options = {
      path: '/',
      ...options,
    }

    if (options.expires instanceof Date) {
      options.expires = options.expires.toUTCString()
    }

    let updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`

    for (let optionKey in options) {
      updatedCookie += '; ' + optionKey
      let optionValue = options[optionKey]
      if (optionValue !== true) {
        updatedCookie += '=' + optionValue
      }
    }

    document.cookie = updatedCookie
  }

  static deleteCookie(name: string) {
    CookieHandler.setCookie(name, '', {'max-age': -1})
  }
}
