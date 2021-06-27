export interface IFile {
  filename: string
  size: number
  ext: string
  url: string
}

export interface IUploadFile {
  name: string
  progress: number
  id: string
}
