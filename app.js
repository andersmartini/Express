var express = require("express");
var stylus = require("stylus");
var nib = require("nib");
var format = require("util").format

var app = express()
function compile(str, path){
	return stylus(str)
		.set("filename")
		.use(nib())
};

app.set("views",__dirname + "/views");
app.set("view engine", "jade");
app.use(express.logger("dev"));
app.use(express.bodyParser())
app.use(stylus.middleware(
{
	src:__dirname + "/public"
	, 	compile: compile
}))
app.set('view options', { locals: { scripts: ['./Jquery.js', './script.js'] }}); 
console.log("allaaahhh!")
app.get('/', function (req, res) {
  res.render("index",{ title: "home"} )
})
app.get('/apa',function(req, res){
	res.render("apa", {title: "apa"})
})
app.get('/favicon.ico',function(req, res){
	res.send("./favicon.ico", {title: "codeWave"})
})
app.get('/Jquery.js', function(req,res){
	res.send("./Jquery.js");
})
app.get('/script.js', function(req,res){
	res.send("./script.js")
})

app.use(express.static(__dirname +"/public"))



app.listen(3000);
