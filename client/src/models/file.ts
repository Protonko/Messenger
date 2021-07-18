export interface IFile {
  filename: string
  size: number
  ext: string
  url: string
}

export interface IUploadFile {
  file: File
  progress: number
  id: string
}
