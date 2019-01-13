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

  Map(data, dataIncidents, svgMap, svgBar);
  Barchart(data, dataIncidents, svgBar);
  Linechart(data, dataFatal, dataNon_fatal, svgLine);

}

function updateMap(data, dataIncidents, svgMap, year, color, svgBar) {

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

    // update barchart with all years
    d3.selectAll("path")
      .on("click", function(d) {
        console.log(d.properties.name);
        console.log(d['Incidents|' + year]);
        Barchart(data, dataIncidents, svgBar, d.properties.name, d['Incidents|' + year], year);
      });
}

function Map(data, dataIncidents, svgMap, svgBar) {

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

  // update barchart with all years
  d3.selectAll("path")
    .on("click", function(d) {
      console.log(d.properties.name);
      console.log(d['Incidents|1970']);
      Barchart(data, dataIncidents, svgBar, d.properties.name, d['Incidents|1970']);
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
        updateMap(data, dataIncidents, svgMap, val, color, svgBar)
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

function AddBar(data, dataIncidents, svgBar, xScale, yScale, margin, width, height, country, number) {
  // add the horizontal bars
  svgBar.append("rect")
      .attr("class", "bar")
      // vraag over i * 50
      .attr("x", function (d,i) {
          bars = (i * 30) + 118;
          return bars;
      })
      .attr("width", 20)
      .attr("y", function (d) {
          return yScale(number);
      })
      .attr("height", function (d) {
        return height - yScale(number);
      });
}

function Barchart(data, dataIncidents, svgBar, country, number, year) {

  margin = {top: 20, right: 20, bottom: 50, left: 20},
  width = 500 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom,

  g = svgBar.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var xScale = d3.scaleLinear()
      .domain([0,10])
      .range([margin.left, width]);

  // make y_scale
  var yScale = d3.scaleLinear()
    .domain([0, 2000])
    .range([height, margin.top]);

  var xAxis = d3.axisBottom()
    .scale(xScale)
    // .ticks(country + "," + year);
    // .tickFormat(d3.format(".0f"));

  var yAxis = d3.axisLeft()
    .scale(yScale);

  // append group and insert axis
  var gX = svgBar.append("g")
    .attr("class", "xaxis")
    .attr("transform", "translate(20," + height + ")")
    .call(xAxis)
      .select("text")
        .text(country + ',' + year)
        .style("text-anchor", "end")
        .attr("transform", "rotate(-45)" )

    // append group and insert axis
  var gY = svgBar.append("g")
    .attr("class", "yaxis")
    .attr("transform", "translate(40," + 0 + ")")
    .call(yAxis);

  // resetten
  function Reset() {
      return svgBar.selectAll("rect")
                      .remove()
                   .selectAll("text")
                      .remove()
              };

  d3.selectAll(".reset")
    .on("click", function(d) {
      return Reset();
    })
  // d3.select(".bar")
  //   .append("button")
  //   .text("Reset")
  //   .attr("float", "center")
  //   .on("click", Reset());

  // add the horizontal bars
  svgBar.append("rect")
      .attr("class", "bar")
      // vraag over i * 50
      .attr("x", function (d,i) {
          bars = (i * 30) + 75;
          return bars;
      })
      .attr("width", 20)
      .attr("y", function (d) {
          return yScale(number);
      })
      .attr("height", function (d) {
        return height - yScale(number);
      });

  // geen x,y zichtbaar begin
  // volgende chart
  // NaN bij 1970

  AddBar(data, dataIncidents, svgBar, xScale, yScale, margin, width, height, country, number)

}

function Linechart(data, dataFatal, dataNon_fatal, svgLine) {

  // parsing data
  world = []

  worlddata = {}
  start = 1970
  //
  // for(i = 0; i < 48; i++) {

  // dataFatal.forEach(function(d) {
  //   if d["Code|2017"] == WLF {
  //     worlddata[d['Code|2017']] = d['Incidents|' + start];}
  //
  //   });
  //   start += 1
  // }
  console.log(worlddata);


  margin = {top: 20, right: 50, bottom: 20, left: 25},
  width = 800 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom,

  g = svgLine.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var xScale = d3.scaleLinear()
      .domain([1970, 2017])
      .range([margin.left, width - margin.right]);

  // make y_scale
  var yScale = d3.scaleLinear()
    .domain([0, 50000])
    .range([height, margin.top]);

  var xAxis = d3.axisBottom()
    .scale(xScale)
    .tickFormat(d3.format(".0f"));

  var yAxis = d3.axisLeft()
    .scale(yScale)
    .ticks(5)

  // append group and insert axis
  var gX = svgLine.append("g")
    .attr("class", "xaxis")
    .attr("transform", "translate(20," + height + ")")
    .call(xAxis);

  // append group and insert axis
  var gY = svgLine.append("g")
    .attr("class", "yaxis")
    .attr("transform", "translate(45," + 0 + ")")
    .call(yAxis);

  // gridlines in y axis function
  function gridLines() {
      return d3.axisLeft(yScale)
          .ticks(5)};

  // add the Y gridlines
  svgLine.append("g")
      .attr("class", "grid")
      .style("stroke-dasharray",("3,3"))
      .attr("transform", "translate(45," + 0 + ")")
      .call(gridLines()
          .tickSize(margin.left - width + margin.right)
          .tickFormat(""));

  svgLine.append("g")
  	.append("text")
      .attr("font-size","10px")
    	.attr("fill", "#000")
    	.attr("transform", "rotate(-90)")
    	.attr("y", 60)
      .attr("x", -30)
    	.attr("text-anchor", "end")
    	.text("Fatalities/injuries");

}
