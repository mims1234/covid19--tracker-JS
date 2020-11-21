const express = require("express");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config()
const port = process.env.PORT; 

app.set("port",port)

app.get("/", (req,res) =>{
    res.send("Test Page");
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
})