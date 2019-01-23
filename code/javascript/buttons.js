function dropdownLines(data, dataFatal, dataNon_fatal, svgLine, margin, width, height, xScale, yScale, country, yAxis, code) {


  lineFatal = [];
  lineNonfatal = [];
  yearsFatal = [];
  yearsNonfatal = [];

  year = 1970

  // parsing data fatalities
  dataFatal.forEach(function (d) {
    if (d['Code|2017'] == code) {
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
    if (d['Code|2017'] == code) {
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

    updateFunction(lineFatal, lineNonfatal, yearsFatal, yearsNonfatal, xScale, yScale, yAxis);
  }
}

function Buttons(data, dataFatal, dataNon_fatal, svgLine, margin, width, height, xScale, yScale, country, yAxis, button) {

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

  // making list for data
  var lineFatal = [];
  var lineNonfatal = [];

  var yearsFatal = [];
  var yearsNonfatal = [];

  // parsing data fatalities
  dataFatal.forEach(function (d) {
    if (d['Country'] == button) {
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
    if (d['Country'] == button) {
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

  updateFunction(lineFatal, lineNonfatal, yearsFatal, yearsNonfatal, xScale, yScale, yAxis, country, svgLine);
}
