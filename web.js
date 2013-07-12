var express = require('express');

var app = express.createServer(express.logger());

app.get('/', function(request, response) {
//  response.send('Hello World 2!');

    var buffer = new Buffer();
    var fs = require('fs');
    response.send(buffer.toString('utf-8', fs.readFileSync("index.html")));

/* fs.readFileSync(index.html, function (err, data){
     if (err) throw err:
     console.log(data);

var buffer = new Buffer("Hello World from index.html", "utf-8")

*/


});
var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
