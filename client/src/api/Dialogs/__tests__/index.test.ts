import axios from 'axios'
import {DialogsApi} from 'api/Dialogs'
import {Status} from 'models/common/status'
import {RESPONSE_ERROR} from 'static/constants'

jest.mock('axios')

describe('DialogsApi', () => {
  const GET_SUCCESS = {
    data: {
      status: 'success',
      data: [{
        id: 'id',
        name: 'name',
        lastMessage: 'lastMessage',
        avatar: 'avatar',
        edited: false,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        messages: 1,
        status: Status.MUTED,
        readStatus: null,
      }]
    }
  }

  const mockResolvedGetDialogsJSON = Promise.resolve(GET_SUCCESS)
  const mockRejectedJSON = Promise.resolve(RESPONSE_ERROR)

  it('Should return success response', async () => {
    (axios.get as jest.Mock).mockResolvedValue(mockResolvedGetDialogsJSON)

    return DialogsApi.getDialogs('123').then(response => {
      expect(response).toEqual(GET_SUCCESS.data)
    })
  })

  it('Should return error response if status === "error"', async () => {
    (axios.get as jest.Mock).mockResolvedValue(mockRejectedJSON)

    return DialogsApi.getDialogs('123').catch(err => {
      expect(err).toEqual(RESPONSE_ERROR.data.message)
    })
  })

  it('Should return error response', async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error('error'))

    return DialogsApi.getDialogs('123').catch(err => {
      expect(err).toEqual(RESPONSE_ERROR.data.message)
    })
  })
})
