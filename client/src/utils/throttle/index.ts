import debounce from 'lodash.debounce'

export interface IOptions {
  leading?: boolean
  trailing?: boolean
}

const defaultOptions: IOptions = {
  leading: true,
  trailing: true,
}

export const throttle = (func: (...args: any[]) => void, wait: number, options = defaultOptions) => {
  return debounce(func, wait, {
    leading: options.leading,
    trailing: options.trailing,
    maxWait: wait,
  })
}

export default throttle
