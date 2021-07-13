export interface IFile {
  filename: string
  size: number
  ext: string
  url: string
}

export interface IUploadFile extends File {
  progress: number
  id: string
}
