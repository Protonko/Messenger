import type {IUploadFile} from 'models/file'
import {
  ChangeUploadProgressAction,
  FilesActionTypes,
  UploadFilesAction,
  UploadFilesErrorAction,
} from 'models/store/actions/files'

export const uploadFile = (payload: IUploadFile[]): UploadFilesAction => ({
  type: FilesActionTypes.UPLOAD,
  payload,
})

export const uploadFilesError = (payload: string): UploadFilesErrorAction => ({
  type: FilesActionTypes.UPLOAD_ERROR,
  payload,
})

export const changeUploadProgress = (
  payload: IUploadFile,
): ChangeUploadProgressAction => ({
  type: FilesActionTypes.CHANGE_UPLOAD_PROGRESS,
  payload,
})

export const removeFile = (payload: string) => ({
  type: FilesActionTypes.REMOVE_FILE,
  payload,
})

export const removeFileSuccess = (payload: string) => ({
  type: FilesActionTypes.REMOVE_FILE_SUCCESS,
  payload,
})

export const removeFileError = (payload: string) => ({
  type: FilesActionTypes.REMOVE_FILE_ERROR,
  payload,
})
