import axios from 'axios'
import {UserApi} from 'api/User'
import {RESPONSE_ERROR} from 'static/constants'

describe('UserApi', () => {
  const BODY_LOGIN = {
    email: 'email@email.com',
    password: '123456',
  }

  const BODY_SIGN_UP = {
    ...BODY_LOGIN,
    full_name: 'full name',
  }

  const RESPONSE_LOGIN_SUCCESS = {
    status: 200,
    statusText: 'Ok',
    data: {
      token: 'testToken123',
    },
  }

  const RESPONSE_SIGN_UP_SUCCESS = {
    status: 200,
    statusText: 'Ok',
    data: {
      avatar: 'img',
      confirmed: true,
      createdAt: new Date(),
      email: 'email@email.com',
      full_name: 'full name',
      last_seen: new Date(),
      updatedAt: new Date(),
      id: 'a32d',
    },
  }

  const mockResolvedLoginJSON = Promise.resolve(RESPONSE_LOGIN_SUCCESS)
  const mockResolvedSignUpJSON = Promise.resolve(RESPONSE_SIGN_UP_SUCCESS)
  const mockRejectedJSON = Promise.resolve(RESPONSE_ERROR)

  describe('login', () => {
    it('Should return success response', async () => {
      ;(axios.post as jest.Mock).mockResolvedValue(mockResolvedLoginJSON)

      return UserApi.login(BODY_LOGIN).then((response) => {
        expect(response).toEqual(RESPONSE_LOGIN_SUCCESS.data)
      })
    })

    it('Should return error response if status is 400', async () => {
      ;(axios.post as jest.Mock).mockResolvedValue(mockRejectedJSON)

      return UserApi.login(BODY_LOGIN).catch((err) => {
        expect(err).toEqual(RESPONSE_ERROR.statusText)
      })
    })

    it('Should return error response', async () => {
      ;(axios.post as jest.Mock).mockRejectedValue(RESPONSE_ERROR)

      return UserApi.login(BODY_LOGIN).catch((err) => {
        expect(err).toEqual(RESPONSE_ERROR.response)
      })
    })
  })

  describe('signUp', () => {
    it('Should return success response', async () => {
      ;(axios.post as jest.Mock).mockResolvedValue(mockResolvedSignUpJSON)

      return UserApi.signUp(BODY_SIGN_UP).then((response) => {
        expect(response).toEqual(RESPONSE_SIGN_UP_SUCCESS.data)
      })
    })

    it('Should return error response if status is 400', async () => {
      ;(axios.post as jest.Mock).mockResolvedValue(mockRejectedJSON)

      return UserApi.signUp(BODY_SIGN_UP).catch((err) => {
        expect(err).toEqual(RESPONSE_ERROR.statusText)
      })
    })

    it('Should return error response', async () => {
      ;(axios.post as jest.Mock).mockRejectedValue(RESPONSE_ERROR)

      return UserApi.signUp(BODY_SIGN_UP).catch((err) => {
        expect(err).toEqual(RESPONSE_ERROR.response)
      })
    })
  })

  describe('getUsers', () => {
    it('Should return success response', async () => {
      ;(axios.get as jest.Mock).mockResolvedValue(mockResolvedSignUpJSON)

      return UserApi.getUsers().then((response) => {
        expect(response).toEqual(RESPONSE_SIGN_UP_SUCCESS.data)
      })
    })

    it('Should return error response if status is 400', async () => {
      ;(axios.get as jest.Mock).mockResolvedValue(mockRejectedJSON)

      return UserApi.getUsers().catch((err) => {
        expect(err).toEqual(RESPONSE_ERROR.statusText)
      })
    })

    it('Should return error response', async () => {
      ;(axios.get as jest.Mock).mockRejectedValue(RESPONSE_ERROR)

      return UserApi.getUsers().catch((err) => {
        expect(err).toEqual(RESPONSE_ERROR.response)
      })
    })
  })
})
