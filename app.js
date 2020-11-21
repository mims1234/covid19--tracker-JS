const express = require("express");
const app = express();

require("dotenv").config()

app.get("/", (req,res) =>{
    res.send("Test Page");
})

app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}/`);
})