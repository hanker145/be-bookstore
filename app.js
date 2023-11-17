var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

var indexRouter = require('./routes/index')
// var usersRouter = require('./routes/users')

var app = express()

require("dotenv").config()
const cors = require("cors")

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors()) 
// Cors (): chan domain khac truy cap vao source BE. 

app.use('/', indexRouter)
// app.use('/users', usersRouter)

//catch when when request match no route 
app.use((req,res,next)=>{
  const exception = new Error(`Path not found`);
  exception.statusCode = 404;
  next(exception)
})

//customize express error handling middleware 
app.use((err,req,res,next)=>{
  res.status(err.statusCode).send(err.message)
})

module.exports = app
