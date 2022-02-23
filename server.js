const express = require('express');
const app = express();
const connect = require('./config/db');
const cors = require("cors");

const userRouter = require('./routes/user.route')
const lectureRouter = require('./routes/lecture.route')

app.use(cors())
app.use(express.json())

app.use("/users", userRouter)
app.use("/lectures", lectureRouter)

const start = async () => {
    await connect()

    app.listen("6000", () => {
        console.log("listening on port 6000")
    })
}

module.exports = start
