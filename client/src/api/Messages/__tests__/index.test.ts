import axios from 'axios'
import {MessagesApi} from 'api/Messages'
import {RESPONSE_ERROR} from 'static/constants'
import {MESSAGE} from '../../../static/test-mocks/message'

describe('MessagesApi', () => {
  const BODY_CREATE = {
    dialog: '123',
    interlocutor: '321',
    text: 'text',
  }
  const mockRejectedJSON = Promise.resolve(RESPONSE_ERROR)
  const MESSAGES_FOR_DELETE = ['message-id-1', 'message-id-2']
  const RESPONSE_CREATE_SUCCESS = {
    status: 200,
    statusText: 'Ok',
    data: MESSAGE,
  }
  const RESPONSE_GET_SUCCESS = {
    status: 200,
    statusText: 'Ok',
    data: [MESSAGE],
  }
  const RESPONSE_DELETE_SUCCESS = {
    status: 200,
    statusText: 'Ok',
    data: MESSAGES_FOR_DELETE,
  }

  describe('createMessage', () => {
    it('Should return success response', async () => {
      ;(axios.post as jest.Mock).mockResolvedValue(RESPONSE_CREATE_SUCCESS)

      return MessagesApi.createMessage(BODY_CREATE).then((response) => {
        expect(response).toEqual(RESPONSE_CREATE_SUCCESS.data)
      })
    })

    it('Should return error response if status is 400', async () => {
      ;(axios.post as jest.Mock).mockResolvedValue(mockRejectedJSON)

      return MessagesApi.createMessage(BODY_CREATE).catch((err) => {
        expect(err).toEqual(RESPONSE_ERROR.statusText)
      })
    })

    it('Should return error response', async () => {
      ;(axios.post as jest.Mock).mockRejectedValue(RESPONSE_ERROR)

      return MessagesApi.createMessage(BODY_CREATE).catch((err) => {
        expect(err).toEqual(RESPONSE_ERROR.response)
      })
    })
  })

  describe('getMessages', () => {
    it('Should return success response', async () => {
      ;(axios.get as jest.Mock).mockResolvedValue(RESPONSE_GET_SUCCESS)

      return MessagesApi.getMessages('123').then((response) => {
        expect(response).toEqual(RESPONSE_GET_SUCCESS.data)
      })
    })

    it('Should return error response if status is 400', async () => {
      ;(axios.get as jest.Mock).mockResolvedValue(mockRejectedJSON)

      return MessagesApi.getMessages('123').catch((err) => {
        expect(err).toEqual(RESPONSE_ERROR.statusText)
      })
    })

    it('Should return error response', async () => {
      ;(axios.get as jest.Mock).mockRejectedValue(RESPONSE_ERROR)

      return MessagesApi.getMessages('123').catch((err) => {
        expect(err).toEqual(RESPONSE_ERROR.response)
      })
    })
  })

  describe('deleteMessages', () => {
    it('Should return success response', async () => {
      ;(axios.delete as jest.Mock).mockResolvedValue(RESPONSE_DELETE_SUCCESS)

      return MessagesApi.deleteMessages(MESSAGES_FOR_DELETE).then(
        (response) => {
          expect(response).toEqual(RESPONSE_DELETE_SUCCESS.data)
        },
      )
    })

    it('Should return error response if status is 400', async () => {
      ;(axios.delete as jest.Mock).mockResolvedValue(mockRejectedJSON)

      return MessagesApi.deleteMessages(MESSAGES_FOR_DELETE).catch((err) => {
        expect(err).toEqual(RESPONSE_ERROR.statusText)
      })
    })

    it('Should return error response', async () => {
      ;(axios.delete as jest.Mock).mockRejectedValue(RESPONSE_ERROR)

      return MessagesApi.deleteMessages(MESSAGES_FOR_DELETE).catch((err) => {
        expect(err).toEqual(RESPONSE_ERROR.response)
      })
    })
  })
})
