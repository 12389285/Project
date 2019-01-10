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

  svgset(data, dataIncidents, dataFatal, dataNon_fatal);

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

function svgset(data, dataIncidents, dataFatal, dataNon_fatal) {

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
  Barchart(data, dataIncidents, svgBar);
  Linechart(data, dataFatal, dataNon_fatal, svgLine);

}

function updateMap(data, dataIncidents, svgMap, year, color) {

  // get year from slider
  var year = year.getFullYear();
  year = year.toString();

  var numberbyCode = {};

  dataIncidents.forEach(function(d) { numberbyCode[d['Code|2017']] = d['Incidents|' + year]; });
  data.features.forEach(function(d) { d['Incidents|' + year] = numberbyCode[d.id]});

  // Set tooltips
  var tip = d3.tip()
              .attr('class', 'd3-tip')
              .html(function(d) {
                return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>" + "<strong>Number of attacks: </strong><span class='details'>" + d['Incidents|' + year] +"</span>";
              });

  svgMap.call(tip);

  // change path colors
  svgMap.selectAll("path")
        .style("fill", function(d) {
          return color(numberbyCode[d.id]); })
        .style('stroke', 'white')
        .style('stroke-width', 1.5)
        .style("opacity",0.8)
        // tooltips
        .style("stroke","grey")
        .style('stroke-width', 0.2)
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
            .style("stroke","grey")
            .style("stroke-width",0.2);
        });
}

function Map(data, dataIncidents, svgMap) {

  width = 800
  height = 450

  // Set tooltips
  var tip = d3.tip()
              .attr('class', 'd3-tip')
              .html(function(d) {
                return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>" + "<strong>Number of attacks: </strong><span class='details'>" + d['Incidents|1970'] +"</span>";
              })

  // colorscale for countries
  var color = d3.scaleThreshold()
      .domain([0,1,5,10,50,100,500,1000,2000,3000,6000])
      .range(["#ffffff", "#ffffff", "#e6e6ff", "#ccccff", "#8080ff", "#4d4dff","#3333ff","#0000ff","#0000cc","##000099", "#000066"]);

  var path = d3.geoPath();

  var projection = d3.geoMercator()
              .scale(120)
              .translate( [width / 2, height / 1.5]);

  var path = d3.geoPath()
               .projection(projection);

  svgMap.call(tip);

  var numberbyCode = {};

  dataIncidents.forEach(function(d) { numberbyCode[d['Code|2017']] = d['Incidents|1970']; });
  data.features.forEach(function(d) { d['Incidents|1970'] = numberbyCode[d.id] });

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
        .style("stroke","grey")
        .style('stroke-width', 0.2)
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
            .style("stroke","grey")
            .style("stroke-width",0.2);
        });

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
      .on('onchange', val => {
        updateMap(data, dataIncidents, svgMap, val, color)
        d3.select('#mapyear').text(d3.timeFormat('%Y')(val));
      });

  var gTime = d3
    .select('div#slider-time')
    .append('svg')
    .attr('width', 800)
    .attr('height', 80)
    .append('g')
    .attr('transform', 'translate(30,30)');

  gTime.call(sliderTime);

  d3.select('.mapsvg')
      .append("text")
        .style("font-size", "25px")
        .attr("id", "mapyear")
        .attr("x", 30)
        .attr("y", 40)
        .text(d3.timeFormat('%Y')(sliderTime.value()));

  // update barchart with all years

  // d3.selectAll("path")
  //   .on("click", function(d) {
  //     Barchart(co2, d.properties.name, svgBar)
  //   })

  var linear = d3.scaleLinear()
    .domain(["No data",1,5,10,50,100,500,1000,2000,3000,6000])
    .range(["#ffffff", "#ffffff", "#e6e6ff", "#ccccff", "#8080ff", "#4d4dff","#3333ff","#0000ff","#0000cc","##000099", "#000066"]);

  d3.select('.mapsvg')
    .append("g")
    .attr("class", "legendLinear")
    .attr("transform", "translate(10,270)");

  var legendLinear = d3.legendColor()
    .shapeWidth(15)
    .cells([0,1,5,10,50,100,500,1000,2000,3000,6000])
    .orient('vertical')
    .scale(linear);

  svgMap = d3.select('.mapsvg');

  svgMap.select(".legendLinear")
    .call(legendLinear);
}

function Barchart(data, dataIncidents, svgBar) {

  margin = {top: 20, right: 20, bottom: 30, left: 20},
  width = +svgBar.attr("width") - margin.left - margin.right,
  height = +svgBar.attr("height") - margin.top - margin.bottom,
  g = svgBar.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var xScale = d3.scaleBand()
  	 .rangeRound([width, 0])
  	 .padding(0.1);

  var yScale = d3.scaleLinear()
	   .rangeRound([height, 0]);

  xScale.domain(dataIncidents.map(function (d) {
   			return d["incidents|2017"];
   		}));
 	yScale.domain([0, d3.max(dataIncidents, function (d) {
        console.log(d["incidents|2017"]);
 				return d["incidents|2017"];
 			})]);

 	g.append("g")
 	// .attr("transform", "translate(0," + height + ")")
 	.call(d3.axisBottom(xScale))

 	g.append("g")
 	.call(d3.axisLeft(yScale))
 	.append("text")
 	.attr("fill", "#000")
 	// .attr("transform", "translate(20, 0)")
 	// .attr("y", 6)
 	// .attr("dy", "0.71em")
 	.attr("text-anchor", "end")
 	.text("Attacks");

}

function Linechart(data, dataFatal, dataNon_fatal, svgLine) {

}
