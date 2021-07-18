export const generateUuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
    const randomNumber = (Math.random() * 16) | 0
    return (char == 'x' ? randomNumber : (randomNumber & 0x3) | 0x8).toString(
      16,
    )
  })
}
