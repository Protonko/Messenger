import type {IUploadFile} from 'models/file'
import {AllFilesActions, FilesActionTypes} from 'models/store/actions/files'

export interface IInitialState {
  files?: IUploadFile[]
  errorMessage: string | null
}

export const initialState = {
  files: undefined,
  errorMessage: null,
} as IInitialState

const reducer = (
  state = initialState,
  action: AllFilesActions,
): IInitialState => {
  switch (action.type) {
    case FilesActionTypes.UPLOAD:
      return {
        ...state,
        files: [...(state.files ?? []), ...action.payload],
        errorMessage: null,
      }

    case FilesActionTypes.UPLOAD_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
      }

    case FilesActionTypes.CHANGE_UPLOAD_PROGRESS: {
      const updatedFiles = state.files?.map((file) => {
        if (file.id === action.payload.id) {
          return action.payload
        }

        return file
      })

      return {
        ...state,
        files: updatedFiles,
        errorMessage: null,
      }
    }

    default:
      return state
  }
}

export default reducer
