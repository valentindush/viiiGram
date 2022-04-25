const express = require('express')
const mongoose= require('mongoose')
const { AuthRouter } = require('./routes/auth')
const cors = require('cors')
const port = process.env.PORT || 3001
const app = express()
app.use(cors())
app.use(express.json())

//DB connection
const connection = mongoose.connect(process.env.DB_URL,()=>{
    console.log("db connected");
})

app.use('/api/auth',AuthRouter)














app.listen(port,()=>console.log("server up"))
