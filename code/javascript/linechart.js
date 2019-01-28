function Linechart(data, dataFatal, dataNon_fatal, svgLine, country) {

  // empty lists first
  var lineFatal = [];
  var yearsFatal = [];
  var lineNonfatal = [];
  var yearsNonfatal = [];

  var topPadding = 30;

  let margin = {top: 20, right: 50, bottom: 20, left: 25},
      width = 1310 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom,

      g = svgLine.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // set x scale
  var xScale = d3.scaleLinear()
    .domain([1970, 2017])
    .range([margin.left, width - margin.right]);

  // set y scale
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

      button = "World";

      return Buttons(data, dataFatal, dataNon_fatal, svgLine, margin, width, height, xScale, yScale, country, yAxis, button);
    });

  d3.selectAll(".asia")
    .on("click", function(d) {

      button = "South Asia";

      return Buttons(data, dataFatal, dataNon_fatal, svgLine, margin, width, height, xScale, yScale, country, yAxis, button);
    });

  d3.selectAll(".europe")
    .on("click", function(d) {

      button = "Eastern Europe";

      return Buttons(data, dataFatal, dataNon_fatal, svgLine, margin, width, height, xScale, yScale, country, yAxis, button);
    });

  d3.selectAll(".middle")
    .on("click", function(d) {

      button = "Middle East & North Africa";

      return Buttons(data, dataFatal, dataNon_fatal, svgLine, margin, width, height, xScale, yScale, country, yAxis, button);
    });

  d3.select("#objectID").on("change", change)

  function change() {

      var code = d3.select("#objectID").node().value;

      dropdownLines(data, dataFatal, dataNon_fatal, svgLine, margin, width, height, xScale, yScale, country, yAxis, code);

  }

  // start settings
  if (lineCounter == 0) {

    var code = "OWID_WRL"

    var year = 1970;

    // add legend
    svgLine.append("g")
      .attr("class", "legendLines")
      .attr("transform", "translate(1220," + margin.top + ")");

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

    // parse data to lists
    parseCode(dataFatal, dataNon_fatal, lineFatal, lineNonfatal, yearsFatal, yearsNonfatal, year, code);

    // set the x and y values for the fatal line generator
    var lineW = d3.line()
      .x(function(d, i) {return xScale(yearsFatal[i]) + 20; })
      .y(function(d) {return yScale(d); });

    // set the x and y values for the non fatal line generator
    var lineWN = d3.line()
      .x(function(d, i) { return xScale(yearsNonfatal[i]) + 20; })
      .y(function(d) {return yScale(d); });

    // line fatal
    svgLine.append("path")
      .datum(lineFatal)
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
        });

    // line non fatal world
    svgLine.append("path")
      .datum(lineNonfatal)
      .attr("id", "linechartNonfatal")
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

    // adding tip to line
    tipLine(svgLine, lineFatal, lineNonfatal, xScale, yScale, yearsFatal, yearsNonfatal);

    lineCounter += 1;
  }
  else if (lineCounter > 0) {

    // remove instructions
    svgLine.select(".select")
           .remove();

    // Update lines with new data
    updateLines(data, dataFatal, dataNon_fatal, svgLine, margin, width, height, xScale, yScale, country, yAxis);
  }

}

function updateLines(data, dataFatal, dataNon_fatal, svgLine, margin, width, height, xScale, yScale, country, yAxis) {

  // empty lists first
  var lineFatal = [];
  var yearsFatal = [];
  var lineNonfatal = [];
  var yearsNonfatal = [];

  var year = 1970;

  // parse data to lists
  parseCode(dataFatal, dataNon_fatal, lineFatal, lineNonfatal, yearsFatal, yearsNonfatal, year, country);

  // only update line when list is filled
  if (lineFatal.length > 0) {

    svgLine.select(".select")
           .remove();

    svgLine.select(".lineTitle")
           .remove();

    // update title
    svgLine.append("g")
         .append("text")
           .attr("class", "lineTitle")
           .attr("font-size","20px")
           .attr("fill", "#000")
           .attr("text-anchor", "middle")
           .attr("x", width / 2 - margin.left)
           .attr("y", 30)
             .text(currentCountry);

    // update lines
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

    // create no data
    svgLine.append("text")
      .attr("class", "select")
      .attr("font-size","20px")
      .attr("fill", "lightgrey")
      .attr("x", width / 2 - margin.left)
      .attr("y", height / 2)
      .style("text-anchor", "middle")
      .text("No data available");

    // update lines
    updateFunction(lineFatal, lineNonfatal, yearsFatal, yearsNonfatal, xScale, yScale, yAxis, country, svgLine);
  }
}

function dropdownLines(data, dataFatal, dataNon_fatal, svgLine, margin, width, height, xScale, yScale, country, yAxis, code) {

  // empty lists first
  var lineFatal = [];
  var lineNonfatal = [];
  var yearsFatal = [];
  var yearsNonfatal = [];

  var year = 1970;

  // parse data to lists
  parseCode(dataFatal, dataNon_fatal, lineFatal, lineNonfatal, yearsFatal, yearsNonfatal, year, code);

  // When data in lists
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

    // update lines
    updateFunction(lineFatal, lineNonfatal, yearsFatal, yearsNonfatal, xScale, yScale, yAxis, country, svgLine);
  }
  else {

    svgLine.select(".select")
           .remove();

    // create select
    svgLine.append("text")
      .attr("class", "select")
      .attr("font-size","20px")
      .attr("fill", "lightgrey")
      .attr("x", 655 - margin.left)
      .attr("y", 250)
      .style("text-anchor", "middle")
      .text("No data available");

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

    // update lines
    updateFunction(lineFatal, lineNonfatal, yearsFatal, yearsNonfatal, xScale, yScale, yAxis);
  }
}

function Buttons(data, dataFatal, dataNon_fatal, svgLine, margin, width, height, xScale, yScale, country, yAxis, button) {

  // empty lists first
  var lineFatal = [];
  var lineNonfatal = [];
  var yearsFatal = [];
  var yearsNonfatal = [];

  var year = 1970;

  // if no data available is active first remove
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
       .text(button);

  // parse data to lists
  parseCountry(dataFatal, dataNon_fatal, lineFatal, lineNonfatal, yearsFatal, yearsNonfatal, year);

  // update lines
  updateFunction(lineFatal, lineNonfatal, yearsFatal, yearsNonfatal, xScale, yScale, yAxis, country, svgLine);
}
