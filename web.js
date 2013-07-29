var express = require('express');
var fs = require('fs');
var htmlfile = "index.html";

var app = express.createServer(express.logger());

app.get('/', function(request, response) {
//  response.send('Hello World 2!');

//  var buffer = new Buffer(16);
    var html = fs.readFilesSync(htmlfile).toString();
    response.send(html);
});

/*  var buffer = new Buffer(fs.readFileSync('index.html'),'utf-8');  
      

 response.send(buffer.toString());
*/

/* fs.readFileSync('index.html', function (err, data) {
     if (err) throw err;
     console.log(data.toString());
*/



var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Listening on " + port);
});
