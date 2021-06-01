import type {FC} from 'react'
import {
  TextTypes,
  TextSize,
  TextWeight,
  TNumberOfLines,
} from 'models/common/text'
import classNames from 'classnames'
import {classNamesText} from 'utils/classNamesText'
import {withDot} from 'hoc/withDot'

export interface IPropsText {
  type?: TextTypes
  weight?: TextWeight
  size?: TextSize
  children: string
  customStyles?: string
  numberOfLines?: TNumberOfLines
}

export const Text: FC<IPropsText> = withDot<IPropsText>(
  ({type = TextTypes.p, weight, size, children, customStyles}) => {
    const classNamesMixed = classNames(
      'text',
      // weight
      {'text--light': weight === TextWeight.LIGHT},
      {'text--regular': weight === TextWeight.REGULAR},
      {'text--medium': weight === TextWeight.MEDIUM},
      {'text--bold': weight === TextWeight.BOLD},
      // sizes
      {'text--xs': size === TextSize.EXTRA_SMALL},
      {'text--sm': size === TextSize.SMALL},
      {'text--md': size === TextSize.MEDIUM},
      {'text--lg': size === TextSize.BIG},
      {'text--xl': size === TextSize.LARGE},
      {'text--xxl': size === TextSize.EXTRA_LARGE},
      // custom
      {[customStyles ?? '']: !!customStyles},
    )

    switch (type) {
      case TextTypes.h1:
        return (
          <h1 className={classNamesText('heading-1', customStyles)}>
            {children}
          </h1>
        )

      case TextTypes.h2:
        return (
          <h2 className={classNamesText('heading-2', customStyles)}>
            {children}
          </h2>
        )

      case TextTypes.h3:
        return (
          <h3 className={classNamesText('heading-3', customStyles)}>
            {children}
          </h3>
        )

      case TextTypes.h4:
        return (
          <h4 className={classNamesText('heading-4', customStyles)}>
            {children}
          </h4>
        )

      case TextTypes.h5:
        return (
          <h5 className={classNamesText('heading-5', customStyles)}>
            {children}
          </h5>
        )

      case TextTypes.h6:
        return (
          <h6 className={classNamesText('heading-6', customStyles)}>
            {children}
          </h6>
        )

      case TextTypes.p:
        return (
          <p className={classNamesText('description', customStyles)}>
            {children}
          </p>
        )

      case TextTypes.mixed:
        return <p className={classNamesMixed}>{children}</p>

      default:
        return (
          <p className={classNamesText('description', customStyles)}>
            {children}
          </p>
        )
    }
  },
)
