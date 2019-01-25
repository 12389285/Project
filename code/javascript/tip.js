function tipLine(svgLine, lineFatal, lineNonfatal, xScale, yScale, yearsFatal, yearsNonfatal) {

  // tip for fatalities
  var tip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(d,i) {
              return "<strong>Fatalities: </strong><span style='color:white'>"
                    + d + "</span><br><strong>Year:</strong> \
                    <span style='color:white'>"
                    + yearsFatal[i] + "</span>";
              });

  svgLine.call(tip);

  // appends tip to new dots
  d3.select(".linechart").selectAll(".dot")
    .data(lineFatal)
    .enter().append("circle")
        .attr("class", "dot")
        .attr("cx", function(d, i) { return xScale(yearsFatal[i]) + 20 })
        .attr("cy", function(d) { return yScale(d) })
        .attr("r", 3);

  // update tip for line fatal
  d3.select(".linechart").selectAll(".dot")
    .data(lineFatal)
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
    });

  // tip for injuries
  var tipN = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(d,i) {
              return "<strong>Injuries: </strong><span style='color:white'>"
                    + d + "</span><br><strong>Year:</strong> \
                    <span style='color:white'>"
                    + yearsFatal[i] + "</span>";
              });

  svgLine.call(tipN);

  // appends tip to new dots
  d3.select(".linechart").selectAll(".dotN")
    .data(lineNonfatal)
    .enter().append("circle")
        .attr("class", "dotN")
        .attr("cx", function(d, i) { return xScale(yearsNonfatal[i]) + 20 })
        .attr("cy", function(d) { return yScale(d) })
        .attr("r", 3);

  // Update tip for line non fatal
  d3.select(".linechart").selectAll(".dotN")
    .data(lineNonfatal)
    .on('mouseover', function (d, i) {
      tipN.show(d,i)
      d3.select(this)
      .style("stroke", "white")
      .attr("r", 6)
    })
    .on('mouseout', function (d) {
      tipN.hide(d)
      d3.select(this)
      .style("stroke", "white")
      .attr("r", 3)
    });
}
