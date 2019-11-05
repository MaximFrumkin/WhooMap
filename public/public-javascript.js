// class Point {
//     constructor(Lat,Lng,year) {
//       this.Lat = Lat;
//       this.Lng = Lng;
//       this.year = year
//     }
//   }
//   mycar = new Point("Ford");



//--------- Creating array from json


var addressPoints = [];
for (var i in myData) {
    var item = myData[i];
    addressPoints.push([
        item.Location.Latitude,
        item.Location.Longitude,
        item.NormConcentration,
        item.GasID,
        item.orbitYear
    ]);
}
var currentYear = 2004;
var subArray = [];
var map;
var timer;
var lgroup;
var heat;

let marker;
let latlng;
let data_Alt_con;
jQuery(document).ready(function () {
    jQuery(".gas").change(function (e) {
        //debugger;
        //addressPoints.filter(gases,e.data);
        //addressPoints.filter(point => point[1] == e.data);
        
    });
    map = L.map('map', {
        center: [56.1304, -108.3468],
        zoom: 3,
        continuousWorld: true
    });  //.setView([56.1304, -108.3468], 5);
    console.log("FIre1")
    var tiles = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
    console.log("FIre3")
    // ToDo must filter specific year
    subArrayPos = addressPoints.filter(point => point[3] == 'O3' && point[2] >=0 && point[4] == 2004).map(point => [point[0],point[1],point[2]])
    subArrayNeg = addressPoints.filter(point => point[3] == 'O3'&& point[2] < 0 && point[4] == 2004).map(point => [point[0],point[1],point[2]])
    subArrayPos.push([59,-34,-5])
    subArrayNeg.push([59,-34,5])

    /*
     addressPoints.push([
        item.Location.Latitude,
        item.Location.Longitude,
        item.NormConcentration,
        item.GasID,
        item.orbitYear
    ]);
    */


    // ToDo must filter specific year
    subArray_year = 2004;

    
    
    heat = L.heatLayer(subArrayPos, {
        "id": 'layer1',
        "gradient": {0: 'white', 0.2: 'yellow', 0.4: 'orange', 0.5: 'Salmon', 0.6: 'red', 0.7:'darkred'},
        "radius": 30,
        "blur": 10
    }).addTo(map);

    heatneg = L.heatLayer(subArrayNeg, {
        "id": 'layer2',
        "gradient": {0: 'white', 0.2: 'lightgreen', 0.4: 'green', 0.5: 'lightblue', 0.6: 'blue', 0.7:'darkblue'},
        "radius": 30,
        "blur": 10
    }).addTo(map);




    /*
    console.log("FIre5")
    map.addLayer(heat)
    console.log("FIre2");
    //var animationControl = L.control.animation('control',{
    //    animationControl: true,
    //    playbackSpeed: 1000,
    //    playbackSpeeds: [100, 500, 1000, 10000, 100000],
    //    stepWidth: 1000
    //}).addTo(map);

    map.addLayer(heat);
    */

    let default_marker = {"lat": 45, "lng": -76}
    marker = L.marker(default_marker).addTo(map);
    
    get_Alt_Con(default_marker.lat,default_marker.lng,subArray_year)
    

    async function onMapClick(e) {
        console.log("You clicked the map at " + e.latlng);

        console.log("You clicked the map at " + e.latlng.lng);
        console.log("changed lng to num from :" + e.latlng.lng + "to :" + getRound(e.latlng.lng));
        console.log("changed lat to num from :" + e.latlng.lat + "to :" + getRound(e.latlng.lat));

        if(marker != undefined){
            
            map.removeLayer(marker);
        }

        marker = L.marker(e.latlng).addTo(map);
        latlng = {lat: getRound(e.latlng.lat),lng:getRound(e.latlng.lng)};

        get_Alt_Con(latlng.lat,latlng.lng,subArray_year)
        
    }
    
    map.on('click', onMapClick);
    //console.log(temp_var);
    


});

const getRound = (num) =>{
    const intNum = Math.round(num)
    return intNum
}




