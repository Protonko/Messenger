import {useEffect, RefObject} from 'react'

export const useOutsideClick = <T extends HTMLElement>(
  ref: RefObject<T>,
  callback: () => void,
): void => {
  const handleClick = (event: Event): any => {
    const target = event.target as HTMLElement

    if (ref.current && !ref.current.contains(target)) {
      callback()
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  })
}
