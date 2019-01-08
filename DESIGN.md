# Design document

## Data

### Data source

The data I'm using for this project are three CSV files. The files I downloaded from the following website:

```
https://ourworldindata.org/terrorism
```

The files:
* Number of terrorist incidents, terrorist_incidents.csv
* Fatalities from terrorist attacks, fatal_terrorism.csv
* injuries from terrorist attacks, non_fatal_terrorism.csv

### JSON converter

To use the data for my project I want to use JSON files. To get the JSON files I have made a data frame of the CSV file. The problem of the CSV file I have downloaded is that the countries are not sorted by country but sorted by year. This way it makes it quite difficult to use the data.

So when I first converted a file to JSON this was the result:
```
[{
	"index": 0,
	"Entity": "Afghanistan",
	"Code": "AFG",
	"Year": 1973,
	"Number of terrorist incidents (GDT, 2018) (incidents)": 1
}, {
	"index": 1,
	"Entity": "Afghanistan",
	"Code": "AFG",
	"Year": 1979,
	"Number of terrorist incidents (GDT, 2018) (incidents)": 3
}
```
This way the disadvantage is that the countries are lined up beneath each other and when I'm parsing the data in JavaScript I have to complicate my code to get the numbers. Instead of using this way of parsing the data I have made a new converter where one country with all the years and numbers beneath each other.

```
[{
	"Country": "Afghanistan",
	"Incidents|1970": null,
	"Incidents|1971": null,
	"Incidents|1972": null,
	"Incidents|1973": 1,
	"Incidents|1974": null,
	"Incidents|1975": null,
	"Incidents|1976": null,
	"Incidents|1977": null,
	"Incidents|1978": null,
	"Incidents|1979": 3,
	"Incidents|1980": null,
	"Incidents|1981": null,
	"Incidents|1982": null,
	"Incidents|1983": null,
	"Incidents|1984": null,
	"Incidents|1985": null,
	"Incidents|1986": null,
	"Incidents|1987": 1,
	"Incidents|1988": 11,
	"Incidents|1989": 10,
	"Incidents|1990": 2,
	"Incidents|1991": 30,
	"Incidents|1992": 36,
	"Incidents|1994": 9,
	"Incidents|1995": 6,
	"Incidents|1996": 4,
	"Incidents|1997": 1,
	"Incidents|1998": 1,
	"Incidents|1999": 9,
	"Incidents|2000": 14,
	"Incidents|2001": 14,
	"Incidents|2002": 38,
	"Incidents|2003": 100,
	"Incidents|2004": 88,
	"Incidents|2005": 155,
	"Incidents|2006": 282,
	"Incidents|2007": 341,
	"Incidents|2008": 414,
	"Incidents|2009": 503,
	"Incidents|2010": 542,
	"Incidents|2011": 421,
	"Incidents|2012": 1469,
	"Incidents|2013": 1443,
	"Incidents|2014": 1824,
	"Incidents|2015": 1928,
	"Incidents|2016": 1617,
	"Incidents|2017": 1414,
	"Code|2017": "AFG"
}
```
This way I have a better overview of the data. The converter is located in data/converterCSV2JSON.py

## Pages

* Home: In this page the user can find information and background about the subject.
* Terrorism: This page contains the visualization of the project.
* Data: The user can visit the main source and download the CSV files I have used.

## Overview technical components

<img width="559" alt="schermafbeelding 2019-01-08 om 11 08 35" src="https://user-images.githubusercontent.com/43987983/50824041-c91fa700-1335-11e9-92f5-c347d2184b43.png">

### World map

In the world map I want to visualize the world with colors based on the amount of incidents per year. With the slider the user can switch between years to see the changes per country. With a d3 tip the user can see the data of the country.

### Bar chart

The vertical bar chart is linked to the world map. When the user opens the website the bar chart is not yet visible. When the user clicks on a country the bar chart appears with the data of all the years of that specific country.

### Multiple line chart

The multiple line chart will show the amount of the fatal and the non fatal incidents that took place that year. The multiple line chart is also linked to the world map.

### Multiple line chart (optional)

In this multiple line chart the user can see the data of different places/continents in the world. Also a line of the world data will show in this chart.

## D3 plugins

* d3-Geo projection
* d3-colorbar
* d3-rect
* d3-legend
* d3-tip
