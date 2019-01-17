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
      .attr("width", 1310)
      .attr("height", height)
      .append('g')
      .attr('class', 'line');

  Map(data, dataIncidents, svgMap, svgBar, svgLine, dataFatal, dataNon_fatal);
  Barchart(data, dataIncidents, svgBar);
  Linechart(data, dataFatal, dataNon_fatal, svgLine);

}

function updateMap(data, dataIncidents, svgMap, year, color, svgBar, svgLine, dataFatal, dataNon_fatal) {

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
            .style("stroke-width",1);
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
        barCounter += 1;
        Barchart(data, dataIncidents, svgBar, d.properties.name, d['Incidents|' + year], year);
        Linechart(data, dataFatal, dataNon_fatal, svgLine, d.id);
      });
}

function Map(data, dataIncidents, svgMap, svgBar, svgLine, dataFatal, dataNon_fatal) {

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
      .domain([0,1,5,50,100,250,500,1000,1500,2000,3500])
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
            .style("stroke-width",1);
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
      barCounter += 1;
      year = 1970
      Barchart(data, dataIncidents, svgBar, d.properties.name, d['Incidents|1970'], year);
      Linechart(data, dataFatal, dataNon_fatal, svgLine, d.id);
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
        updateMap(data, dataIncidents, svgMap, val, color, svgBar, svgLine, dataFatal, dataNon_fatal)
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
    .domain([0,1,5,50,100,250,500,1000,1500,2000,3500])
    .range(["#ffffff", "#ffffff", "#e6e6ff", "#ccccff", "#8080ff", "#4d4dff","#3333ff","#0000ff","#0000cc","##000099", "#000066"]);

  d3.select('.mapsvg')
    .append("g")
    .attr("class", "legendLinear")
    .attr("transform", "translate(10,270)");

  var legendLinear = d3.legendColor()
    .shapeWidth(15)
    .cells([0,1,5,50,100,250,500,1000,1500,2000,3500])
    .orient('vertical')
    .scale(linear);

  svgMap = d3.select('.mapsvg');

  svgMap.select(".legendLinear")
    .call(legendLinear);
}

function updateBar(data, dataIncidents, svgBar, xScale, yScale, margin, width, height, country, number, year, yAxis) {

  // create tip
  var tip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(function(d) {
        return "<strong>Country:</strong> <span style='color:white'>"
              + country + "</span><br><strong>Attacks:</strong> \
              <span style='color:white'>"
              + number + "</span>";
      })

  svgBar.call(tip)

  // add the horizontal bars
  svgBar.append("rect")
      .attr("class", "bar")
      .attr("x", function (d,i) {
          bars = (barCounter * 40) + 20;
          return bars;
      })
      .attr("width", 20)
      .attr("y", function (d) {
          return yScale(number);
      })
      .attr("height", function (d) {
        return height - yScale(number);
      })
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);

  // create xaxis text
  svgBar.append("g")
    .attr("transform", "translate(0" + positionX + ",438)")
    .append("text")
      .attr("class", "xText")
      .attr("font-size","8px")
      .attr("fill", "black")
      .style("text-anchor", "end")
      .attr("transform", "rotate(-45)")
      .text(country + "|" + year)
}

