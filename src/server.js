import express from "express";
import cors from "cors";
import categoriesRouter from "./routes/categoriesRouter.js";
import customersRouter from "./routes/customersRouter.js";
import gamesRouter from "./routes/gamesRouter.js";
import rentalsRouter from "./routes/rentalsRouter.js";

//config
const server = express();
server.use(express.json());
server.use(cors());

//routes - para as rotas funcionarem elas precisam ser chamadas
server.use(categoriesRouter);
server.use(customersRouter);
server.use(gamesRouter);
server.use(rentalsRouter);

//Definição da porta
const port = process.env.PORT || 4000;
server.listen(port, () => console.log(`Server running in port ${port}`));
