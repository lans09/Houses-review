require('dotenv').config()
const express = require('express')
const app = express()

// connect db
const connectDB = require('./db/connect')

// routers
const authRouter = require('./routes/auth')
const housesRouter = require('./routes/houses')

app.use('/api/v1/auth',authRouter)
app.use('/api/v1/houses',housesRouter)



app.use(express.json())


const port = process.env.PORT || 3000

const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI)
        console.log('MONGO connected');
        app.listen(port,console.log(`server is listening on port ${port}`))
    } catch(error){
        console.log(error)
    }
}
start()