// JavaScript Document

//$(document).ready(function() {
//	$.get("php/moduleGroups.php", function(data){
//	alert("Data: " + data);
//	});	
//});

$(document).ready(function() {
$.getJSON("php/moduleGroups.php", function(data){


var modules = data;
var array = $.makeArray(data);
console.log(modules);

var avg = [];

for (i =0; i<modules["groups"].length; i++){
avg[i] = (modules["groups"][i].minECTS + modules["groups"][i].maxECTS)/2 ;
console.log(avg[i]);
}

var width = 460,
    height = 300,
    radius = Math.min(width, height) / 2;

var color = d3.scale.category20();

var pie = d3.layout.pie()
    .sort(null);

var arc = d3.svg.arc()
    .innerRadius(radius - 100)
    .outerRadius(radius - 50);

var svg = d3.select("#donut_chart").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var path = svg.selectAll("path")
   .data(pie(avg))
  .enter().append("path")
    .attr("fill", function(d, i) { return color(i); })
    .attr("d", arc);


});
});


//function createDonutChar(avg[]){