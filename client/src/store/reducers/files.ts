import type {IUploadFile} from 'models/file'
import {AllFilesActions, FilesActionTypes} from 'models/store/actions/files'

export interface IInitialState {
  files?: IUploadFile[]
}

export const initialState = {
  files: undefined,
} as IInitialState

const reducer = (
  state = initialState,
  action: AllFilesActions,
): IInitialState => {
  switch (action.type) {
    case FilesActionTypes.UPLOAD:
      return {
        ...state,
        files: action.payload ?? undefined,
      }

    case FilesActionTypes.UPLOAD_ERROR:
      return state

    case FilesActionTypes.CHANGE_UPLOAD_PROGRESS: {
      const updatedFiles = state.files?.map(file => {
        if (file.id === action.payload.id) {
          return action.payload
        }

        return file
      })

      return {
        ...state,
        files: updatedFiles,
      }
    }

    default:
      return state
  }
}

export default reducer
