const connectDb = require('../db/connect')
require('dotenv').config()
const express = require('express')
const app = express()
const port = 8000;
const path = require('path')
const {products} = require('./data.js')
const staticPath = (path.join(__dirname,"../../client/build"))
const tasksRouter = require('../routes/tasks.js')
const jobRouter = require('../routes/jobs.js')
const employeesRouter = require('../routes/employees.js')
const seekersRouter = require('../routes/seekers.js')

app.use(express.static(staticPath))
app.use(express.urlencoded({extended : false}))
app.use(express.json())

app.use('/api/v1/tasks',tasksRouter)
app.use('/api/v1/jobs',jobRouter)
app.use('/api/v1/employees',employeesRouter)
app.use('/api/v1/seekers',seekersRouter)

app.get("/",(req,res) => {
    res.status(200).send("Server Working")
})

app.get("*",(req,res) => {
    res.status(404).send("Bhai Kya kr rha h tu????")
})

const start = async () => {
    try {
        await connectDb(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`listening to youuu on ${port}...`);
        })
    } catch (error) {
        console.log(error);
    }
}

start();