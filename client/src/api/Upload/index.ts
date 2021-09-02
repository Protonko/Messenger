import type {AxiosError, AxiosResponse} from 'axios'
import {api} from 'api'

export class UploadApi {
  static uploadFile(formData: FormData): Promise<string[] | AxiosResponse | string> {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
    return new Promise((resolve, reject) => {
      api
        .post<string[]>('/upload', formData, config)
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
