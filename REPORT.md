# Final report

## Description

In the background page The user can find some background information and some instructions for the visualization.

With this visualization it is possible to see the amounts of terroristic attacks over the world in a period from 1970 up till 2017. In the world map it makes it easy to see the amount of attacks cause the use of changing colors which are connected to a certain amount. Use the slider to see the sequence of years. By clicking on a specific country the bar chart on the right will appear so the user can compare multiple countries.

Below the map the user can use the line chart to see the amount of deaths and injuries during this time period per country. If the user can't find the specific country please use the map, it will also show the amount of deaths and injuries.

<img width="1440" alt="schermafbeelding 2019-01-28 om 11 15 05" src="https://user-images.githubusercontent.com/43987983/51829551-14eabe00-22ee-11e9-8b42-708f56190b77.png">

## Design

### HTML templates

My code is separated in templates, javascript and static files. First I have made an index.html file to set the home page for the website. In this file there is no javascript connected to the file. For all styles you can open in the static folder styles.css. In the templates folder there are two files. One of them is the data page. In this page you can find/download all the data I have used. The other file is the main page of the website. Terrorism.html is written in html script and contains all the connected javascript file where i have written my code.

### Javascript files

#### visualization.js

visualization.js is the main file where the data is parsed from all the JSON files have used. The file also contains the settings for all svg's. I have chosen to first make the svg's and then fill the svg's with the designated visualization. All the data is send to the functions.

#### map.js

In the map.js file I first start the function Map. Here I am setting en making the map for the first year (1970). In this function also the slider and legend are written. When clicking on a country I activated another function. Because I am using a slider I have made an updateMap function to update the map with the on change data from the slider.

#### barchart.js

The Barchart function is activated when the user selects a country. In this function I have made the settings for the y axis, x axis and resetting the bar chart. Also the first bar and the tip is created in this function. When clicking another country the function updateBar is activated, this function places the other bars un till the svg is full.

#### linechart.js

The first function in this file is the Linechart. In  this function the axis and the first two lines are created. The data structure I have used in the world map and bar chart was not the best way for creating line charts, so I first created a function to parse the data and puts it in lists for using the date. When the user selects a country in the world map the updateLines is activated and the lines will update using the updateFunction. In the dropdownLines the lines will update with the dropdown button. In the Buttons function the lines will update when the user presses the buttons.

#### update.js

In this file the updateFunction is created. This functions updates the axis, grid and the lines in the line chart.

#### parsing.js

Because I have to parse the data in another structure for the linechart I have made a separated function to parse the data and put it in lists.

#### tip.js

In this file the tip function for the line chart is created.

## Process

### Day 1

08/01/2019

* Finished design document
* Wrote code for webpages including svg boxes for the world map, line chart, and bar chart
* Wrote some text information above the visualization svg's
* Decided to change the multiple line chart with parts of the world to optional because of time planning

### Day 2

09/01/2018

* Added a working world map function with data for the year 1970 using d3 v4 world map example
* Added a slider to slide threw all years, slider isn't working yet.

### Day 3

10/01/2019

* Decided to use an update function for with on change function instead of remove() for updating the world map, I have used the value of the slider as a variable in the world map
* Working color slider with update function
* Added a simple non interactive legend, not all colors does match with the legend.
* Barchart with all the years per country has changed to a barchart where the user can select multiple countries to add to the barchart. With a maximum of 10 countries, resetbuttom to remove barcharts. A barchart with all the years is not the main purpose of a bar chart because mostly this kind of data is visualized in a line chart.

<img width="818" alt="schermafbeelding 2019-01-10 om 14 56 51" src="https://user-images.githubusercontent.com/43987983/50972921-062b9b00-14e8-11e9-8bc7-c01dd609f5b1.png">

### Day 4

11/01/2019

* Made the axis for bar and line chart

### Day 5

14/01/2019

* Problems with making bar chart with different bars because of the transform to place the bars
* Fixed problems cause using a different way of code and implemented a function to push the bars
* Working bar chart where the user can choose and select the country and year to send information to bar chart
* Added a bar counter to count the bars and used a function to add the bar in the chart, this way I can set a maximum to 11 bars for the bar chart. 11 bars fits perfect in this svg

### Day 6

15/01/2019

* Fixing x axis name of country and years
* Trouble with rotating the x axis text
* Changed color of bar in theme of site
* Changed the amount of color function in map because the maximum is not 6000 but 3900 attacks
* Changed the text and place of reset button. I rather have the reset in svg but it is a lot of work because in a svg I can't use the bootstrap button. So I decided to place it above the svg
* Added a text to warn the user to reset the bars

<img width="1350" alt="schermafbeelding 2019-01-15 om 23 02 39" src="https://user-images.githubusercontent.com/43987983/51213158-90c22f00-191a-11e9-909a-9c897bd1aafd.png">
<img width="1356" alt="schermafbeelding 2019-01-15 om 23 10 08" src="https://user-images.githubusercontent.com/43987983/51213245-c8c97200-191a-11e9-9725-fcf2186b378c.png">

### Day 7

16/01/2019

* Fixed the x axis for bar chart. Added a g in the svg instead of adding text, because adding text is difficult rotating with the use of a transform translate function. I rotated the text in the g
* Added text to the page
* Tried to update the y axis for the bar chart, not working as well as I expected because the maximum of the bars constantly changes and the bars have also to change is that case. After a view attempts I decided to skip this part for the bar chart, maybe it might work in the line chart.
* Made the width of line chart bigger because of empty space where I was planning to place the line chart with attacks in part of the worlds.

