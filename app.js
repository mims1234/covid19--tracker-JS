const express = require("express");
const bodyParser = require("body-parser");

require("dotenv").config();

const app = express();
const port = (process.env.PORT)?process.env.PORT:3050; 

const {getIndexPage, getDashboardPage, getTestPage} = require(`./routes/pages`);

app.set("port",port);
app.set("views",__dirname + "/views");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static(__dirname+'/public'))

app.get("/", getIndexPage);
app.all("/dashboard", getDashboardPage)
app.get("/test", getTestPage)

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
})