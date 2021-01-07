import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import {UserController} from './controllers/UserController'
import {DialogController} from './controllers/DialogController'
import {MessageController} from './controllers/MessageController'

const app = express()
const user = new UserController()
const dialog = new DialogController()
const message = new MessageController()

app.use(bodyParser.json())

mongoose.connect(
  'mongodb://localhost:27017/messenger',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
)

// users
app.get('/user/:id', user.find)
app.delete('/user/:id', user.delete)
app.post('/user/signup', user.create)

// dialogs
app.get('/dialogs/:id', dialog.find)
app.delete('/dialogs/:id', dialog.delete)
app.post('/dialogs', dialog.create)

// messages
app.get('/messages', message.find)
app.post('/messages', message.create)
app.delete('/messages', message.delete)

app.listen(3000, () => {
  console.log('App has been started on port 3000')
})
