const mongoose = require("mongoose")
const express = require("express")
const process = require("process")
const dotenv = require("dotenv")
const authRouter = require("./routes/authRouter.js")
const todoRouter = require('./routes/todoRouter.js')
const userRouter = require("./routes/userRouter.js")
const recordsRouter = require("./routes/recordsRouter.js")
const fileUpload = require("express-fileupload")
const cron = require("node-cron")
const todoController = require("./controllers/todoController.js")
const cors = require('cors')

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(fileUpload())
app.use(express.static("static"))
app.use('/', authRouter, todoRouter, userRouter, recordsRouter)


async function startHostAndServer() {
  try {
    await mongoose.connect(process.env.MONGO)
    cron.schedule("0 4 * * *", () => todoController.deleteNonRepeat())
    app.listen(
      process.env.PORT,
      () => console.log(`Сервер начал работать на ${process.env.PORT} порту`)
    )
  } catch (error) {
    console.log(error)
  }
}


startHostAndServer()








