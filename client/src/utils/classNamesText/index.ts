import classNames from 'classnames'

export const classNamesText = (
  modifier: string,
  customStyles?: string,
): string => {
  return classNames('text', `text--${modifier}`, {
    [customStyles ?? '']: !!customStyles,
  })
}
