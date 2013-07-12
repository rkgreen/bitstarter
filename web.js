var express = require('express');

var app = express.createServer(express.logger());

app.get('/', function(request, response) {
//  response.send('Hello World 2!');

//  var buffer = new Buffer(16);
    var fs = require('fs');
    var buffer = new Buffer(fs.readFileSync('index.html'),'utf-8');  
      

 response.send(buffer.toString());

/* fs.readFileSync('index.html', function (err, data) {
     if (err) throw err;
     console.log(data.toString());
*/

});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
