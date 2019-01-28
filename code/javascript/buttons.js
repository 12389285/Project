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
