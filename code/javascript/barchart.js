var barWidth = 20;

function Barchart(data, dataIncidents, svgBar, country, number, year) {

  /*
  This function takes as input the dataframes and svg and outputs the firt bar
  with tip.

  This function activates:
  - updateBar

  The functions returns:
  - barCounter
  */

  let margin = {top: 20, right: 20, bottom: 50, left: 20},
      width = 500 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom,

      g = svgBar.append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // set x scale
  var xScale = d3.scaleLinear()
      .domain([0,10])
      .range([margin.left, width]);

  // set y scale
  var yScale = d3.scaleLinear()
      .domain([0, 4000])
      .range([height, margin.top]);

  var xAxis = d3.axisBottom()
      .scale(xScale)
      .ticks(0)

  var yAxis = d3.axisLeft()
      .scale(yScale);

  // reset function
  function Reset() {

      positionX = 75;

      barCounter = 0;

      // remove all bars
      bars = svgBar.selectAll("rect")
                    .transition()
                    .duration(duration)
                    .attr("height", 0)
                    .attr("y", height)
                    .remove();

      xtext = svgBar.selectAll(".xText")
                    .remove();

      reset = svgBar.selectAll(".reset")
                    .remove();

      noData = svgBar.selectAll(".noData")
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
      });

  svgBar.call(tip);

  // only insert axis ones
  if (barCounter == 0) {

    // append group and insert axis
    var gX = svgBar.append("g")
      .attr("class", "x.axis")
      .attr("transform", "translate(20," + height + ")")
      .call(xAxis)

    // append group and insert axis
    var gY = svgBar.append("g")
      .attr("class", "y.axis")
      .attr("transform", "translate(40," + 0 + ")")
      .call(yAxis);

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

    if (number > 0) {

      // add the vertical bars
      svgBar.append("rect")
          .attr("class", "bar")
          .attr("x", function (d,i) {
              bars = (barCounter * 30) + 30;
              return bars;
          })
          .attr("width", barWidth)
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
            .text(country + "|" + year);
      }

      else {
        svgBar.append("g")
          .attr("transform", "translate(75,425)")
          .append("text")
            .attr("class", "noData")
            .attr("font-size","15px")
            .attr("fill", "lightgrey")
            .style("text-anchor", "begin")
            .attr("transform", "rotate(-90)")
            .text("No data available");

        // create xaxis text
        svgBar.append("g")
          .attr("transform", "translate(75,438)")
          .append("text")
            .attr("class", "xText")
            .attr("font-size","8px")
            .attr("fill", "black")
            .style("text-anchor", "end")
            .attr("transform", "rotate(-45)")
            .text(country + "|" + year);
      }
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
      .text("Please reset the barchart");
  }

  // reset barchart
  else if (barCounter > 12) {
    Reset();
  }
}

function updateBar(data, dataIncidents, svgBar, xScale, yScale, margin, width, height, country, number, year, yAxis) {

  /*
  This function activates when barCounter is between 2 and 11 takes as input
  the dataframes, barCounter, number and svg. This function outputs the rest of
  the bars with tip.

  The functions returns:
  - barCounter
  */

  // create tip
  var tip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(function(d) {
        return "<strong>Country:</strong> <span style='color:white'>"
              + country + "</span><br><strong>Attacks:</strong> \
              <span style='color:white'>"
              + number + "</span>";
      });

  svgBar.call(tip);

  if (number > 0) {

    // add the horizontal bars
    svgBar.append("rect")
        .attr("class", "bar")
        .attr("x", function (d,i) {
            bars = (barCounter * 40) + 20;
            return bars;
        })
        .attr("width", barWidth)
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
        .text(country + "|" + year);
  }

  else {
    svgBar.append("g")
      .attr("transform", "translate(0" + positionX + ",425)")
      .append("text")
        .attr("class", "noData")
        .attr("font-size","15px")
        .attr("fill", "lightgrey")
        .style("text-anchor", "begin")
        .attr("transform", "rotate(-90)")
        .text("No data available");

    // create xaxis text
    svgBar.append("g")
      .attr("transform", "translate(0" + positionX + ",438)")
      .append("text")
        .attr("class", "xText")
        .attr("font-size","8px")
        .attr("fill", "black")
        .style("text-anchor", "end")
        .attr("transform", "rotate(-45)")
        .text(country + "|" + year);
  }
}
