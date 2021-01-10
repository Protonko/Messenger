import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import {config} from './config'
import {loginValidation} from './utils/validations/login'
import {UserController} from './controllers/UserController'
import {DialogController} from './controllers/DialogController'
import {MessageController} from './controllers/MessageController'
import {updateLastSeen} from './middlewares/updateLastSeen'
import {checkAuth} from './middlewares/checkAuth'

const app = express()
const user = new UserController()
const dialog = new DialogController()
const message = new MessageController()

app.use(bodyParser.json())
app.use(updateLastSeen)
app.use(checkAuth)

mongoose.connect(
  config.URL_DB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
)

// users
app.get('/user/own', user.getOwnProfile)
app.get('/user/:id', user.find)
app.delete('/user/:id', user.delete)
app.post('/user/signup', loginValidation, user.create)
app.post('/user/login', loginValidation, user.login)

// dialogs
app.get('/dialogs/:id', dialog.find)
app.delete('/dialogs/:id', dialog.delete)
app.post('/dialogs', dialog.create)

// messages
app.get('/messages', message.find)
app.post('/messages', message.create)
app.delete('/messages', message.delete)

app.listen(config.PORT, () => {
  console.log(`App has been started on port ${config.PORT}`)
})
