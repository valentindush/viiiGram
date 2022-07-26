const express = require('express')
const mongoose= require('mongoose')
const { AuthRouter } = require('./routes/auth')
const cors = require('cors')
const { UsersRouter } = require('./routes/users')
const {PostsRouter} = require("./routes/posts");
const port = process.env.PORT || 3001
const bodyParser = require('body-parser')
const path = require("path");
const { chatRouter } = require('./routes/chat')

const app = express()
app.use(express.static('uploads'))
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: false}))

//DB connection
const connection = mongoose.connect(process.env.DB_URL).then(()=>{
    console.log("connected")
}).catch((err)=>{
    throw err
})

app.use('/api/auth',AuthRouter)
app.use('/api/',UsersRouter)
app.use('/api',PostsRouter)
app.use('/api',chatRouter)


app.listen(port,()=>console.log("server up"))
