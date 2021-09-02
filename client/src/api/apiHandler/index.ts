import type {AxiosError, AxiosResponse} from 'axios'

export const apiHandler = <T>(promise: Promise<AxiosResponse<T>>): Promise<T | AxiosResponse | string> => {
  return new Promise((resolve, reject) => {
    promise
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data)
        } else {
          reject(response.statusText)
        }
      })
      .catch((error: AxiosError) => reject(error.response))
  })
}
