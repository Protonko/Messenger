import axios from 'axios'
import {DialogsApi} from 'api/Dialogs'
import {Status} from 'models/common/status'
import {RESPONSE_ERROR} from 'static/constants'

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

  const SEND_SUCCESS = {
    status: 200,
    statusText: 'Ok',
    data: [DIALOG],
  }

  describe('getDialogs', () => {
    const mockResolvedGetDialogsJSON = Promise.resolve(SEND_SUCCESS)

    it('Should return success response', async () => {
      (axios.get as jest.Mock).mockResolvedValue(mockResolvedGetDialogsJSON)

      return DialogsApi.getDialogs('123').then(response => {
        expect(response).toEqual(SEND_SUCCESS.data)
      })
    })

    it('Should return error response if status is 400', async () => {
      (axios.get as jest.Mock).mockResolvedValue(mockRejectedJSON)

      return DialogsApi.getDialogs('123').catch(err => {
        expect(err).toEqual(RESPONSE_ERROR.statusText)
      })
    })

    it('Should return error response', async () => {
      (axios.get as jest.Mock).mockRejectedValue(RESPONSE_ERROR)

      return DialogsApi.getDialogs('123').catch(err => {
        expect(err).toEqual(RESPONSE_ERROR.response)
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

    it('Should return error response if status is 400', async () => {
      (axios.post as jest.Mock).mockResolvedValue(mockRejectedJSON)

      return DialogsApi.createDialog(body).catch(err => {
        expect(err).toEqual(RESPONSE_ERROR.statusText)
      })
    })

    it('Should return error response', async () => {
      (axios.post as jest.Mock).mockRejectedValue(RESPONSE_ERROR)

      return DialogsApi.createDialog(body).catch(err => {
        expect(err).toEqual(RESPONSE_ERROR.response)
      })
    })
  })
})
