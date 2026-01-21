import express from 'express'
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js'
import aiRouter from './routes/ai.route.js'
import cors from 'cors'

dotenv.config()

const app = express()

// middleware
app.use(express.json())

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://wevolve.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}))

// routes
app.use('/user', userRouter)
app.use('/ai', aiRouter)

// PORT (Render provides this automatically)
const PORT = process.env.PORT || 7000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
