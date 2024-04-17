import express from "express"
import mongoose from "mongoose"
import "dotenv/config"
import bookRoute from './routes/bookRoute.js'
import cors from 'cors'

const app = express()
const port = process.env.PORT || 3500

//Middleware for parsing request body
app.use(express.json())

//Middleware for handling CORS policy
//Option 1: Allow all origins with default of cors(*)
app.use(cors())

//Option 2: Allow Custom Origin
// app.use(
//     cors({
//         origin: ['http://localhost:3500', 'http://localhost:3500'],
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type']
//     })
// )

app.get('/', (req, res) => {
    return res
        .status(200)
        .send("Welcome To MERN Bookstore")
})

app.use('/books', bookRoute)

mongoose
    .connect(process.env.MongoDB_Url)
    .then(() => {
        console.log("Connection to database established")
        app.listen(port, () => {
            console.log(`Server is listening to port : ${port}`)
        })
    })
    .catch((err) => {
        console.log(err.message)
    })