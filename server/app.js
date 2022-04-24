const express = require('express')
const { AuthRouter } = require('./routes/auth')
const port = process.env.PORT || 3001
const app = express()
app.use(express.json())
app.use('/api/auth',AuthRouter)














app.listen(port,()=>console.log("server up"))
