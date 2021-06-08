import type {FC} from 'react'
import classNames from 'classnames'
import {TextTypes} from 'models/common/text'
import {Text} from 'components/common/Text'

export interface ITagProps {
  text: string
  customStyles?: string
}

export const Tag: FC<ITagProps> = ({text, customStyles}) => {
  const tagClassNames = classNames('tag', {
    [customStyles ?? '']: !!customStyles,
  })

  return (
    <div className={tagClassNames}>
      <Text customStyles="tag__text" numberOfLines={1} type={TextTypes.mixed}>
        {text}
      </Text>
    </div>
  )
}
