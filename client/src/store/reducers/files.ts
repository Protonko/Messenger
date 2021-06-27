import type {IUploadFile} from 'models/file'
import {AllFilesActions, FilesActionTypes} from 'models/store/actions/files'

export interface IInitialState {
  files?: File[]
  filesInUploading: IUploadFile[]
}

const initialState = {
  files: undefined,
} as IInitialState

const reducer = (
  state = initialState,
  action: AllFilesActions
): IInitialState => {
  switch (action.type) {
    case FilesActionTypes.UPLOAD:
      return state

    case FilesActionTypes.UPLOAD_ERROR:
      return state

    case FilesActionTypes.CHANGE_UPLOAD_PROGRESS:
      return state

    default:
      return state
  }
};

export default reducer
