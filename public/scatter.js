var Ozone = {
    x: [1, 2, 3, 4],
    y: [10, 15, 13, 17],
    mode: 'markers',
    name: 'Ozone',
    marker: { size: 12 }
  };
  
  var Methane = {
    x: [2, 3, 4, 5],
    y: [16, 5, 11, 10],
    mode: 'markers',
    name: 'Methane',
    marker: { size: 12 }
  };
  
  var CarbonDioxide = {
    x: [1, 2, 3, 4],
    y: [12, 9, 15, 12],
    mode: 'markers',
    name: 'Carbon Dioxide',
    marker: { size: 12 }
  };
  
  var data = [ Ozone, Methane, CarbonDioxide ];
  var lat = 0;
  var lan = 0;
  var oneyear = 0;

  async function notify(latlan,year){
    lat = latlan.lat;
    lan = latlan.lng;
    oneyear =  year;
    console.log("From notify: "+ lat);
    console.log("From notify: "+ lan);
    console.log("From notify: "+ oneyear);
    Plotly.purge('myDiv');
    layout.title.text = 'Concentration vs Altitude, ' + oneyear + ', ' + lat + '° N' + ', ' + (-1 * lan) + '° W';

    let promise = new Promise((res, rej) => {
      get_Alt_Con((lat,lan,subArray_year) => res(ansData))
    });
    // wait until the promise returns us a value
    data_Alt_con = await promise;
    
    console.log(data_Alt_con)
    return data_Alt_con
    data[0].x = []; //GasID4
    data[0].y = []; //GasID4  
    data[1].x = []; //GasID5
    data[1].y = []; //GasID5
    data[2].x = []; //GasID6
    data[2].y = []; //GasID6
    console.log("FFFFFF")
    console.log(data_Alt_con)
    /*try{
      data_Alt_con.forEach(function(element){
        if(element.gasID ==='4'){
          data[0].x.push(element.altitude)
          data[0].y.push(element.cAvg)
        }else if (element.gasID ==='5'){
          data[1].x.push(element.altitude)
          data[1].y.push(element.cAvg)
        }else if (element.gasID ==='6'){
          data[2].x.push(element.altitude)
          data[2].y.push(element.cAvg)
        } 
      });
    }catch(e){
      console.log(e)

    }*/

    Plotly.newPlot('myDiv', data, layout, {showSendToCloud: true});
    
  };
 
  var layout = {
    title: {
      text:'Concentration vs Altitude, ' + oneyear + ', ' + lat + '° N' + ', ' + (-1 * lan) + '° W',
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