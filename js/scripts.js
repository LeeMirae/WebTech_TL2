// JavaScript Document

var modules;
var array = [];

$(window).load(function() {
  $("#loadingmessage").show();
})

$(document).ready(function() {
"use strict";
$.getJSON("php/moduleGroups.php", function(data){

modules = data;
array = $.makeArray(data);
console.log(modules);
var avg = [];

$('#loadingmessage').hide();

for (var i =0; i<modules["groups"].length; i++){
avg[i] = (modules["groups"][i].minECTS + modules["groups"][i].maxECTS)/2 ;
console.log(avg[i]);
}

//build a donut diagram

var width = $("#chart").width(),
    height = width,
    radius = Math.min(width, height) / 2;

var color = d3.scale.category10();

var pie = d3.layout.pie()
    .sort(null);

var arc = d3.svg.arc()
    .innerRadius(radius - 100)
    .outerRadius(radius - 50);

var svg = d3.select('#chart').append("svg")
        .attr("width", '100%')
        .attr("height", '100%')
        .attr('viewBox','0 0 '+Math.min(width,height) +' '+Math.min(width,height) )
        .attr('preserveAspectRatio','xMinYMin')
        .append("g")
        .attr("transform", "translate(" + Math.min(width,height) / 2 + "," + Math.min(width,height) / 2 + ")");
    
$('tr1').attr("width", '100%');

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


//Helper-function
function hideContent(id){
  $('#smallTable').hide();
}

//shows content inside the donut diagram
function showContent(id){
  
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
}

//Helper-function
function findIndexByKeyValue(array, key, valuetosearch) {
  for (var j = 0; j < array.length; j++) {
    if (array[j][key] == valuetosearch) {
    return j;
    }
  }
}




  
 //shows content in the table on the right side 
function showContentInTable(moduleID){
    $('#loadingmessage').show();

// fetch data and write to variables
  $.getJSON("php/moduleGroups.php",{module_details:moduleID},
    function(data) {
      var description = data.details.description;
      var nameAndID = '<strong>'+ moduleID +'</strong>' + " "+ data.details.name;
    if (data.details.maxECTS != data.details.minECTS){
      var h3 = "["+data.details.minECTS+" - "+data.details.maxECTS+" ECTS-Punkte]";
} else {
  var h3 = "["+data.details.minECTS+" ECTS-Punkte]";
}


// create headTable
  //remove rows from modulesTable
   $('#modulesTable tr').remove();
   
  var headTable = document.getElementById("modulesTable");
  
  var headRow1 = headTable.insertRow(0); // id, ects
  var headRow2 = headTable.insertRow(1); // description
  var headRow3 = headTable.insertRow(2); // grey line

  // id
  var headCell1 = headRow1.insertCell(0);
  var h = document.createElement("H2");
  h.id = "moduleID";
  headCell1.appendChild(h);
  headCell1.colSpan = 2;

  // ects
  var headCell2 = headRow1.insertCell(1);
  h = document.createElement("H3");
  headCell2.appendChild(h);
  headCell2.colSpan = 2;

  // description
  var headCell2 = headRow2.insertCell(0);
  h = document.createElement("P");
  h.id = "description";
  headCell2.appendChild(h);
  headCell2.colSpan = 4;

  // grey line
  var headCell3 = headRow3.insertCell(0);
  headCell3.colSpan = 4;
  h = document.createElement("HR");
  headCell3.id = "greyLine";
  
 //remove rows from mandatory and nonMandatory tables 
    $('#mandatory tr').remove();
    $('#nonMandatory tr').remove();
  
// write data to table
  $('#description').html(description);
  $('#moduleID').html(nameAndID);
  $('h3').html(h3);

// prepare mandatory courses data for table
  var mandatoryCourseArray = [];
  $.each(data.details.courses, 
    function(mandatory){
      if (this.mandatory){
        mandatoryCourseArray.push(this);
      }
    }
  );
  
  buildATable("mandatory", mandatoryCourseArray, "Pflichtmodule");
  
//prepare non-mandatory courses data for table
  var nonMandatoryCourseArray = [];
    $.each(data.details.courses, 
      function(mandatory){
        if (!this.mandatory){
          nonMandatoryCourseArray.push(this);
          console.log(mandatoryCourseArray.length);
        }
      }
    );
        
  buildATable("nonMandatory", nonMandatoryCourseArray, "Wahlmodule");

// delete grey line, if no courses exist
  if (nonMandatoryCourseArray.length == 0 & mandatoryCourseArray.length == 0){
    document.getElementById('greyLine').style.visibility = "hidden";
  }
// create greyLine in the end so it's not visible while data is being fetched
  headCell3.appendChild(h);
  $('#loadingmessage').hide();
  });
}


//Helper-function, builds a table on the right side
function buildATable(id, array, h4){
  
  if (array.length != 0){
      var table = document.getElementById(id.toString());
      var row = table.insertRow(0);
      var cell1 = row.insertCell(0);
      cell1.innerHTML = "<h4>" + h4 + "</h4>";
        
      row = table.insertRow(1);
      cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);

      cell1.innerHTML = "<strong>Kürzel</strong>";
      cell2.innerHTML = "<strong>Bezeichnung</strong>";
      cell3.innerHTML = "<strong>Semester</strong>";
      cell4.innerHTML = "<strong>ECTS</strong>";
         
     
      for (var i = 0; i<array.length;i++){
      
        row = table.insertRow(2+i);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        
        cell1.innerHTML = array[i].short_name;
        cell2.innerHTML = array[i].full_name;
        cell3.innerHTML = array[i].semester;
        cell4.innerHTML = array[i].ects;
      }
    } 
  
  
}


