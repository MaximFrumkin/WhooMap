var fs = require('fs');
var express = require('express');
var app = express();

app.use(express.static('public'));
app.use(express.static('dist'));
app.use(express.static('data'));

// This responds with "Hello World" on the homepage
app.get('/', function (req, res) {
    console.log("Got a GET request for the homepage");
    res.send('Hello GET');
 })

 var server = app.listen(3000, function () {
    var host = server.address().address
    var port = server.address().port
 
    console.log("Example app listening at http://%s:%s", host, port)
 })








/*

fs.readFile('public/index.html', function (err, html) {
    if (err) {
        throw err; 
    }       
    http.createServer(function(request, response) {  
        response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(html);  
        response.end();  
    }).listen(3000);
});


let rawdata = fs.readFileSync('public/gpr_000b11a_e.json');
let geojson_parsed = JSON.parse(rawdata);

app.get('/map_data', function (req, res) {
    log('This is my text', function (err) {
      if (err) throw err;
      res.send(geojson_parsed);
    });
  });



app.get('/save', function (req, res) {
  fs.writeFile('log.txt', 'This is my text', function (err) {
    if (err) throw err;
    console.log('Replaced!');
    res.send('Replaced!')
  });
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
*/