function Barchart(data, dataIncidents, svgBar, country, number, year) {

  // console.log(barCounter);

  // .svgbar.select(".yaxis")
    // .transition()
    // .duration(5)
    // .call(d3.axisLeft(yScale))

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
    .domain([0, 4000])
    .range([height, margin.top]);

  var xAxis = d3.axisBottom()
    .scale(xScale)
    .ticks(0)

  var yAxis = d3.axisLeft()
    .scale(yScale);

  // resetten
  function Reset() {

      positionX = 75;

      barCounter = 0;

      bars = svgBar.selectAll("rect")
                      .remove();

      xtext = svgBar.selectAll(".xText")
                    .remove();

      reset = svgBar.selectAll(".reset")
                    .remove();

      Select();

      return bars, xtext
  }

  function Select() {
    // create reset
    svgBar.append("text")
      .attr("class", "select")
      .attr("font-size","20px")
      .attr("fill", "lightgrey")
      .attr("x", 250)
      .attr("y", 210)
      .style("text-anchor", "middle")
      .text("Select a country in the world map");
  }

  d3.selectAll(".reset")
    .on("click", function(d) {
      return Reset();
    });

  // create tip
  var tip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(function(d) {
        return "<strong>Country:</strong> <span style='color:white'>"
              + country + "</span><br><strong>Attacks:</strong> \
              <span style='color:white'>"
              + number + "</span>";
      })

  svgBar.call(tip)

  // only insert axis ones
  if (barCounter == 0) {

    // append group and insert axis
    var gX = svgBar.append("g")
      .attr("class", "xaxis")
      .attr("transform", "translate(20," + height + ")")
      .call(xAxis)

      // append group and insert axis
    var gY = svgBar.append("g")
      .attr("class", "yaxis")
      .attr("transform", "translate(40," + 0 + ")")
      .call(yAxis);

    // gridlines in y axis function
    function gridLines() {
        return d3.axisLeft(yScale)
            .ticks(6)};

    // add the Y gridlines
    svgBar.append("g")
        .attr("class", "grid")
        .style("stroke-dasharray",("3,3"))
        .attr("transform", "translate(40," + 0 + ")")
        .call(gridLines()
            .tickSize(- width + margin.right)
            .tickFormat(""));

    svgBar.append("g")
    	.append("text")
        .attr("font-size","10px")
      	.attr("fill", "#000")
      	.attr("transform", "rotate(-90)")
      	.attr("y", 52)
        .attr("x", -30)
      	.attr("text-anchor", "end")
      	.text("Attacks");

    Select();
  }

  // First bar
  if (barCounter == 1) {

    svgBar.selectAll(".select")
                  .remove();

    // add the vertical bars
    svgBar.append("rect")
        .attr("class", "bar")
        .attr("x", function (d,i) {
            bars = (barCounter * 30) + 30;
            return bars;
        })
        .attr("width", 20)
        .attr("y", function (d) {
            return yScale(number);
        })
        .attr("height", function (d) {
          return height - yScale(number);
        })
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);

      // create xaxis text
      svgBar.append("g")
        .attr("transform", "translate(75,438)")
        .append("text")
          .attr("class", "xText")
          .attr("font-size","8px")
          .attr("fill", "black")
          .style("text-anchor", "end")
          .attr("transform", "rotate(-45)")
          .text(country + "|" + year)

  }

  // Add bar to barchart
  else if (barCounter >= 2 && barCounter <= 11) {

    positionX += 40;

    updateBar(data, dataIncidents, svgBar, xScale, yScale, margin, width, height, country, number, year, yAxis);

  }

  // warning for amount of barcharts
  else if (barCounter == 12) {

    // create reset
    svgBar.append("text")
      .attr("class", "reset")
      .attr("font-size","20px")
      .attr("fill", "black")
      .attr("x", 250)
      .attr("y", 60)
      .style("text-anchor", "middle")
      .text("Please reset the barchart")
  }

  // reset barchart
  else if (barCounter > 12) {
    Reset();
  }
}

