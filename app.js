
'use strict';
const fs = require('fs');
const http = require('http');
const express = require('express');
const app = express();
var jsonQuery = require('json-query');

var data = [];

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
  
  
  // now do the json query


  var qResult = jsonQuery(`gasData[*latitude=${qLat}
                            &longitude=${qLng}
                            &orbitYear=${qYear}]`,
                            {data: data}).value; 
    //console.log(qResult);   
    
  let RES = [];
  let resObj = {
    altitudes: [],
    concentrations: []
  }
  qResult.forEach(element => {
    resObj.altitudes.push(element.altitude);
    resObj.concentrations.push(element.cAvg);
  });

  RES.push(resObj);

  console.log(RES);

  res.send(RES);

});


const csvToJSON = () => {
  const csvFilePath = './gas_summary.csv';
  const csv = require('csvtojson');
  csv()
  .fromFile(csvFilePath)
  .then(jsonObj=>{

      data = {
        gasData : jsonObj
      };
        
    console.log('CSV data loaded complete!');

    // console.log(jsonObj);
  });

}

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port);

    csvToJSON();
});




