import type {Request, Response} from 'express'
import type {IResponseMessage} from '../types/response'
import fs from 'fs'
import path from 'path'
import {config} from '../config'
import {STATIC_PATH} from '../constants'

export class UploadController {
  async uploadFile(request: Request, response: Response<IResponseMessage | string>) {
    try {
      if (!request.files?.file) {
        return response.status(400).json({message: 'Missing files.'})
      }

      const file = Array.isArray(request.files.file) ? request.files.file[0] : request.files.file
      let filePath = `${config.FILE_PATH}/${file.name}`

      if (fs.existsSync(filePath)) {
        const fileExtension = filePath.split('.').pop()
        filePath = `${config.FILE_PATH}/${Math.random()}.${fileExtension}`
      }

      await file.mv(filePath)

      return response.json(`http://${request.headers.host}/${STATIC_PATH}/${path.basename(filePath)}`)
    } catch (error) {
      return response
        .status(500)
        .json({message: error.message})
    }
  }
}
