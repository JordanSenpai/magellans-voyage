var express    = require('express')
var bodyParser = require('body-parser')
var fs         = require('fs')
var app        = express()
var locations  = ["Seville","Canary Islands","Cape Verde","Strait of Magellan","Guam","Philippines"]


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(__dirname + '/public'))


app.get('/', function(req, res) {
  res.sendFile('seville.html', { root: './public'}) 
})


app.get('/next',function(req,res){
  locations.forEach(function(item,index){
     if(item.toLowerCase() === req.query.location.toLowerCase() ){
      req.query.nextLocation = locations[index+1]
     }
  })
  res.send(req.query )
})
app.get('/:location', function(req, res,next) {
  res.sendFile(req.params.location + ".html", { root: './public'},
    function(err){
    if(err){
      res.redirect('guam.html')
    }
  })
})


var port = 3000
app.listen(port,function(){
  console.log('started server ')
})