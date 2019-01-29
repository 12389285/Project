var incidents = "../../data/terrorist_incidents.json"

var fatal = "../../data/fatal_terrorism.json"

var non_fatal = "../../data/non_fatal_terrorism.json"

var world_countries = "../../data/world_countries.json"

var requests = [d3.json(world_countries), d3.json(incidents), d3.json(fatal), d3.json(non_fatal)];

var dataset = 0;

var barCounter = 0;

var lineCounter = 0;

var positionX = 75;

var barData = [];

var duration = 1000;

Promise.all(requests).then(function(response) {
  dataset = response

  // dividing data
  var data = response[0];
  var dataIncidents = response[1];
  var dataFatal = response[2];
  var dataNon_fatal = response[3];

  svgSet(data, dataIncidents, dataFatal, dataNon_fatal);

}).catch(function(e){
    throw(e);
});

function svgSet(data, dataIncidents, dataFatal, dataNon_fatal) {

  /*
  This function takes as input all the data and outputs all the svg's with
  the data assigned to svg
  */

  height = 500
  widthMap = 800
  widthBar = 500
  widthLine = 1310

  // setting svg's for all visualization
  var svgBar = d3.select("#barchart")
      .append("svg")
      .attr("width", widthBar)
      .attr("height", height)
      .append('g')
      .attr('class', 'bar');

  var svgMap = d3.select("#map")
      .append("svg")
      .attr("class", "mapsvg")
      .attr("width", widthMap)
      .attr("height", height)
      .append('g')
      .attr('class', 'map');

  var svgLine = d3.select("#linechartleft")
      .append("svg")
      .attr("class", "linechart")
      .attr("width", widthLine)
      .attr("height", height)
      .append('g')
      .attr('class', 'line');

  // send data to all functions
  Map(data, dataIncidents, svgMap, svgBar, svgLine, dataFatal, dataNon_fatal);
  Barchart(data, dataIncidents, svgBar);
  Linechart(data, dataFatal, dataNon_fatal, svgLine);
}
