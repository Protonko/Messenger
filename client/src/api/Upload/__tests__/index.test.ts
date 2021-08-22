import axios from 'axios'
import {UploadApi} from 'api/Upload'
import {RESPONSE_ERROR} from 'static/constants'

describe('UploadApi', () => {
  const formData = new FormData()
  const mockRejectedJSON = Promise.resolve(RESPONSE_ERROR)
  const data = ['foo.jpg', 'bar.png']
  const RESPONSE_UPLOAD_SUCCESS = {
    status: 200,
    statusText: 'Ok',
    data,
  }

  describe('uploadFile', () => {
    it('Should return success response', async () => {
      ;(axios.post as jest.Mock).mockResolvedValue(RESPONSE_UPLOAD_SUCCESS)

      return UploadApi.uploadFile(formData).then((response) => {
        expect(response).toEqual(RESPONSE_UPLOAD_SUCCESS.data)
      })
    })

    it('Should return error response if status is 400', async () => {
      ;(axios.post as jest.Mock).mockResolvedValue(mockRejectedJSON)

      return UploadApi.uploadFile(formData).catch((error) => {
        expect(error).toEqual(RESPONSE_ERROR.statusText)
      })
    })

    it('Should return error response', async () => {
      ;(axios.post as jest.Mock).mockRejectedValue(RESPONSE_ERROR)

      return UploadApi.uploadFile(formData).catch((err) => {
        expect(err).toEqual(RESPONSE_ERROR.response)
      })
    })
  })
})
