const express = require('express');
const app = express();
const port = 8000;
const path = require('path');
const hbs = require('hbs');
const staticPath = (path.join(__dirname,"../public"));
const templatePath = (path.join(__dirname,"../templates/views"));
const partialsPath = (path.join(__dirname,"../templates/partials"));
const {readFile, writeFile} = require('fs');
const https = require('http');

// console.log("start");
// readFile("./src/text.txt","utf-8", (err,result) => {
//     if(err)
//     {
//         console.log(err)
//     }
//     console.log(result);
//     writeFile("./src/text.txt", `already written is ${result}`, (err,result) => {
//         if(err)
//         {
//             console.log(err);
//         }
//         console.log("done!");
//     });
// });
// console.log("end");

// app.get("/",(req, res) => {
//     res.send("hello from bunty");
// })

app.set("view engine", "hbs");
app.set("views",templatePath);
hbs.registerPartials(partialsPath);

app.use(express.static(staticPath));

app.get("",(req, res) => {
    res.render("index");
});

app.get("/about",(req, res) => {
    console.log(req.query);
    res.render("about",{
        name : req.query.name
    });
});

app.get("*",(req, res) => {
    res.render("404");
});


app.listen(port, () => {
    console.log(`listening to youuu on ${port}...`);
})

// const server = https.createServer((req,res) => {
//     res.end("hey there!");
// })

// server.listen(8000);