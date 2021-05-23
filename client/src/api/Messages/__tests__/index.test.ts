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
    status: 'success',
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

  it('Should return error response if status === "error"', async () => {
    (axios.post as jest.Mock).mockResolvedValue(mockRejectedJSON)

    return MessagesApi.createMessage(BODY_CREATE).catch(err => {
      expect(err).toEqual(RESPONSE_ERROR.data.message)
    })
  })

  it('Should return error response', async () => {
    (axios.post as jest.Mock).mockRejectedValue(new Error('error'))

    return MessagesApi.createMessage(BODY_CREATE).catch(err => {
      expect(err).toEqual(RESPONSE_ERROR.data.message)
    })
  })
})