function Linechart(data, dataFatal, dataNon_fatal, svgLine, country) {

  margin = {top: 20, right: 50, bottom: 20, left: 25},
  width = 1310 - margin.left - margin.right,
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

  var lineWorld = [];

  var yearsWorld = [];

  d3.selectAll(".world")
    .on("click", function(d) {
      return lineCounter;
    });


  if (lineCounter == 0) {

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
            .tickSize(-width + margin.right + margin.left)
            .tickFormat(""));

    svgLine.append("g")
    	.append("text")
        .attr("class", "yLabel")
        .attr("font-size","10px")
      	.attr("fill", "#000")
      	.attr("transform", "rotate(-90)")
      	.attr("y", 60)
        .attr("x", -30)
      	.attr("text-anchor", "end")
      	.text("Fatalities/injuries");

    // create select
    svgLine.append("text")
      .attr("class", "select")
      .attr("font-size","20px")
      .attr("fill", "lightgrey")
      .attr("x", 655 - margin.left)
      .attr("y", 250)
      .style("text-anchor", "middle")
      .text("Select a country in the world map");

    // parsing data world fatalities
    dataFatal.forEach(function (d) {
      if (d['Code|2017'] == "OWID_WRL") {
        currentCountry = d["Country"]
        year = 1970
        yearsWorld.push(year)
        lineWorld.push(d["Incidents|" + year])
        for(i = 0; i < 47; i++) {
          year += 1
          if (d["Incidents|" + year] != undefined || d["Incidents|" + year] != null) {
            yearsWorld.push(year)
            lineWorld.push(d["Incidents|" + year])
          }
        }
      }
    })

    // Draw line fatalities
    var tip = d3.tip()
              .attr('class', 'd3-tip')
              .offset([-10, 0])
              .html(function(d,i) {
                return "<strong>Country:</strong> <span style='color:white'>"
                      + currentCountry + "</span><br><strong>Fatalities:</strong> \
                      <span style='color:white'>"
                      + d + "</span><br><strong>Year:</strong> \
                      <span style='color:white'>"
                      + yearsWorld[i] + "</span>";
    })

    svgLine.call(tip);

    var lineW = d3.line()
      .x(function(d, i) {return xScale(yearsWorld[i]) + 20; }) // set the x values for the line generator
      .y(function(d) {return yScale(d); }) // set the y values for the line generator

    // line fatal
    svgLine.append("path")
      .datum(lineWorld) // 10. Binds data to the line
      .attr("id", "linechartFatal") // Assign a class for styling
      .style("stroke", "#7e7b52")
      .style("stroke-width", "2px")
      .attr("d", lineW);

    svgLine.selectAll(".dot")
      .data(lineWorld)
      .enter().append("circle") // Uses the enter().append() method
          .attr("class", "dot") // Assign a class for styling
          .attr("cx", function(d, i) { return xScale(yearsWorld[i]) + 20 })
          .attr("cy", function(d) { return yScale(d) })
          .attr("r", 3)// 11. Calls the line generator
    .on('mouseover', function (d, i) {
      tip.show(d,i)
      d3.select(this)
      .style("stroke", "white")
      .attr("r", 6)
    })
    .on('mouseout', function (d) {
      tip.hide(d)
      d3.select(this)
      .style("stroke", "white")
      .attr("r", 3)
    })

    lineCounter += 1
  }

  else if (lineCounter > 0) {

    // remove instructions
    svgLine.select(".select")
           .remove();

    // Update lines with new data
    updateLines(data, dataFatal, dataNon_fatal, svgLine, margin, width, height, xScale, yScale, country, yAxis)
  }

}

