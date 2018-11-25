# Proposal project january 2019

## Airplane crashes and fatalities since 1908

## Problem set  
Since the first aircraft was designed by the Wright brothers there has been a lot of accidents. There are a lot of different kind of accidents with one or more fatalities. The problem I would like to solve is a visualization of the number and information of airplane crashes over the period 1908 - 2009.  

_Which country has the most fatal aircraft accidents in the history?_

## Solution

I want to create a website where it is possible to see all kind of graphics with the use of line charts, bar charts and a world map of the aircraft accidents starting with the year 1908 up till 2009.

In this problem set I want to visualize:
1) A world map with the number of crashes per location in color (MVP)
2) A bar chart with the number per operator/airline (MVP)
3) A line chart with the the total of crashes over all the years (MVP)
4) Number of people aboard and number of fatalities (MVP)
5) Frequency of aircraft type (optional)
6) Military vs private vs passenger (optional)

## Prerequisites

* The data I am using I found it with Google Dataset search and it is a CSV file from Kaggle. The Columns contain the following headers:
  * __Date__
  * Time
  * __Location__
  * __Operator__
  * Flight#
  * Route
  * __Type__
  * Registration
  *	cn/In
  *	__Aboard__
  *	__Fatalities__
  *	Ground
  *	Summary

The bold headers are the headers I am using in my project.

* The libraries I think of using:
  * d3
  * matplotlib
  * SQlite

  I am not sure yet of all the libraries because I haven't seen all the libraries.

* The hardest parts of implementing are:
  * The dataset contains 5268 crashes so parsing the data will be a challenge
  * The location is separated in place and country. So implementing the world map only on country or/and place.
  * The world map

## Author
Max Simons
12389285
