

var Ozone = {
    x: [],
    y: [],
    mode: 'markers',
    name: 'Ozone',
    marker: { size: 12 },
    text:"aaa"
  };
  
  var Methane = {
    x: [],
    y: [],
    mode: 'markers',
    name: 'Methane',
    marker: { size: 12 },
    text:"aaa"
  };
  
  var CarbonDioxide = {
    x: [],
    y: [],
    mode: 'markers',
    name: 'Carbon Dioxide',
    marker: { size: 12 },
    text:["aaa"]
  };
  
  var data = [ Ozone, Methane, CarbonDioxide ];
  var lat = 0;
  var lng = 0;
  var oneyear = 0;

  function notify(latlng,year,resdata){
    lat = latlng.lat;
    lng = latlng.lng;
    oneyear =  year;
    dataset = resdata;


    console.log("From notify: "+ lat);
    console.log("From notify: "+ lng);
    console.log("From notify: "+ oneyear);
    Plotly.purge('myDiv');
    layout.title.text = 'Concentration vs Altitude, ' + oneyear + ', ' + lat + '° N' + ', ' + (-1 * lng) + '° W';
    console.log(dataset[0].Ozone)
    console.log(dataset)
    if (dataset[0].Ozone.altitudes.length > 0){
      data[0].x = dataset[0].Ozone.altitudes
      data[0].y = dataset[0].Ozone.concentrations
    }else{
      data[0].x = []
      data[0].y = []
    }

    if (dataset[0].Methane.altitudes.length > 0){
      
      data[1].x = dataset[0].Methane.altitudes
      data[1].y = dataset[0].Methane.concentrations
      
    }else{
      data[1].x = []
      data[1].y = []
    }

    if (dataset[0].CarbonDioxide.altitudes.length > 0){
      data[2].x = dataset[0].CarbonDioxide.altitudes
      data[2].y = dataset[0].CarbonDioxide.concentrations
    }else{
      data[2].x = []
      data[2].y = []
    }

    console.log(data)



    Plotly.newPlot('myDiv', data, layout, {showSendToCloud: true});
  };
 
  var layout = {
    title: {
      text:'Concentration vs Altitude, ' + oneyear + ', ' + lat + '° N' + ', ' + (-1 * lng) + '° W',
      font: {
        family: 'Courier New, monospace',
        size: 24
      },
      xref: 'paper',
      x: 0.05,
    },
    xaxis: {
      title: {
        text: 'Altitude (units)',
        font: {
          family: 'Courier New, monospace',
          size: 18,
          color: '#7f7f7f'
        }
      },
    },
    yaxis: {
      title: {
        text: 'Concentration (units)',
        font: {
          family: 'Courier New, monospace',
          size: 18,
          color: '#7f7f7f'
        }
      }
    }
  };




  
  Plotly.newPlot('myDiv', data, layout, {showSendToCloud: true});