import axios from 'axios'
import {UserApi} from 'api/User'

jest.mock('axios')

const BODY_LOGIN = {
  email: 'email@email.com',
  password: '123456',
}

const BODY_SIGN_UP = {
  ...BODY_LOGIN,
  full_name: 'full name'
}

const RESPONSE_LOGIN_SUCCESS = {
  data: {
    status: 'success',
    token: 'testToken123'
  }
}

const RESPONSE_SIGN_UP_SUCCESS = {
  data: {
    status: 'success',
    data: {
      avatar: 'img',
      confirmed: true,
      createdAt: new Date(),
      email: 'email@email.com',
      full_name: 'full name',
      last_seen: new Date(),
      updatedAt: new Date(),
      id: 'a32d',
    }
  }
}

const RESPONSE_ERROR = {
  data: {
    status: 'error',
    message: 'error'
  }
}

const mockResolvedLoginJSON = Promise.resolve(RESPONSE_LOGIN_SUCCESS)
const mockResolvedSignUpJSON = Promise.resolve(RESPONSE_SIGN_UP_SUCCESS)
const mockRejectedJSON = Promise.resolve(RESPONSE_ERROR)

describe('UserApi[login]', () => {
  it('Should return success response', async () => {
    (axios.post as jest.Mock).mockResolvedValue(mockResolvedLoginJSON)

    return UserApi.login(BODY_LOGIN).then(response => {
      expect(response).toEqual(RESPONSE_LOGIN_SUCCESS.data)
    })
  })

  it('Should return error response if status === "error"', async () => {
    (axios.post as jest.Mock).mockResolvedValue(mockRejectedJSON)

    return UserApi.login(BODY_LOGIN).catch(err => {
      expect(err).toEqual(RESPONSE_ERROR.data.message)
    })
  })

  it('Should return error response', async () => {
    (axios.post as jest.Mock).mockRejectedValue(new Error('error'))

    return UserApi.login(BODY_LOGIN).catch(err => {
      expect(err).toEqual(RESPONSE_ERROR.data.message)
    })
  })
})

describe('UserApi[signUp]', () => {
  it('Should return success response', async () => {
    (axios.post as jest.Mock).mockResolvedValue(mockResolvedSignUpJSON)

    return UserApi.signUp(BODY_SIGN_UP).then(response => {
      expect(response).toEqual(RESPONSE_SIGN_UP_SUCCESS.data)
    })
  })

  it('Should return error response if status === "error"', async () => {
    (axios.post as jest.Mock).mockResolvedValue(mockRejectedJSON)

    return UserApi.signUp(BODY_SIGN_UP).catch(err => {
      expect(err).toEqual(RESPONSE_ERROR.data.message)
    })
  })

  it('Should return error response', async () => {
    (axios.post as jest.Mock).mockRejectedValue(new Error('error'))

    return UserApi.signUp(BODY_SIGN_UP).catch(err => {
      expect(err).toEqual(RESPONSE_ERROR.data.message)
    })
  })
})
