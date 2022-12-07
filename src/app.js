import express from "express";
import cors from "cors"

//config 
const app = express()
app.use(express.json())
app.use(cors())

//routes - para as rotas funcionarem elas precisam ser chamadas


//Definição da porta 
const port = process.env.PORT || 4000
app.listen(port, () => console.log(`Server running in port ${port}`))