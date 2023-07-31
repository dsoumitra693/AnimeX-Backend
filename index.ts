import express from 'express'
import authRouter from './routes/auth'
import connectToDB from './utils/db' 
import cors from 'cors'
import userRouter from './routes/user'
import { authenticate } from './middleware/authenticate'
const app = express()
const port = 3000

//middlewares 
app.use(express.json());
app.use(cors())
// routes
app.use("/auth", authRouter)
app.use("/user", authenticate, userRouter)
app.get('/', (req, res) => res.send("Welcome to AnimeX Server"))

// connect to db 
connectToDB()

//app litening
app.listen(port, () => console.log(`Example app listening on port ${port}!`))