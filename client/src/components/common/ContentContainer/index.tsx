import type {FC} from 'react'
import {Loader} from 'components/common/Loader'
import {Text} from 'components/common/Text'

export interface IContentContainerProps {
  loading: boolean
  errorMessage: string | null | false
  customStyles?: string
  children: JSX.Element
}

export const ContentContainer: FC<IContentContainerProps> = ({
  loading,
  errorMessage,
  customStyles,
  children,
}) => {
  if (errorMessage) {
    return <Text customStyles={customStyles}>{errorMessage}</Text>
  }

  if (loading) {
    return <Loader center={true} />
  }

  return children
}
