export const getCookie = (name: string): string => {
  return document.cookie
    .split('; ')
    .find(row => row.startsWith(`${name}=`))
    ?.split('=')[1]
    ?? ''
}
