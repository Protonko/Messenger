import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import {UserController} from './controllers/UserController'

const app = express()
const user = new UserController()

app.use(bodyParser.json())

mongoose.connect(
  'mongodb://localhost:27017/messenger',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  },
)

app.get('/user/:id', user.find)
app.delete('/user/:id', user.delete)
app.post('/user/signup', user.create)

app.listen(3000, () => {
  console.log('App has been started on port 3000')
})
