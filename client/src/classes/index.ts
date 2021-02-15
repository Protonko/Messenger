import {FetchWrapper} from 'fw-fetch-wrapper'

interface IBaseConfig {
  baseURL: string,
  headers: {[key: string]: string},
}

const headers = {
  'Content-Type': 'application/json'
}

const baseConfig: IBaseConfig = {
  baseURL: 'http://localhost:3001',
  headers,
}

const Api: FetchWrapper = new FetchWrapper(baseConfig)

export default Api
