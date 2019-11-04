'use strict';
const fs = require('fs');
const http = require('http');
const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(express.static('dist'));
app.use(express.static('data'));

// This responds with "Hello World" on the homepage
app.get('/', function (req, res) {
    console.log("Got a GET request for the homepage");
    res.send('Hello GET');
});

app.get('/data', function (req, res) {
  console.log(req.query);

  let qLat = req.query.lat;
  let qLng = req.query.lng;
  let qYear = req.query.year;
  
  //


});

const csvToJSON = () => {
  const csvFilePath = './test.csv';
  const csv = require('csvtojson');
  csv()
  .fromFile(csvFilePath)
  .then(jsonObj=>{

      console.log('CSV data loaded complete!');

    //console.log(jsonObj);
  });

}

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port);

    csvToJSON();
});




