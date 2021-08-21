import {config as configEnv} from 'dotenv'
import {Algorithm} from 'jsonwebtoken'

type TConfig = {
  NODE_ENV: string,
  PORT: number,
  JWT_SECRET_KEY: string,
  URL_DB: string,
  ACCESS_TOKEN_MAX_AGE: string,
  JWT_ALGORITHM: Algorithm,
  FILE_PATH: string
}

const {
  NODE_ENV,
  PORT,
  JWT_SECRET_KEY,
  URL_DB,
  ACCESS_TOKEN_MAX_AGE,
  JWT_ALGORITHM,
  FILE_PATH
} = configEnv().parsed ?? {}

export const config: TConfig = {
  NODE_ENV: NODE_ENV ?? 'development',
  PORT: +PORT ?? 3000,
  JWT_SECRET_KEY,
  URL_DB,
  ACCESS_TOKEN_MAX_AGE,
  // @ts-ignore
  JWT_ALGORITHM,
  FILE_PATH,
}

export const CORS_OPTIONS = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
}