function updateLines(data, dataFatal, dataNon_fatal, svgLine, margin, width, height, xScale, yScale, country, yAxis) {

  svgLine.selectAll(".dot")
        .remove();

  svgLine.selectAll(".dotN")
        .remove();

  //
  // svgLine.selectAll(".dotW")
  //       .remove();
  //

  lineFatal = [];
  lineNonfatal = [];


  yearsFatal = [];
  yearsNonfatal = [];


  year = 1970

  // parsing data fatalities
  dataFatal.forEach(function (d) {
    if (d['Code|2017'] == country) {
      currentCountry = d["Country"]
      year = 1970
      yearsFatal.push(year)
      lineFatal.push(d["Incidents|" + year])
      for(i = 0; i < 47; i++) {
        year += 1
        if (d["Incidents|" + year] != undefined || d["Incidents|" + year] != null) {
          yearsFatal.push(year)
          lineFatal.push(d["Incidents|" + year])
        }
      }
    }
  })

  // parsing data injuries
  dataNon_fatal.forEach(function (d) {
    if (d['Code|2017'] == country) {
      currentCountryN = d["Country"]
      year = 1970
      yearsNonfatal.push(year)
      lineNonfatal.push(d["Incidents|" + year])
      for(i = 0; i < 47; i++) {
        year += 1
        if (d["Incidents|" + year] != undefined || d["Incidents|" + year] != null) {
          yearsNonfatal.push(year)
          lineNonfatal.push(d["Incidents|" + year])
        }
      }
    }
  })

  // Draw line fatalities
  var tip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(d,i) {
              return "<strong>Country:</strong> <span style='color:white'>"
                    + currentCountry + "</span><br><strong>Fatalities:</strong> \
                    <span style='color:white'>"
                    + d + "</span><br><strong>Year:</strong> \
                    <span style='color:white'>"
                    + yearsFatal[i] + "</span>";
  })

  svgLine.call(tip);

  var lineF = d3.line()
  .x(function(d, i) { return xScale(yearsFatal[i]) + 20; }) // set the x values for the line generator
  .y(function(d) {return yScale(d); }) // set the y values for the line generator

  // line fatal
  svgLine.append("path")
    .datum(lineFatal) // 10. Binds data to the line
    .attr("id", "linechartFatal") // Assign a class for styling
    .style("stroke", "#dc143c")
    .style("stroke-width", "2px")
    .attr("d", lineF)

  svgLine.selectAll(".dot" + country)
    .data(lineFatal)
    .enter().append("circle") // Uses the enter().append() method
        .attr("class", "dot") // Assign a class for styling
        .attr("cx", function(d, i) { return xScale(yearsFatal[i]) + 20 })
        .attr("cy", function(d) { return yScale(d) })
        .attr("r", 3)// 11. Calls the line generator
  .on('mouseover', function (d, i) {
    tip.show(d,i)
    d3.select(this)
    .style("stroke", "white")
    .attr("r", 6)
  })
  .on('mouseout', function (d) {
    tip.hide(d)
    d3.select(this)
    .style("stroke", "white")
    .attr("r", 3)
  })

  // draw line injuries
  var tip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(d,i) {
              return "<strong>Country:</strong> <span style='color:white'>"
                    + currentCountry + "</span><br><strong>Injuries:</strong> \
                    <span style='color:white'>"
                    + d + "</span><br><strong>Year:</strong> \
                    <span style='color:white'>"
                    + yearsFatal[i] + "</span>";
  })

  svgLine.call(tip);

  var lineN = d3.line()
  .x(function(d, i) { return xScale(yearsNonfatal[i]) + 20; }) // set the x values for the line generator
  .y(function(d) {return yScale(d); }) // set the y values for the line generator

  // line non fatal
  svgLine.append("path")
    .datum(lineNonfatal) // 10. Binds data to the line
    .attr("id", "linechartNonfatal") // Assign a class for styling
    .style("stroke", "#4073dc")
    .style("stroke-width", "2px")
    .attr("d", lineN)

  svgLine.selectAll(".dot" + country)
    .data(lineNonfatal)
    .enter().append("circle") // Uses the enter().append() method
        .attr("class", "dotN") // Assign a class for styling
        .attr("cx", function(d, i) { return xScale(yearsNonfatal[i]) + 20 })
        .attr("cy", function(d) { return yScale(d) })
        .attr("r", 3)// 11. Calls the line generator
    .on('mouseover', function (d, i) {
      tip.show(d,i)
      d3.select(this)
      .style("stroke", "white")
      .attr("r", 6)
    })
    .on('mouseout', function (d) {
      tip.hide(d)
      d3.select(this)
      .style("stroke", "white")
      .attr("r", 3)
    })

  var uFatal = d3.selectAll('#linechartFatal')
    .datum(lineFatal);

    uFatal.enter()
      .select("path")
      .merge(uFatal)
      .style("stroke", "#dc143c")
      .style("stroke-width", "2px")
      .attr("d", lineF)

    uFatal.exit().remove();

  var uNon = d3.selectAll('#linechartNonfatal')
    .datum(lineNonfatal);

    uNon.enter()
      .select("path")
      .merge(uNon)
      .style("stroke", "#4073dc")
      .style("stroke-width", "2px")
      .attr("d", lineN)

    uNon.exit().remove();


  // var dot = d3.selectAll(".dot" + country)
  //   .data(lineFatal);
  //
  //   dot.enter()
  //           .selectAll("circle")
  //           .attr("class", "dot")// Assign a class for styling
  //           .attr("cx", function(d, i) { return xScale(yearsFatal[i]) + 20 })
  //           .attr("cy", function(d) { return yScale(d) })
  //           .attr("r", 3)// 11. Calls the line generator
  //     .on('mouseover', function (d, i) {
  //       tip.show(d,i)
  //       d3.select(this)
  //       .style("stroke", "white")
  //       .attr("r", 6)
  //     })
  //     .on('mouseout', function (d) {
  //       tip.hide(d)
  //       d3.select(this)
  //       .style("stroke", "white")
  //       .attr("r", 3)
  //     })
  //
  // dot.exit().remove();
  //
  // var dotN = d3.selectAll('.dot' + country)
  //   .data(lineNonfatal);
  //
  //   dotN.enter()
  //         .selectAll("circle")
  //         .attr("class", "dotN") // Assign a class for styling
  //         .attr("cx", function(d, i) { return xScale(yearsNonfatal[i]) + 20 })
  //         .attr("cy", function(d) { return yScale(d) })
  //         .attr("r", 3)// 11. Calls the line generator
  //     .on('mouseover', function (d, i) {
  //       tip.show(d,i)
  //       d3.select(this)
  //       .style("stroke", "white")
  //       .attr("r", 6)
  //     })
  //     .on('mouseout', function (d) {
  //       tip.hide(d)
  //       d3.select(this)
  //       .style("stroke", "white")
  //       .attr("r", 3)
  //     })
  //
  //     dotN.exit().remove();


}
