// JavaScript Document

//$(document).ready(function() {
//	$.get("php/moduleGroups.php", function(data){
//	alert("Data: " + data);
//	});	
//});

var modules;
var array = [];

$(document).ready(function() {
"use strict";
$.getJSON("php/moduleGroups.php", function(data){

modules = data;
array = $.makeArray(data);
console.log(modules);

var avg = [];

for (var i =0; i<modules["groups"].length; i++){
avg[i] = (modules["groups"][i].minECTS + modules["groups"][i].maxECTS)/2 ;
console.log(avg[i]);
}

var width = 600,
    height = 440,
    radius = Math.min(width, height) / 2;

var color = d3.scale.category10();

var pie = d3.layout.pie()
    .sort(null);

var arc = d3.svg.arc()
    .innerRadius(radius - 100)
    .outerRadius(radius - 50);

var svg = d3.select("#chart").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var path = svg.selectAll("path")
   .data(pie(avg))
  .enter().append("path")
    .attr("fill", function(d, i) { return color(i); })
    .attr("d", arc)
    .attr("id",function(d, i){return "A"+(i+1);})
    .attr("onmouseover", "showContent(this.id)")
    .attr("onmouseout", "hideContent(this.id)")
    .attr("onclick","showContentInTable(this.id)");
        });


});

function hideContent(id){
    $('#smallTable').hide();
}



function showContent(id){

    //if ($('#tableinchart').is(':empty')){
    //var tablearea = document.getElementById('tableinchart');
    //var table = document.createElement('table');
    
   // if (table.rows.length<4){
 //   for (var i = 1; i<4;i++){
  //  var tr = document.createElement('tr');
   // tr.appendChild( document.createElement('td') );
   // table.appendChild(tr);
   // }
    //  tablearea.appendChild(table);
    // }
  
    var index = findIndexByKeyValue(modules["groups"],'id',id);
    var name = modules["groups"][index].name;
    var ects;
    if (modules["groups"][index].minECTS == modules["groups"][index].maxECTS) {
        ects = "[" + modules["groups"][index].minECTS + " ECTS-Punkte]"; 
    } else {
    var ects = "[" + modules["groups"][index].minECTS + "-" + modules["groups"][index].maxECTS + " ECTS-Punkte]";
    }
    
    $('#tr1').text(id);
    $('#tr2').text(name);
    $('#tr3').text(ects);
    $('#smallTable').show();

  //  table.rows[1].cells[0].appendChild(document.createTextNode(name));
 //   table.rows[2].cells[0].appendChild(document.createTextNode(ects));
    }
    //}


function findIndexByKeyValue(array, key, valuetosearch) {
 
for (var j = 0; j < array.length; j++) {
 
if (array[j][key] == valuetosearch) {
return j;
}}
}

function showContentInTable(moduleID){
  $('#loadingmessage').show();
  $.getJSON("php/moduleGroups.php",{module_details:moduleID},
    function(data) {
  
    console.log(data);

    $('#description').html("<p>"+data.details.description+"test"+"</p>");

    });
  $('#loadingmessage').hide();
}
//function createDonutChar(avg[]){