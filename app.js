const express = require("express");
const bodyParser = require("body-parser");

require("dotenv").config();

const app = express();
const port = process.env.PORT; 

const {getIndexPage, getDashboardPage} = require(`./routes/pages`);

app.set("port",port);
app.set("views",__dirname + "/views");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static(__dirname+'/public'))

app.get("/", getIndexPage);

app.get("/dashboard", getDashboardPage)

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
})