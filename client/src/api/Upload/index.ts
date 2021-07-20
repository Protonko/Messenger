import type {AxiosError} from 'axios'
import {api} from 'api'

export class UploadApi {
  static uploadFiles(
    body: FormData,
    onUploadProgress: (progressEvent: ProgressEvent) => void,
  ): Promise<void | string> {
    return new Promise((resolve, reject) => {
      api
        .post('/upload', body, {onUploadProgress})
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
}
