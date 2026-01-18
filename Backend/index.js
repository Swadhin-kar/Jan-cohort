import express from 'express'
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js'

const app = express()

// all configs
dotenv.config()


//middlewares


//PORT
const PORT =  process.env.PORT || 7000;
const BASE_URL = process.env.BASE_URL || 'http://localhost:7001'

app.use('/user', userRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${BASE_URL}`)
})