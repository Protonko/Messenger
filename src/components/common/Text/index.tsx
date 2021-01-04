// types
import {TextTypes, TextSize, TextWeight} from 'models/common/text'

import {FC} from 'react'
import classNames from 'classnames';

export interface IPropsText {
  type?: TextTypes,
  weight?: TextWeight,
  size?: TextSize,
  children: string,
  customStyles?: string,
}

export const Text: FC<IPropsText> = ({
  type = TextTypes.p,
  weight,
  size,
  children,
  customStyles,
}) => {
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
    {customStyles: !!customStyles}
  )

  switch (type) {
    case TextTypes.h1:
      return <h1 className="text text--heading-1">{children}</h1>
    case TextTypes.h2:
      return <h2 className="text text--heading-2">{children}</h2>
    case TextTypes.h3:
      return <h3 className="text text--heading-3">{children}</h3>
    case TextTypes.h4:
      return <h4 className="text text--heading-4">{children}</h4>
    case TextTypes.h5:
      return <h5 className="text text--heading-5">{children}</h5>
    case TextTypes.h6:
      return <h6 className="text text--heading-6">{children}</h6>
    case TextTypes.p:
      return <p className="text text--description">{children}</p>
    case TextTypes.mixed:
      return <p className={classNamesMixed}>{children}</p>
    default:
      return <p className="text text--description">{children}</p>
  }
}
