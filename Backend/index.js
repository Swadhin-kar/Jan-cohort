import express from 'express'
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js'
import aiRouter from './routes/ai.route.js'

const app = express()

// all configs
dotenv.config()


//middlewares


//PORT
const PORT =  process.env.PORT || 7000;
const BASE_URL = process.env.BASE_URL || 'http://localhost:7001'

app.use(express.json())
app.use('/user', userRouter)
app.use('/ai', aiRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${BASE_URL}`)
})