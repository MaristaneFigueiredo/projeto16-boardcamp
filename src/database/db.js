import dotenv from "dotenv"
import pkg from 'pg'

//config
dotenv.config()

const {Pool} = pkg;



const connection = new Pool({
    connectionString: process.env.DATABASE_URL
  });