### Day 8

17/01/2019

* Tip hide and show for lines
* line styles, I used blue for injuries and red for deaths
* Added a line for world fatalities as default in line chart
* Decide to add button for world data, to see the world data
* Decided to add buttons for Asia, Europe, middle east & North Africa, because I skipped over the part for a line chart for parts of the world I have implemented in this line chart.
* Made an update function for lines instead of remove function, using a function from the internet.
* Decided to add a country dropdown, because when the user selects a country in the world map. The user can't see what is happening in the line chart. Using a dropdown the user can also selects countries on the bottom of the page.
* Working update for country dropdownLines
* Working update for y axis in line chart

<img width="1344" alt="schermafbeelding 2019-01-18 om 00 02 26" src="https://user-images.githubusercontent.com/43987983/51354594-6a37fb80-1ab4-11e9-91bd-0cbf17f96a5a.png">

### Day 9

18/01/2019

* Fixed bugs in grid and grid updating
* Tip showing "No data available" incase of no data
* Deleted grid lines bar chart, because looks better without
* Added "No data available" in bar chart

### Day 10

21/01/2019

* Tried to apply tool tip for line chart, world data works but update doesn't work.
* Add legend to line chart

### Day 11

22/01/2019

* Fixed legend for line chart
* Added tool tip with update function to line chart
* Fixed bug in legend map
* Changed colors in map to gradient from yellow --> blue --> dark blue, to see more difference between countries
* Changed the scale for colors to see smaller amounts in the map
* Changed legend to gradient pattern
* Trying to add mouse on in legend to highlight the countries in the map
* Changed the height of y axis in line chart to add the title
* Add title, not yet in update function

<img width="828" alt="schermafbeelding 2019-01-22 om 16 10 51" src="https://user-images.githubusercontent.com/43987983/51544509-66172f80-1e60-11e9-8fb0-61d2ca2f6601.png">

<img width="1354" alt="schermafbeelding 2019-01-22 om 16 11 02" src="https://user-images.githubusercontent.com/43987983/51544528-73341e80-1e60-11e9-9836-c8a741ba8d63.png">

### Day 12

23/01/2019

* Fixed an interactive legend to see how many countries of the same color/amount of attacks
* Attempt to see if it is better to color the bar chart with the same color of the color on the map, no success.
* Organized my code, one file with 1300 code lines to 7 files with maximum of 200 lines
* changed the no data color en null color to a very light grey
* Changed the data color gradient. light blue --> dark blue

### Day 13

24/01/2019

Hackathon

### Day 14

25/01/2019

* Changed the removing bars with transition
* Made an extra function for parsing the data for the lines to avoid a lot of double lines.
* Cleaned my code with style guide and comments

<img width="1362" alt="schermafbeelding 2019-01-25 om 15 21 33" src="https://user-images.githubusercontent.com/43987983/51751431-2301ca00-20b5-11e9-97ed-cc292482b8ce.png">

<img width="1362" alt="schermafbeelding 2019-01-25 om 15 24 41" src="https://user-images.githubusercontent.com/43987983/51751534-5d6b6700-20b5-11e9-8a47-72af75c38ca9.png">

### Day 15

28/01/2019

* Added README, LICENSE, REPORT Files
* Moved dropdown en buttons function to line chart file

# Day 16

29/01/2019

* Added all function comments
* Made the script and made the product video
* made pages with github

## Important decisions

### Visualization

First change I have made was to change the bar chart filled with all the years of the selected country to a bar chart where the user can compare different countries/years. I have chosen visualization because the first idea was more data for a line chart. This way the user can compare. For the fatalities and injuries it is interesting for the user to see what the numbers are over a period of 48 years. In this case the perfect way to visualize this is a multiple line chart.

In the first week I have seen that is can take a lot of time so one line chart which I first had as primary visualization I have changed it to optional, when I get in time pressure I can skip this part.

### Colors

For the main theme I have decided to got with a background Azure and for the navigation bar and footer in light grey with white text because it is easy on the eyes and it is not a very color full subject.

For the world map: I really like the color blue and instead of the usual yellow --> red I have chosen for a gradient from light blue - purple - dark blue. For the countries where no data is available I have used a very light grey so it doesn't take the attention of the user.

The bars I have given the same color of the navigation bar and footer. I wanted to fill the bars with the same color it has on the map. But it was more a messy look, so I changed it back to light grey.

In the line chart is the fatal line red and the injuries line blue.

### Code

First I used a lot of remove without updating. I decided to make a function where it is updated with a transition for the lines and the axis.

I changed the color scale because the most data is way lower then I had in mind. No the world map is more colored.

I started in one javascript file and in the first two week it was very clear what all the functions are doing. After two weeks I had 1300 code lines and i totally lost control over all the functions. I have decided to split all function in separated files.

I decided to delete the buttons file and put the function in line chart file.

First the plan was to use only the world map to show the selected country in the line chart but for the user it is annoying to constantly scroll up and down to see the actual data. Therefore I have chosen to add a dropdown button with all the countries to the visualization. Also I had some data of a couple parts of the world so I added that information with buttons too.  

### Ideal world

In an ideal world I would have brought more attention to code writing, sometimes I send a lot of variables or data object to function and instead of this way I could have used an easier and more clearly way. I also would put the data page in a modul instead of a page.
