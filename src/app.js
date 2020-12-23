const express = require("express");
require("./db/conn");
const path = require("path");
const app = express();
const hbs = require("hbs");
const User = require("./models/usermsg");
const port = process.env.PORT || 3000;

//set path
var publicDir = require('path').join(__dirname,'../public');
const templatepath = path.join(__dirname, "../templates/views");
const partialpath = path.join(__dirname, "../templates/partials");

//middleware
app.use("/css", express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")));
app.use("/js", express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")));
app.use("/jq", express.static(path.join(__dirname, "../node_modules/jquery/dist")));
app.use(express.static(publicDir)); 
app.use(express.urlencoded({extended: false}))
app.set("view engine", "hbs");
app.set("views", templatepath);
hbs.registerPartials(partialpath)

//routing
app.get("/", (req, res) => {
 res.render("index");
})

app.post("/contact", async (req, res) => {
 try{
  const userData = new User(req.body);
  await userData.save();
  res.status(201).render("index")
 }catch(e){
  res.status(500).send(e)
 }
})

app.listen(port, () => {
 console.log("server is running")
})