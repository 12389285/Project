domainMap = [0,1,5,10,50,100,250,500,1000,2500,3500]

function Map(data, dataIncidents, svgMap, svgBar, svgLine, dataFatal, dataNon_fatal) {

  width = 800
  height = 450

  // Set tooltips
  var tip = d3.tip()
            .attr('class', 'd3-tip')
            .html(function(d) {
              var number = d['Incidents|1970'];
              if (number > 0){
                number = number;
              }
              else if (number == null) {
                number = "No data";
              }
              return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>"
                      + "<strong>Number of attacks: </strong><span class='details'>" + number +"</span>";
              });

  // colorscale for countries
  var color = d3.scaleThreshold()
      .domain(domainMap)
      .range(['#ffffe0','#add8e6','#a5bcea','#99a1ec','#8c88ec','#7b6ee9','#6755e2','#513cd8','#3725c8','#1a0db0','#00008b']);

  var path = d3.geoPath();

  var projection = d3.geoMercator()
              .scale(120)
              .translate( [width / 2, height / 1.5]);

  var path = d3.geoPath()
              .projection(projection);

  svgMap.call(tip);

  var numberbyCode = {};

  // adding data to dictionary for map format
  dataIncidents.forEach(function(d) { numberbyCode[d['Code|2017']] = d['Incidents|1970']; });
  data.features.forEach(function(d) { d['Incidents|1970'] = numberbyCode[d.id] });

  // worldmap settings
  svgMap.append("g")
          .attr("class", "countries")
        .selectAll("path")
          .data(data.features)
        .enter().append("path")
          .attr("id", function(d) {
            if (numberbyCode[d.id] == undefined) {
              return 'color' + "#ededed"
            }
              return 'color' + color(numberbyCode[d.id])
          })
          .attr("d", path)
          .style("fill", function(d) {
            if (numberbyCode[d.id] == undefined) {
              return "#ededed"
            }
              return color(numberbyCode[d.id]); })
          .style('stroke', 'white')
          .style('stroke-width', 1.5)
          .style("opacity",0.8)
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

  // clicking on country update barchart and linechart with year 1970
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
    return new Date(1970 + d, 01, 01);
  });

  var sliderTime = d3
    .sliderBottom()
    .min(d3.min(dataTime))
    .max(d3.max(dataTime))
    .step(1000 * 60 * 60 * 24 * 365)
    .width(750)
    .tickFormat(d3.timeFormat('%Y'))

      // slider data to updateMap
      .on('onchange', val => {
        updateMap(data, dataIncidents, svgMap, val, color, svgBar, svgLine, dataFatal, dataNon_fatal);
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

  // add year in left top corner
  d3.select('.mapsvg')
      .append("text")
        .style("font-size", "25px")
        .attr("id", "mapyear")
        .attr('transform', 'translate(30,40)')
        .text(d3.timeFormat('%Y')(sliderTime.value()));

  // setting legend
  var linear = d3.scaleOrdinal()
      .domain(["No data","0","1-5","10-50","50-100","100-250","250-500","500-1000","1000-2500","2500-3500",">3500"])
      .range(["#ededed", '#add8e6','#a5bcea','#99a1ec','#8c88ec','#7b6ee9','#6755e2','#513cd8','#3725c8','#1a0db0','#00008b']);

  d3.select('.mapsvg')
      .append("g")
        .attr("class", "legendLinear")
        .attr("transform", "translate(10,300)");

  var legendLinear = d3.legendColor()
      .shapeWidth(30)
      .shapePadding(-2)
      .shapeHeight(17)
      .cells(domainMap)
      .orient('vertical')
      .on('cellover',function(d){

        // split string to get value for colorscale
        var num = d.split("-");

        num = num[0];

        if (num == ">3500") {
          num = num.split(">");
          num = num[1];
        }

        id = color(num);

        if (num == "No data") {
          id = "#ededed";
        }

        // get color id from map with colorfunction
        svgMap.selectAll('[id="color' + id + '"]')
          .style("opacity", 1)
          .style("stroke","#800000")
          .style("stroke-width",2);

        d3.select(this)
          .style("opacity", 1)
          .style("stroke","black")
          .style("stroke-width",1);
      })
      .on('cellout',function(d){

        svgMap.selectAll("path")
          .style("opacity", 0.8)
          .style("stroke","grey")
          .style("stroke-width",0.2);

        d3.select(this)
          .style("stroke-width",0);
      })
      .scale(linear);

  svgMap = d3.select('.mapsvg');

  svgMap.select(".legendLinear")
    .call(legendLinear);
}

function updateMap(data, dataIncidents, svgMap, year, color, svgBar, svgLine, dataFatal, dataNon_fatal) {

  // get year from slider
  var year = year.getFullYear();
  year = year.toString();

  var numberbyCode = {};

  // adding variable year to string
  dataIncidents.forEach(function(d) { numberbyCode[d['Code|2017']] = d['Incidents|' + year]; });
  data.features.forEach(function(d) { d['Incidents|' + year] = numberbyCode[d.id]});

  // Set tooltips
  var tip = d3.tip()
            .attr('class', 'd3-tip')
            .html(function(d) {

              var number = d["Incidents|" + year];

              if (number > 0){
                number = number;
              }
              else if (number == null) {
                number = "No data";
              }
              return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>"
                      + "<strong>Number of attacks: </strong><span class='details'>" + number +"</span>";
            })

  svgMap.call(tip);

  // change path colors
  svgMap.selectAll("path")
      .attr("id", function(d) {
        if (numberbyCode[d.id] == undefined) {
          return 'color' + "#ededed"
        }
        return 'color' + color(numberbyCode[d.id])})
      .style("fill", function(d) {
        if (numberbyCode[d.id] == undefined) {
          return "#ededed"
        }
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

    // update legend to update funtion
    d3.select(".legendLinear")
      .remove();

    var linear = d3.scaleOrdinal()
      .domain(["No data","0","1-5","10-50","50-100","100-250","250-500","500-1000","1000-2500","2500-3500",">3500"])
      .range(["#ededed", '#add8e6','#a5bcea','#99a1ec','#8c88ec','#7b6ee9','#6755e2','#513cd8','#3725c8','#1a0db0','#00008b']);

    d3.select('.mapsvg')
      .append("g")
      .attr("class", "legendLinear")
      .attr("transform", "translate(10,300)");

    var legendLinear = d3.legendColor()
      .shapeWidth(30)
      .shapePadding(-2)
      .shapeHeight(17)
      .cells(domainMap)
      .orient('vertical')
      .on('cellover',function(d){

        // split string to get value for colorscale
        var num = d.split("-");

        num = num[0];

        if (num == ">3500") {
          num = num.split(">");
          num = num[1];
        }

        id = color(num);

        if (num == "No data") {
          id = "#ededed";
        }

        // get color id from map with colorfunction
        svgMap.selectAll('[id="color' + id + '"]')
          .style("opacity", 1)
          .style("stroke","#800000")
          .style("stroke-width",2);

        d3.select(this)
          .style("opacity", 1)
          .style("stroke","black")
          .style("stroke-width",1);
      })
      .on('cellout',function(d){

        svgMap.selectAll("path")
          .style("opacity", 0.8)
          .style("stroke","grey")
          .style("stroke-width",0.2);

        d3.select(this)
          .style("stroke-width",0);
      })
      .scale(linear);

    svgMap = d3.select('.mapsvg');

    svgMap.select(".legendLinear")
      .call(legendLinear);
}
