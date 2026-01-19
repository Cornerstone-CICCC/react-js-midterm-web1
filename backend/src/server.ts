import express, { NextFunction, Request, Response } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieSession from 'cookie-session'
import dotenv from 'dotenv'

import { createServer } from 'http'
import userRouter from './routes/user.routes'
import productRouter from './routes/product.routes'
import cartRouter from './routes/cart.routes'
import cartItemRouter from './routes/cartIrem.routes'

dotenv.config()

//Create server
const app = express()

//Middleware
app.use(cors({
  origin:`http://localhost:${process.env.REACT_PORT}`,
  credentials: true
}))
if (!process.env.COOKIE_PRIMARY_KEY || !process.env.COOKIE_SECONDARY_KEY) {
  throw new Error("Missing cookie keys!")
}
app.use(cookieSession({
  name: "session",
  keys: [
    process.env.COOKIE_PRIMARY_KEY,
    process.env.COOKIE_SECONDARY_KEY
  ],
  // maxAge: 30 * 60 * 1000 *10 // 3 mins
}))
app.use(express.json())


//Routes
app.use("/users", userRouter)
app.use("/products", productRouter)
app.use("/carts", cartRouter)
app.use("/cart-items", cartItemRouter)


app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Server is running")
}) 

//Fallback/404
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send("Invalid route")
}) 


const server = createServer(app)


//start server
const PORT = process.env.PORT
const CONN_STRING = process.env.DATABASE_URI
if (!PORT || !CONN_STRING) {
  throw new Error("Missing port or connecting string!")
}

// to see if you can connect to Mongoose
mongoose
  .connect(CONN_STRING, {dbName: "shop_app"})
  .then(() => {
    console.log('connected to MongoDB!')

    server.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`)
    })
  })
  .catch(err => {
    console.error(err)
    throw err
  })