import {hash} from 'bcrypt'

export const generatePasswordHash = (password: string): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    await hash(password, 10, (error: Error | undefined, hash: string) => {
      if (error) {
        return reject(error)
      }

      resolve(hash)
    })
  })
}
