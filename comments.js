// Create web server with Express
// To run: node comments.js
// To test: curl http://localhost:3000/comments
// To test: curl http://localhost:3000/comments/1

var express = require("express");
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'));

// GET /comments
app.get('/comments', function (req, res) {
   fs.readFile( __dirname + "/" + "comments.json", 'utf8', function (err, data) {
       console.log( data );
       res.end( data );
   });
})

// GET /comments/id
app.get('/comments/:id', function (req, res) {
   // First read existing comments.
   fs.readFile( __dirname + "/" + "comments.json", 'utf8', function (err, data) {
       var comments = JSON.parse( data );
       var comment = comments["comment" + req.params.id] 
       console.log( comment );
       res.end( JSON.stringify(comment));
   });
})

// POST /comments
// To test: curl -d "id=3&body=body3&author=author3&date=3/3/2017" -X POST http://localhost:3000/comments
app.post('/comments', urlencodedParser, function (req, res) {

   // First read existing comments.
   fs.readFile( __dirname + "/" + "comments.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       var id = req.body.id;
       var comment = req.body;
       data["comment" + id] = comment;
       console.log( data );
       res.end( JSON.stringify(data));
   });
})

// DELETE /comments/id
// To test: curl -X DELETE http://localhost:3000/comments/3
app.delete('/comments/:id', function (req, res) {

   // First read existing comments.
   fs.readFile( __dirname + "/" + "comments.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       var id = req.params.id;
       delete data["comment" + id];
       console.log( data );
       res.end( JSON.stringify(data));
   });
})

// PUT