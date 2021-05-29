const decodeBase64ToUTF8 = (char: string) => {
  return '%' + ('00' + char.charCodeAt(0).toString(16)).slice(-2);
}

export const parseJWT = <T>(token: string): T => {
  const base64 = token
    .split('.')[1]
    .replace(/-/g, '+')
    .replace(/_/g, '/')

  const jsonPayload = decodeURIComponent(atob(base64)
    .split('')
    .map(decodeBase64ToUTF8)
    .join(''))

  return JSON.parse(jsonPayload);
};
