function Linechart(data, dataFatal, dataNon_fatal, svgLine, country) {

  var lineWorld = [];
  var yearsWorld = [];

  var lineWorldN = [];
  var yearsWorldN = [];

  var topPadding = 30;

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
    .range([height, margin.top + topPadding]);

  var xAxis = d3.axisBottom()
    .scale(xScale)
    .tickFormat(d3.format(".0f"));

  var yAxis = d3.axisLeft()
    .scale(yScale)

  d3.selectAll(".world")
    .on("click", function(d) {

      button = "World"

      return Buttons(data, dataFatal, dataNon_fatal, svgLine, margin, width, height, xScale, yScale, country, yAxis, button);
    });

  d3.selectAll(".asia")
    .on("click", function(d) {

      button = "South Asia"

      return Buttons(data, dataFatal, dataNon_fatal, svgLine, margin, width, height, xScale, yScale, country, yAxis, button);
    });

  d3.selectAll(".europe")
    .on("click", function(d) {

      button = "Eastern Europe"

      return Buttons(data, dataFatal, dataNon_fatal, svgLine, margin, width, height, xScale, yScale, country, yAxis, button);
    });

  d3.selectAll(".middle")
    .on("click", function(d) {

      button = "Middle East & North Africa"

      return Buttons(data, dataFatal, dataNon_fatal, svgLine, margin, width, height, xScale, yScale, country, yAxis, button);
    });

  d3.select("#objectID").on("change", change)

  function change() {

      var code = d3.select("#objectID").node().value;

      dropdownLines(data, dataFatal, dataNon_fatal, svgLine, margin, width, height, xScale, yScale, country, yAxis, code);

  }

  if (lineCounter == 0) {

    // add legend
    svgLine.append("g")
      .attr("class", "legendLines")
      .attr("transform", "translate(1220," + margin.top + ")")

    svgLine.selectAll(".legendLines")
        .append("rect")
          .attr("y", 10 + topPadding)
          .attr("width", 12)
          .attr("height", 4)
          .style("fill", "#dc143c");

    svgLine.selectAll(".legendLines")
        .append("text")
          .attr("font-size","12px")
          .attr("y", 13 + topPadding)
          .attr("x", 17)
          .text("Fatalities");

    svgLine.selectAll(".legendLines")
        .append("rect")
          .attr("y", 21 + topPadding)
          .attr("width", 12)
          .attr("height", 4)
          .style("fill", "#4073dc");

    svgLine.selectAll(".legendLines")
        .append("text")
          .attr("font-size","12px")
          .attr("y", 24 + topPadding)
          .attr("x", 17)
          .text("Injuries");

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
            .tickSize(-width + margin.right + margin.left)
            .tickSizeOuter(0)
            .tickFormat("");
    };

    // add the Y gridlines
    svgLine.append("g")
        .attr("class", "grid")
        .style("stroke-dasharray",("3,3"))
        .attr("transform", "translate(45," + 0 + ")")
        .call(gridLines());

    svgLine.append("g")
    	.append("text")
        .attr("class", "yLabel")
        .attr("font-size","10px")
      	.attr("fill", "#000")
      	.attr("transform", "rotate(-90)")
      	.attr("y", 60)
        .attr("x", -60)
      	.attr("text-anchor", "end")
      	.text("Fatalities/injuries");

    svgLine.append("g")
    	.append("text")
        .attr("class", "lineTitle")
        .attr("font-size","20px")
      	.attr("fill", "#000")
      	.attr("text-anchor", "middle")
      	.attr("x", width / 2 - margin.left)
        .attr("y", 30)
      	.text("World");

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

    // parsing data non fatal world
    dataNon_fatal.forEach(function (d) {
      if (d['Code|2017'] == "OWID_WRL") {
        currentCountryN = d["Country"]
        year = 1970
        yearsWorldN.push(year)
        lineWorldN.push(d["Incidents|" + year])
        for(i = 0; i < 47; i++) {
          year += 1
          if (d["Incidents|" + year] != undefined || d["Incidents|" + year] != null) {
            yearsWorldN.push(year)
            lineWorldN.push(d["Incidents|" + year])
          }
        }
      }
    })

    var lineW = d3.line()
      .x(function(d, i) {return xScale(yearsWorld[i]) + 20; }) // set the x values for the line generator
      .y(function(d) {return yScale(d); }) // set the y values for the line generator

    var lineWN = d3.line()
      .x(function(d, i) { return xScale(yearsWorldN[i]) + 20; }) // set the x values for the line generator
      .y(function(d) {return yScale(d); }) // set the y values for the line generator

    // line fatal
    svgLine.append("path")
      .datum(lineWorld) // 10. Binds data to the line
      .attr("id", "linechartFatal")
      .style("stroke", "#dc143c")
      .style("stroke-width", "2px")
      .attr("d", lineW)
      .on('mouseover', function (d, i) {
          d3.select(this)
          .style("stroke", "grey")
          .style("stroke-width", 4)
        })
          .on('mouseout', function (d) {
            d3.select(this)
            .style("stroke", "#dc143c")
            .style("stroke-width", 2)
        })

    // line non fatal world
    svgLine.append("path")
      .datum(lineWorldN) // 10. Binds data to the line
      .attr("id", "linechartNonfatal") // Assign a class for styling
      .style("stroke", "#4073dc")
      .style("stroke-width", "2px")
      .attr("d", lineWN)
      .on('mouseover', function (d, i) {
          d3.select(this)
          .style("stroke", "grey")
          .style("stroke-width", 4)
        })
          .on('mouseout', function (d) {
            d3.select(this)
            .style("stroke", "#4073dc")
            .style("stroke-width", 2)
        });

    tipLine(svgLine, lineWorld, lineWorldN, xScale, yScale, yearsWorld, yearsWorldN);

    lineCounter += 1;
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

  if (lineFatal.length > 0) {

    svgLine.select(".select")
           .remove();

    svgLine.select(".lineTitle")
           .remove();

    svgLine.append("g")
         .append("text")
           .attr("class", "lineTitle")
           .attr("font-size","20px")
           .attr("fill", "#000")
           .attr("text-anchor", "middle")
           .attr("x", width / 2 - margin.left)
           .attr("y", 30)
             .text(currentCountry);

    updateFunction(lineFatal, lineNonfatal, yearsFatal, yearsNonfatal, xScale, yScale, yAxis, country, svgLine);
  }
  else {

    svgLine.select(".select")
           .remove();

    svgLine.select(".lineTitle")
            .remove();

    svgLine.append("g")
          .append("text")
            .attr("class", "lineTitle")
            .attr("font-size","20px")
            .attr("fill", "#000")
            .attr("text-anchor", "middle")
            .attr("x", width / 2 - margin.left)
            .attr("y", 30)
              .text(currentCountry);

    // create select
    svgLine.append("text")
      .attr("class", "select")
      .attr("font-size","20px")
      .attr("fill", "lightgrey")
      .attr("x", width / 2 - margin.left)
      .attr("y", height / 2)
      .style("text-anchor", "middle")
      .text("No data available");

    updateFunction(lineFatal, lineNonfatal, yearsFatal, yearsNonfatal, xScale, yScale, yAxis, country, svgLine);
  }
}
