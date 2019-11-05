
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

  let qLat = parseInt(req.query.lat);
  let qLng = parseInt(req.query.lng);
  let qYear = parseInt(req.query.year);

  let incr = 5;
  let qLathi = qLat +incr;
  let qLatlo = qLat -incr;

  let qLnghi = qLng +incr;
  let qLnglo = qLng -incr;



  
  
  // now do the json query

  // This is wrong comparison but Works
  var qResult = jsonQuery(`gasData[*latitude>=${qLatlo}
                            &latitude<=${qLathi}
                            &longitude<=${qLnglo}
                            &longitude>=${qLnghi}
                            &orbitYear=${qYear}]`,
                            {data: data}).value; 


  

  qResult.forEach(element =>{
    console.log(element.latitude + ": "+ element.longitude + ":qLnghi-> "+ qLnghi +":qLnglo-> " +qLnglo)
    
  })
                            

    
  let RES = [];
  let resObj = {
    Methane:{
      altitudes: [],
      concentrations: []
    },
    Ozone: {
      altitudes: [],
      concentrations: []
    },
    CarbonDioxide: {
      altitudes: [],
      concentrations: []
    }
  };


  if (qResult.length > 1){

    qResult.forEach((element) => {
      if(element.gasID ==='3'){
        resObj.Methane.altitudes.push(element.altitude)
        resObj.Methane.concentrations.push(element.vAvg)
      }else if (element.gasID ==='4'){
        resObj.CarbonDioxide.altitudes.push(element.altitude)
        resObj.CarbonDioxide.concentrations.push(element.vAvg)
      }else if (element.gasID ==='6'){
        resObj.Ozone.altitudes.push(element.altitude)
        resObj.Ozone.concentrations.push(element.vAvg)
      }
    });
  };

   
  

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




