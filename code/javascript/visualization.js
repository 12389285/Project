var incidents = "../../data/terrorist_incidents.json"

var fatal = "../../data/fatal_terrorism.json"

var non_fatal = "../../data/non_fatal_terrorism.json"

var world_countries = "../../data/world_countries.json"

var requests = [d3.json(world_countries), d3.json(incidents), d3.json(fatal), d3.json(non_fatal)];

var dataset = 0

Promise.all(requests).then(function(response) {
  dataset = response

  var data = response[0];
  var dataIncidents = response[1];
  var dataFatal = response[2];
  var dataNon_fatal = response[3];

  console.log(dataIncidents);

  svgset(data, dataIncidents);

  // on click function for update map
  // d3.selectAll(".m")
  //   .on("click", function(d) {
  //     var index = this.getAttribute("value");
  //     updateMap(data, co2, index, svgBar)
  //   })

  // on click function for barchart
  d3.selectAll("path")
    .on("click", function(d) {
      // Barchart(data, dataIncidents)
    })

}).catch(function(e){
    throw(e);
});

function svgset(data, dataIncidents) {

  height = 500
  widthBig = 800
  widthSmall = 500

  var svgBar = d3.select("#barchart")
      .append("svg")
      .attr("width", widthSmall)
      .attr("height", height)
      .append('g')
      .attr('class', 'bar');

  var svgMap = d3.select("#map")
      .append("svg")
      .attr("class", "mapsvg")
      .attr("width", widthBig)
      .attr("height", height)
      .append('g')
      .attr('class', 'map');

  var svgLine = d3.select("#linechartleft")
      .append("svg")
      .attr("class", "linechart")
      .attr("width", widthBig)
      .attr("height", height)
      .append('g')
      .attr('class', 'line');

  Map(data, dataIncidents, svgMap);

}

function updateMap(year) {

    var sliderYear = year;

    console.log(sliderYear);
}

function Map(data, dataIncidents, svgMap) {

  // d3.select(".mapsvg")
    // .remove();

  width = 800
  height = 450

  // Set tooltips
  var tip = d3.tip()
              .attr('class', 'd3-tip')
              .html(function(d) {
                return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>" + "<strong>Number of attacks: </strong><span class='details'>" + d['Incidents|2017'] +"</span>";
              })

  // colorscale for countries
  var color = d3.scaleThreshold()
      .domain([0,5,10,50,100,500,1000,2000,3000,6000])
      .range(["#ffffff", "#e6e6ff", "#ccccff", "#8080ff", "#4d4dff","##3333ff","#0000ff","#0000cc","##000099", "#000066"]);

  var path = d3.geoPath();

  var projection = d3.geoMercator()
              .scale(120)
              .translate( [width / 2, height / 1.5]);

  var path = d3.geoPath()
               .projection(projection);

  svgMap.call(tip);

  var numberbyCode = {};

  dataIncidents.forEach(function(d) { numberbyCode[d['Code|2017']] = d['Incidents|2017']; });
  data.features.forEach(function(d) { d['Incidents|2017'] = numberbyCode[d.id] });

  // worldmap settings
  svgMap.append("g")
      .attr("class", "countries")
    .selectAll("path")
      .data(data.features)
    .enter().append("path")
      .attr("d", path)
      .style("fill", function(d) {
        return color(numberbyCode[d.id]); })
      .style('stroke', 'white')
      .style('stroke-width', 1.5)
      .style("opacity",0.8)
      // tooltips
        .style("stroke","white")
        .style('stroke-width', 0.3)
        .on('mouseover',function(d){
          tip.show(d);
          d3.select(this)
            .style("opacity", 1)
            .style("stroke","blue")
            .style("stroke-width",3);
        })
        .on('mouseout', function(d){
          tip.hide(d);
          d3.select(this)
            .style("opacity", 0.8)
            .style("stroke","white")
            .style("stroke-width",0.3);
        });

  // update barchart with all years

  // d3.selectAll("path")
  //   .on("click", function(d) {
  //     Barchart(co2, d.properties.name, svgBar)
  //   })

  svgMap.append("path")
      .datum(topojson.mesh(data.features, function(a, b) {
        return a.id !== b.id; }))
      .attr("class", "names")
      .attr("d", path);

  // Setting slider
  var dataTime = d3.range(0, 48).map(function(d) {
    return new Date(1970 + d, 10, 3);
  });

  var sliderTime = d3
    .sliderBottom()
    .min(d3.min(dataTime))
    .max(d3.max(dataTime))
    .step(1000 * 60 * 60 * 24 * 365)
    .width(750)
    .tickFormat(d3.timeFormat('%Y'))
    // .default(new Date(1998, 10, 3))
    .on('onchange', val => {
      d3.select('p#value-time').text(d3.timeFormat('%Y')(val));
    });

  var gTime = d3
    .select('div#slider-time')
    .append('svg')
    .attr('width', 800)
    .attr('height', 80)
    .append('g')
    .attr('transform', 'translate(30,30)');

  gTime.call(sliderTime);

  var year = d3.select('p#value-time').text(d3.timeFormat('%Y')(sliderTime.value()));

  console.log(year);

  updateMap(year)

}
