import type {AnyAction} from 'redux'
import type {IUploadFile} from 'models/file'

export enum FilesActionTypes {
  UPLOAD = '[FILES]UPLOAD',
  UPLOAD_ERROR = '[FILES]UPLOAD_ERROR',
  CHANGE_UPLOAD_PROGRESS = '[FILES]CHANGE_UPLOAD_PROGRESS',
  REMOVE_FILE = '[FILES]REMOVE_FILE',
  REMOVE_FILE_SUCCESS = '[FILES]REMOVE_FILE_SUCCESS',
  REMOVE_FILE_ERROR = '[FILES]REMOVE_FILE_ERROR',
}

export interface UploadFilesAction extends AnyAction {
  type: FilesActionTypes.UPLOAD
  payload: IUploadFile[]
}

export interface UploadFilesErrorAction extends AnyAction {
  type: FilesActionTypes.UPLOAD_ERROR
  payload: string
}

export interface ChangeUploadProgressAction extends AnyAction {
  type: FilesActionTypes.CHANGE_UPLOAD_PROGRESS
  payload: IUploadFile
}

export interface RemoveFileAction extends AnyAction {
  type: FilesActionTypes.REMOVE_FILE
  payload: string
}

export interface RemoveFileActionSuccess extends AnyAction {
  type: FilesActionTypes.REMOVE_FILE_SUCCESS
  payload: string
}

export interface RemoveFileActionError extends AnyAction {
  type: FilesActionTypes.REMOVE_FILE_ERROR
  payload: string
}

export type AllFilesActions =
  | UploadFilesAction
  | UploadFilesErrorAction
  | ChangeUploadProgressAction
  | RemoveFileAction
  | RemoveFileActionSuccess
  | RemoveFileActionError
