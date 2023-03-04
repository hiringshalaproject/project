const express = require('express');
const app = express();
const port = 8000;
const path = require('path');

// app.get("/",(req, res) => {
//     res.send("hello from bunty");
// })

// app.get("/about",(req, res) => {
//     res.send("here is about!");
// })

// app.get("/about/me",(req, res) => {
//     res.send("<h1>I Am Bunty!</h1>");
// })

// const staticPath = (path.join(__dirname,"../public"))

app.set("view engine", "hbs");

app.get("",(req, res) => {
    res.render("index",{
        myName : "Ankit Mishra"
    });
});
// app.use(express.static(staticPath));

app.listen(port, () => {
    console.log(`listening to youuu on ${port}`);
})