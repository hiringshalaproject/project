const connectDb = require('../db/connect')
require('dotenv').config()
const express = require('express');
const app = express();
const port = 8000;
const path = require('path');
const {products} = require('./data.js')
const staticPath = (path.join(__dirname,"../public"));
const peopleRouter = require('../routes/people')
const tasksRouter = require('../routes/tasks.js')

app.use(express.static(staticPath));
app.use(express.urlencoded({extended : false}))
app.use(express.json())
app.use('/api/people',peopleRouter)
app.use('/api/v1/tasks',tasksRouter)


app.get("/",(req,res) => {
    res.send("hello there!")
})

app.get("/hello",(req,res) => {
    res.send("hello there!")
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











// app.get("/", (req,res) => {
//     res.send("Home Page")
// })

// app.get("/about", (req,res) => {
//     res.send("About Page")
// })

// app.get("/products", (req,res) => {
//     // console.log(req.query.id);
//     res.send(products)
// })

// app.get("/products/items", (req,res) => {
//     let selectedProduct = products.filter((product) => {
//         return product.id == req.query.id
//     })
//     res.json(selectedProduct)
// })
