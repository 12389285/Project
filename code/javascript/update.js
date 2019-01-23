function updateFunction(lineFatal, lineNonfatal, yearsFatal, yearsNonfatal, xScale, yScale, yAxis, country, svgLine) {

  var lineF = d3.line()
  .x(function(d, i) { return xScale(yearsFatal[i]) + 20; }) // set the x values for the line generator
  .y(function(d) {return yScale(d); }) // set the y values for the line generator

  var lineN = d3.line()
  .x(function(d, i) { return xScale(yearsNonfatal[i]) + 20; }) // set the x values for the line generator
  .y(function(d) {return yScale(d); }) // set the y values for the line generator

  if (d3.max(lineFatal) > d3.max(lineNonfatal)) {
    yScale.domain([0, d3.max(lineFatal)]);
  }
  else {
    yScale.domain([0, d3.max(lineNonfatal)]);
  }

  // gridlines in y axis function
  function gridLines() {
      return d3.axisLeft(yScale)
          .tickSize(-1160)
          .tickSizeOuter(0)
          .tickFormat("");
  };

  // update y axis
  var yaxis = d3.selectAll(".yaxis")
      .datum(lineFatal);

    yaxis.enter()
      .select("yaxis")
      .merge(yaxis)
      .transition() // change the y axis
      .duration(duration)
      .call(yAxis);

  // update grid
  var grid = d3.selectAll(".grid")
      .datum(lineFatal);

    grid.enter()
      .select(".grid")
      .merge(grid)
      .transition() // change the y axis
      .duration(duration)
      .call(gridLines());

  // update line fatel
  var updateFatal = d3.selectAll("#linechartFatal")
    .datum(lineFatal);

    updateFatal.enter()
      .select("path")
      .merge(updateFatal)
      .style("stroke", "#dc143c")
      .style("stroke-width", "2px")
      .transition()
        .duration(duration)
        .attr("d", lineF);

    updateFatal.exit().remove();

  // update line injuries
  var updateNon = d3.selectAll('#linechartNonfatal')
    .datum(lineNonfatal);

    updateNon.enter()
      .select("path")
      .merge(updateNon)
      .style("stroke", "#4073dc")
      .style("stroke-width", "2px")
      .transition()
        .duration(duration)
        .attr("d", lineN);

    updateNon.exit().remove();

  var dot = d3.select(".linechart").selectAll(".dot")
    .data(lineFatal);

    dot.enter().append("circle")
          .attr("class", "dot")
          .attr("cx", function(d, i) { return xScale(yearsFatal[i]) + 20 })
          .attr("cy", function(d) { return yScale(d) })
          .attr("r", 3);

    dot.exit().remove();

    dot.transition()
          .duration(duration)
          .attr("cx", function(d, i) { return xScale(yearsFatal[i]) + 20 })
          .attr("cy", function(d) { return yScale(d) });

  var dotN = d3.select(".linechart").selectAll(".dotN")
    .data(lineNonfatal);

    dotN.enter().append("circle")
          .attr("class", "dotN")
          .attr("cx", function(d, i) { return xScale(yearsNonfatal[i]) + 20 })
          .attr("cy", function(d) { return yScale(d) })
          .attr("r", 3);

    dotN.exit().remove();

    dotN.transition()
          .duration(duration)
          .attr("cx", function(d, i) { return xScale(yearsNonfatal[i]) + 20 })
          .attr("cy", function(d) { return yScale(d) });

  // update tip only when there is data
  if (lineFatal.length > 0) {
    tipLine(svgLine, lineFatal, lineNonfatal, xScale, yScale, yearsFatal, yearsNonfatal)
  }

}
