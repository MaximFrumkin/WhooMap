import * as d3 from "lib/d3";
import * as L from "lib/Leaflet";


var map = L.map('map').setView([-41.2858, 174.7868], 13);
// mapLink = 
//     '<a href="http://openstreetmap.org">OpenStreetMap</a>';
// L.tileLayer(
//     'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; ' + mapLink + ' Contributors',
//     maxZoom: 18,
//     }).addTo(map);

var toolserver = L.tileLayer('http://{s}.www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png');
var stamen = L.tileLayer('http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png', { attribution: 'Add some attributes here!' }).addTo(map);
var baseLayers = { "stamen": stamen, "toolserver-mapnik": toolserver };
L.control.layers(baseLayers).addTo(map);
console.log("FI");


//for the shapefiles in the folder called 'files' with the name pandr.shp
/*const polystyle = {
    fillColor: 'blue',
    weight: 2,
    opacity: 1,
    color: 'red',  //Outline color
    fillOpacity: 0.7
};

L.geoJson(geojson_parsed, { style: polystyle }).addTo(map);
*/




// Initialize the SVG layer
map._initPathRoot()

// We pick up the SVG from the map object
var svg = d3.select("#map").select("svg"),
    g = svg.append("g");

d3.json("circles.json", function (collection) {
    // Add a LatLng object to each item in the dataset
    collection.objects.forEach(function (d) {
        d.LatLng = new L.LatLng(d.circle.coordinates[0],
            d.circle.coordinates[1])
    })

    var feature = g.selectAll("circle")
        .data(collection.objects)
        .enter().append("circle")
        .style("stroke", "black")
        .style("opacity", .6)
        .style("fill", "red")
        .attr("r", 20);

    map.on("viewreset", update);
    update();

    function update() {
        feature.attr("transform",
            function (d) {
                return "translate(" +
                    map.latLngToLayerPoint(d.LatLng).x + "," +
                    map.latLngToLayerPoint(d.LatLng).y + ")";
            }
        )
    }
})    