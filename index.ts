import express from 'express'
import authRouter from './routes/auth'
import connectToDB from './utils/db'
import cors from 'cors'
import userRouter from './routes/user'
import { authenticate } from './middleware/authenticate'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import apiRouter from './routes/api'

dotenv.config()
const app = express()

const port = process.env.PORT || 5000

//middlewares 
app.use(express.json());
app.use(cors())
app.use(bodyParser.json({
    limit: '50mb',
    type: 'application/octet-stream'
}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: false,
    parameterLimit: 50000,
    type: "application/octet-stream"
}));
// routes
app.use("/auth", authRouter)
app.use("/user", authenticate, userRouter)
app.use("/api", apiRouter)


app.get('/', (_, res) => res.send("Welcome to AnimeX-Server"))

// connect to db 
// connectToDB()

//app litening
app.listen(port, () => console.log(`App listening on port ${port}!`))