function parseCountry(dataFatal, dataNon_fatal, lineFatal, lineNonfatal, yearsFatal, yearsNonfatal, year) {

 /*
This function takes as input the fatal dataframe and non fatal dataframe by country
and parse that data into lists. The functions returns the updated list
 */

  // parsing data fatalities
  dataFatal.forEach(function (d) {
    if (d['Country'] == button) {
      currentCountry = d["Country"];
      year = 1970;
      yearsFatal.push(year);
      lineFatal.push(d["Incidents|" + year]);
      for(i = 0; i < 47; i++) {
        year += 1;
        if (d["Incidents|" + year] != undefined || d["Incidents|" + year] != null) {
          yearsFatal.push(year);
          lineFatal.push(d["Incidents|" + year]);
        }
      }
    }
  });

  // parsing data injuries
  dataNon_fatal.forEach(function (d) {
    if (d['Country'] == button) {
      currentCountryN = d["Country"];
      year = 1970;
      yearsNonfatal.push(year);
      lineNonfatal.push(d["Incidents|" + year]);
      for(i = 0; i < 47; i++) {
        year += 1;
        if (d["Incidents|" + year] != undefined || d["Incidents|" + year] != null) {
          yearsNonfatal.push(year);
          lineNonfatal.push(d["Incidents|" + year]);
        }
      }
    }
  });
}

function parseCode(dataFatal, dataNon_fatal, lineFatal, lineNonfatal, yearsFatal, yearsNonfatal, year, code) {

  /*
 This function takes as input the fatal dataframe and non fatal dataframe by
 country code and parse that data into lists. The functions returns the updated list
  */

  // parsing data fatalities
  dataFatal.forEach(function (d) {
    if (d['Code|2017'] == code) {
      currentCountry = d["Country"];
      year = 1970;
      yearsFatal.push(year);
      lineFatal.push(d["Incidents|" + year]);
      for(i = 0; i < 47; i++) {
        year += 1;
        if (d["Incidents|" + year] != undefined || d["Incidents|" + year] != null) {
          yearsFatal.push(year);
          lineFatal.push(d["Incidents|" + year]);
        }
      }
    }
  });

  // parsing data injuries
  dataNon_fatal.forEach(function (d) {
    if (d['Code|2017'] == code) {
      currentCountryN = d["Country"];
      year = 1970;
      yearsNonfatal.push(year);
      lineNonfatal.push(d["Incidents|" + year]);
      for(i = 0; i < 47; i++) {
        year += 1;
        if (d["Incidents|" + year] != undefined || d["Incidents|" + year] != null) {
          yearsNonfatal.push(year);
          lineNonfatal.push(d["Incidents|" + year]);
        }
      }
    }
  });

}
