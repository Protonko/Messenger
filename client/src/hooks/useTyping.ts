import {useState} from 'react'
import {TYPING_TIMEOUT} from 'static/constants'

export const useTyping = (): [boolean, () => void] => {
  let typingTimeoutLabel: number
  const [typing, setTyping] = useState(false)

  const typingHandler = () => {
    setTyping(true)
    clearInterval(typingTimeoutLabel)
    typingTimeoutLabel = window.setTimeout(() => {
      setTyping(false)
    }, TYPING_TIMEOUT)
  }

  return [typing, typingHandler]
}