const get_Alt_Con = (lat, lng, year)=>{
    axios.get('/data',{
        params:{
            "lat": lat,
            "lng": lng,
            "year": year
        }
    })
  .then(function (response) {
    // handle success
    console.log(response.data);
    let latlng ={"lat": lat, "lng":lng};
    notify(latlng,year,response.data)
    return("AWESOME")
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
}




function playMap() {
    timer = setInterval(callMap, 1500);

}

function stopMap(){
    clearInterval(timer); 
}


function callMap() {
    
    jQuery('#year').text(currentYear);
    createMap('O3', currentYear); //jQuery(".gas input[type='radio']:checked").val()
    currentYear++;
    if (currentYear >= 2020) {
        //window.clearInterval(timer);
        currentYear = 2004;
    }
}

function createMap(gas, year) {
    
    if ((year !== null && year !== undefined) && year !== '') {
        subArrayPos = addressPoints.filter(point => point[3] == gas && point[2] >=0 && point[4] == year).map(point => [point[0],point[1],point[2]]);

        subArrayNeg = addressPoints.filter(point => point[3] == gas && point[2] <0 && point[4] == year).map(point => [point[0],point[1],point[2]]);
        subArrayPos.push([59,-34,-5])
        subArrayNeg.push([59,-34,5])






        subArray_year = year;
    } else {
        console.log("BIGFAIL")
        subArray = addressPoints.filter(point => point[3] == gas).map(point => [point[0],point[1],point[2]]);
    }
    //--- Remove existing Map if exits
    if (typeof map !== 'undefined') {
        map.removeLayer(heat);
        map.removeLayer(heatneg);
    }
    heat = L.heatLayer(subArrayPos, {
        "id": 'layer1',
        "gradient": {0: 'white', 0.2: 'yellow', 0.4: 'orange', 0.5: 'Salmon', 0.6: 'red', 0.7:'darkred'},
        "radius": 30,
        "blur": 10
    }).addTo(map);

    heatneg = L.heatLayer(subArrayNeg, {
        "id": 'layer2',
        "gradient": {0: 'white', 0.2: 'lightgreen', 0.4: 'green', 0.5: 'lightblue', 0.6: 'blue', 0.7:'darkblue'},
        "radius": 30,
        "blur": 10
    }).addTo(map);

    
    let latlng = {lat: getRound(marker.getLatLng().lat),lng:getRound(marker.getLatLng().lng)};
    
    get_Alt_Con(latlng.lat,latlng.lng,subArray_year)

}
function addLayer(gas, year) {
    if (year !== null && year !== '') {
        subArrayPos = addressPoints.filter(point => point[3] == gas && point[2] >=0 && point[4] == year).map(point => [point[0],point[1],point[2]]);

        subArrayNeg = addressPoints.filter(point => point[3] == gas && point[2] <0 && point[4] == year).map(point => [point[0],point[1],point[2]]);

        subArrayPos.push([59,-34,-5])
        subArrayNeg.push([59,-34,5])
        subArray_year = year
    } else {
        subArray = addressPoints.filter(point => point[3] == gas);
        console.log("BiGFail");
        
    }
    //--- Remove existing Map if exits
    if (typeof map !== 'undefined') {
        debugger;
        map.remove(heat);
    }
    heat = L.heatLayer(subArrayPos, {
        "id": 'layer1',
        "gradient": {0: 'white', 0.2: 'yellow', 0.4: 'orange', 0.5: 'Salmon', 0.6: 'red', 0.7:'darkred'},
        "radius": 30,
        "blur": 10
    }).addTo(map);

    heatneg = L.heatLayer(subArrayNeg, {
        "id": 'layer2',
        "gradient": {0: 'white', 0.2: 'lightgreen', 0.4: 'green', 0.5: 'lightblue', 0.6: 'blue', 0.7:'darkblue'},
        "radius": 30,
        "blur": 10
    }).addTo(map);
     

    
    //map.addLayer(heat);
}

