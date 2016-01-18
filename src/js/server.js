var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var fs = require('fs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
});

app.post('/save',save);
app.get('/load', load);

var listener = app.listen(8082);

console.log("Running on " + listener.address().port +' ...');

function save (req, res) {

  console.log('In save...');

  console.log(req.body);

  fs.writeFile("/tmp/test.txt", JSON.stringify(req.body), function(err) {
     if(err) {
        return console.log(err);
     }
     console.log("The File was saved");
   });
  res.sendStatus(200);

}

function load (req, res) {


  console.log('In load...');

   fs.readFile('/tmp/test.txt', 'utf8', function (err, data) {
      if (err) {
         throw err; 
      }
     console.log(data);
     res.send(data);
    });

}

