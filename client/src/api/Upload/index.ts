import {api} from 'api'
import {apiHandler} from 'api/apiHandler'

export class UploadApi {
  static uploadFile(formData: FormData) {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }

    return apiHandler(api.post<string[]>('/upload', formData, config))
  }
}
