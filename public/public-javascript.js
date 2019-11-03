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
            var tiles = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(map);
            subArray = addressPoints.filter(point => point[3] == 'O3');
            heat = L.heatLayer(subArray, {
                "id": 'layer1',
                "gradient": { 0.4: 'yellow', 0.5: 'red', .6: 'blue' },
                "radius": 70,
                "blur": 10,
            });//.addTo(map)
            map.addLayer(heat);
            //var animationControl = L.control.animation('control',{
            //    animationControl: true,
            //    playbackSpeed: 1000,
            //    playbackSpeeds: [100, 500, 1000, 10000, 100000],
            //    stepWidth: 1000
            //}).addTo(map);

        });
        function playMap() {
            timer = setInterval(callMap, 1000);
        }
        function callMap() {
            debugger;
            jQuery('#year').text(currentYear);
            createMap('O3', currentYear); //jQuery(".gas input[type='radio']:checked").val()
            currentYear++;
            if (currentYear >= 2020) {
                //window.clearInterval(timer);
                currentYear = 2004;
            }
        }

        function createMap(gas, year) {
            debugger;
            if ((year !== null && year !== undefined) && year !== '') {
                subArray = addressPoints.filter(point => point[3] == gas && point[4] == year);
            } else {
                subArray = addressPoints.filter(point => point[3] == gas);
            }
            //--- Remove existing Map if exits
            if (typeof map !== 'undefined') {
                map.removeLayer(heat);
            }
            heat = L.heatLayer(subArray, {
                "id": 'layer1',
                "gradient": { 0.4: 'yellow', 0.5: 'red', .6: 'blue' },
                "radius": 70,
                "blur": 10,
            });//.addTo(map)
            map.addLayer(heat);

        }
        function addLayer(gas, year) {
            if (year !== null && year !== '') {
                subArray = addressPoints.filter(point => point[3] == gas && point[4] == year);
            } else {
                subArray = addressPoints.filter(point => point[3] == gas);
            }
            //--- Remove existing Map if exits
            if (typeof map !== 'undefined') {
                debugger;
                map.remove(heat);
            }
            heat = L.heatLayer(subArray, {
                "id": 'layer1',
                "gradient": { 0.4: 'yellow', 0.5: 'red', .6: 'blue' },
                "radius": 70,
                "blur": 10,
            });//.addTo(map)
            map.addLayer(heat);
        }