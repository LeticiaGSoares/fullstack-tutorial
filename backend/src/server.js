import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import conn from './config/conn.js'

import routes from './routes.js'

const PORT = "3333"

const app = express()

app.use(cors({credentials: true}))
app.use(express.json())
app.use(cookieParser())

conn.sync().then(() => {
    app.listen(PORT, () => {
        console.log("http://localhost:" + PORT)
    })
})
.catch((error) => {
    console.error(error)
})

app.use("/", routes)


app.use("/", (req, res) => {
    res.status(200).json({message: "Server rodando"})
})

app.use("*", (req, res)=> {
    res.status(404).json({error: "Rota não encontrada"})
})