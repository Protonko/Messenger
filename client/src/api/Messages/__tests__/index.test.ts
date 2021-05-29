import axios from 'axios'
import {MessagesApi} from 'api/Messages'
import {RESPONSE_ERROR} from 'static/constants'

describe('MessagesApi', () => {
  const BODY_CREATE = {
    id: '123',
    text: 'text',
  }
  const mockRejectedJSON = Promise.resolve(RESPONSE_ERROR)
  const RESPONSE_CREATE_SUCCESS = {
    status: 200,
    statusText: 'Ok',
    data: {
      read: false,
      attachments: [],
      id: 'id',
      user: 'user',
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
}

  it('Should return success response', async () => {
    (axios.post as jest.Mock).mockResolvedValue(RESPONSE_CREATE_SUCCESS)

    return MessagesApi.createMessage(BODY_CREATE).then(response => {
      expect(response).toEqual(RESPONSE_CREATE_SUCCESS.data)
    })
  })

  it('Should return error response if status is 400', async () => {
    (axios.post as jest.Mock).mockResolvedValue(mockRejectedJSON)

    return MessagesApi.createMessage(BODY_CREATE).catch(err => {
      expect(err).toEqual(RESPONSE_ERROR.statusText)
    })
  })

  it('Should return error response', async () => {
    (axios.post as jest.Mock).mockRejectedValue(RESPONSE_ERROR)

    return MessagesApi.createMessage(BODY_CREATE).catch(err => {
      expect(err).toEqual(RESPONSE_ERROR.response)
    })
  })
})
