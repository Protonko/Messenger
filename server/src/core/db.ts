import mongoose from "mongoose"
import {config} from '../config'

mongoose.connect(
  config.URL_DB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
)
