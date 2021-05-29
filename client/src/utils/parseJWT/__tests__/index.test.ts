import {parseJWT} from 'utils/parseJWT'

describe('parseJWT', () => {
  const token =
    'eyJ0ZXN0IjoidGVzdCB2YWx1ZSIsImFsZyI6IkhTMjU2In0.eyJ0ZXN0X2tleSI6InRlc3QgdmFsdWUifQ.YLM45IHsrhW6CxMSX8DYMVHs_lSt7VKSSgG4cbmluJY'
  const decodedToken = {
    test_key: 'test value'
  }

  it('should parse jwt', () => {
    expect(parseJWT(token)).toStrictEqual(decodedToken)
  })
})
