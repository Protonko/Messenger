import type {FC} from 'react'
import {Loader} from 'components/common/Loader'
import {Text} from 'components/common/Text'

interface ContentContainerProps {
  loading: boolean
  errorMessage: string | null
  children: JSX.Element
}

export const ContentContainer: FC<ContentContainerProps> = ({
  loading,
  errorMessage,
  children,
}) => {
  if (errorMessage) {
    return <Text>{errorMessage}</Text>
  }

  if (loading) {
    return <Loader center={true} />
  }

  return children
}
