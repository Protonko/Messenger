import {useState} from 'react'
import {TYPING_TIMEOUT} from 'static/constants'

export const useTyping = (): [boolean, () => void] => {
  let typingTimeoutLabel: NodeJS.Timeout;
  const [typing, setTyping] = useState(false)

  const typingHandler = () => {
    setTyping(true);
    clearInterval(typingTimeoutLabel);
    typingTimeoutLabel = setTimeout(() => {
      setTyping(false);
    }, TYPING_TIMEOUT);
  }

  return [typing, typingHandler]
}
