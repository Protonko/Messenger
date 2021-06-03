import {useLocation} from 'react-router-dom'
import {useMemo} from 'react'

export const useSearchParams = (key: string) => {
  const location = useLocation()
  return useMemo(() => {
    return new URLSearchParams(location.search).get(key)
  }, [location.search, key])
}
