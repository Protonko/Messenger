import axios from 'axios'
import {DialogsApi} from 'api/Dialogs'
import {Status} from 'models/common/status'
import {RESPONSE_ERROR} from 'static/constants'

jest.mock('axios')

describe('DialogsApi', () => {
  const mockRejectedJSON = Promise.resolve(RESPONSE_ERROR)
  const DIALOG = {
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
  }

  const GET_SUCCESS = {
    data: {
      status: 'success',
      data: [DIALOG],
    }
  }

  const SEND_SUCCESS = {
    status: 'success',
    data: DIALOG,
  }

  describe('getDialogs', () => {
    const mockResolvedGetDialogsJSON = Promise.resolve(GET_SUCCESS)

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

  describe('createDialog', () => {
    const mockResolvedCreateDialogJSON = Promise.resolve(SEND_SUCCESS)
    const body = {
      author: 'author',
      interlocutor: 'interlocutor',
      text: 'text',
    }

    it('Should return success response', async () => {
      (axios.post as jest.Mock).mockResolvedValue(mockResolvedCreateDialogJSON)

      return DialogsApi.createDialog(body).then(response => {
        expect(response).toEqual(SEND_SUCCESS.data)
      })
    })

    it('Should return error response if status === "error"', async () => {
      (axios.post as jest.Mock).mockResolvedValue(mockRejectedJSON)

      return DialogsApi.createDialog(body).catch(err => {
        expect(err).toEqual(RESPONSE_ERROR.data.message)
      })
    })

    it('Should return error response', async () => {
      (axios.post as jest.Mock).mockRejectedValue(new Error('error'))

      return DialogsApi.createDialog(body).catch(err => {
        expect(err).toEqual(RESPONSE_ERROR.data.message)
      })
    })
  })
})
