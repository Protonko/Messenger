import {Request, Response} from 'express'
import * as fs from 'fs'

export class UploadController {
  private readonly files: Buffer[]

  constructor() {
    this.files = []

    this.upload = this.upload.bind(this)
  }

  upload(request: Request, response: Response) {
    let length = 0
    request.on('data', (chunk: Buffer) =>  {
      this.files.push(chunk)
      length += chunk.length
      if (length > 50 * 1024 ** 2) {
        response.statusCode = 413
        response.end('File size is too large!')
      }
    }).on('end', () => {
      fs.writeFile('text.png', Buffer.concat(this.files).toString('utf-8'), 'utf-8', () => {})
      response.end(Buffer.concat(this.files).toString('base64'))
    })
  }
}
