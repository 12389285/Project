// Draw line fatalities
// var tip = d3.tip()
//           .attr('class', 'd3-tip')
//           .offset([-10, 0])
//           .html(function(d,i) {
//             return "<strong>Country:</strong> <span style='color:white'>"
//                   + currentCountry + "</span><br><strong>Fatalities:</strong> \
//                   <span style='color:white'>"
//                   + d + "</span><br><strong>Year:</strong> \
//                   <span style='color:white'>"
//                   + yearsFatal[i] + "</span>";
// })
//
// svgLine.call(tip);


// // line fatal
// svgLine.append("path")
//   .datum(lineFatal) // 10. Binds data to the line
//   .attr("id", "linechartFatal") // Assign a class for styling
//   .style("stroke", "#dc143c")
//   .style("stroke-width", "2px")
//   .attr("d", lineF)

// svgLine.selectAll(".dot" + country)
//   .data(lineFatal)
//   .enter().append("circle") // Uses the enter().append() method
//       .attr("class", "dot") // Assign a class for styling
//       .attr("cx", function(d, i) { return xScale(yearsFatal[i]) + 20 })
//       .attr("cy", function(d) { return yScale(d) })
//       .attr("r", 3)// 11. Calls the line generator
// .on('mouseover', function (d, i) {
//   tip.show(d,i)
//   d3.select(this)
//   .style("stroke", "white")
//   .attr("r", 6)
// })
// .on('mouseout', function (d) {
//   tip.hide(d)
//   d3.select(this)
//   .style("stroke", "white")
//   .attr("r", 3)
// })

// draw line injuries
// var tip = d3.tip()
//           .attr('class', 'd3-tip')
//           .offset([-10, 0])
//           .html(function(d,i) {
//             return "<strong>Country:</strong> <span style='color:white'>"
//                   + currentCountry + "</span><br><strong>Injuries:</strong> \
//                   <span style='color:white'>"
//                   + d + "</span><br><strong>Year:</strong> \
//                   <span style='color:white'>"
//                   + yearsFatal[i] + "</span>";
// })
//
// svgLine.call(tip);



// line non fatal
// svgLine.append("path")
//   .datum(lineNonfatal) // 10. Binds data to the line
//   .attr("id", "linechartNonfatal") // Assign a class for styling
//   .style("stroke", "#4073dc")
//   .style("stroke-width", "2px")
//   .attr("d", lineN);

// svgLine.selectAll(".dot" + country)
//   .data(lineNonfatal)
//   .enter().append("circle") // Uses the enter().append() method
//       .attr("class", "dotN") // Assign a class for styling
//       .attr("cx", function(d, i) { return xScale(yearsNonfatal[i]) + 20 })
//       .attr("cy", function(d) { return yScale(d) })
//       .attr("r", 3)// 11. Calls the line generator
//   .on('mouseover', function (d, i) {
//     tip.show(d,i)
//     d3.select(this)
//     .style("stroke", "white")
//     .attr("r", 6)
//   })
//   .on('mouseout', function (d) {
//     tip.hide(d)
//     d3.select(this)
//     .style("stroke", "white")
//     .attr("r", 3)
//   })

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
// var dotN = d3.selectAll(".dotN")
//   .datum(lineNonfatal);
//
//   dotN.enter()
//         .selectAll(".dotN")
//         .attr("cx", function(d, i) { return xScale(yearsNonfatal[i]) + 20 })
//         .attr("cy", function(d) { return yScale(d) })
//         .attr("r", 3)
//         .transition()
//           .duration(10000)
//           .attr("d", lineN)
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
