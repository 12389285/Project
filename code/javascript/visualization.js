var incidents = "../../data/terrorist_incidents.json"

var fatal = "../../data/fatal_terrorism.json"

var non_fatal = "../../data/non_fatal_terrorism.json"

var world_countries = "../../data/world_countries.json"

var requests = [d3.json(world_countries), d3.json(incidents), d3.json(fatal), d3.json(non_fatal)];

var dataset = 0

Promise.all(requests).then(function(response) {
  dataset = response

  console.log(dataset);
  // data = response[0];
  // var co2 = response[1];
  // Map(data, co2, 2012);
  svgset()
  // make empty svg for barchart
  // var svgBar = d3.select("#barchart")
  //     .append("svg")
  //     .attr("width", 500)
  //     .attr("height", 500)
  //     .append('g')
  //     .attr('class', 'bar');

  // on click function for update map
  // d3.selectAll(".m")
  //   .on("click", function(d) {
  //     var index = this.getAttribute("value");
  //     updateMap(data, co2, index, svgBar)
  //   })

  // on click function for barchart
  // d3.selectAll("path")
  //   .on("click", function(d) {
  //     Barchart(co2, d.properties.name, svgBar)
  //   })

}).catch(function(e){
    throw(e);
});

function svgset() {

  var svgBar = d3.select("#barchart")
      .append("svg")
      .attr("width", 500)
      .attr("height", 500)
      .append('g')
      .attr('class', 'bar');

  var svgMap = d3.select("#map")
      .append("svg")
      .attr("class", "mapsvg")
      .attr("width", 800)
      .attr("height", 500)
      .append('g')
      .attr('class', 'map');

  var svgLine = d3.select("#linechartleft")
      .append("svg")
      .attr("class", "linechart")
      .attr("width", 800)
      .attr("height", 500)
      .append('g')
      .attr('class', 'line');


}
