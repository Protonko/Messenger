import type {EventChannel} from '@redux-saga/core'
import type {IUploadFile} from 'models/file'
import {END, eventChannel} from 'redux-saga'
import {call, cancelled, fork, put, take, takeEvery} from 'redux-saga/effects'
import {changeUploadProgress, uploadFilesError} from 'store/actions/files'
import {FilesActionTypes, UploadFilesAction} from 'models/store/actions/files'
import {errorHandler} from 'utils/errorHandler'
import {UploadApi} from 'api/Upload'

const createUploaderChannel = (
  formData: FormData,
  uploadFiles: IUploadFile[],
) => {
  return eventChannel<Error | IUploadFile>((emit) => {
    uploadFiles.forEach((uploadFile) => {
      const onProgress = ({total, loaded}: ProgressEvent) => {
        uploadFile.progress = Math.round((loaded * 100) / total)
        emit(uploadFile)
      }

      UploadApi.uploadFiles(formData, onProgress)
        .then(() => {
          emit(END)
        })
        .catch((error) => {
          emit(new Error(error.message))
          emit(END)
        })
    })

    // unsubscribe
    return () => undefined
  })
}

function* uploadProgressWatcher(channel: EventChannel<Error | IUploadFile>) {
  while (true) {
    try {
      const uploadFile = yield take(channel)
      yield put(changeUploadProgress(uploadFile))
    } catch (error) {
      yield put(errorHandler(error, uploadFilesError))
    } finally {
      if (yield cancelled()) channel.close()
    }
  }
}

export function* uploadWorker({payload}: UploadFilesAction) {
  try {
    const formData = new FormData()

    for (const key in payload) {
      const file = payload[key]

      if (!file) return

      formData.append('file', file)
    }

    const uploadChannel: EventChannel<Error | IUploadFile> = yield call(
      createUploaderChannel,
      formData,
      payload,
    )

    yield fork(uploadProgressWatcher, uploadChannel)
  } catch (error) {
    yield put(errorHandler(error, uploadFilesError))
  }
}

export function* uploadWatcher() {
  yield takeEvery(FilesActionTypes.UPLOAD, uploadWorker)
}
