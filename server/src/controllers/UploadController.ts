import {Request, Response} from 'express'

export class UploadController {
  upload(request: Request, response: Response) {
    let length = 0
    request.on('data', function(chunk) {
      length += chunk.length
      if (length > 50 * 1024 * 1024) {
        response.statusCode = 413
        response.end('File too big')
      }
    }).on('end', function() {
      response.end('ok')
    })
  }
}
