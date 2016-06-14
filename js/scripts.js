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

var width = $("#chart").width(),
    height = width,
    radius = Math.min(width, height) / 2;


var color = d3.scale.category10();

var pie = d3.layout.pie()
    .sort(null);


var arc = d3.svg.arc()
    .innerRadius(radius - 100)
    .outerRadius(radius - 50);





/*
var $container = $('#chart'),
        τ = 2 * Math.PI,
        width = $container.width(),
        height = $container.height(),
        outerRadius = Math.min(width,height)/2,
        innerRadius = (outerRadius/5)*4,
        fontSize = (Math.min(width,height)/4);

var arc = d3.svg.arc()
  .innerRadius(innerRadius)
  .outerRadius(outerRadius);
*/
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

function findIndexByKeyValue(array, key, valuetosearch) {
 
for (var j = 0; j < array.length; j++) {
 
if (array[j][key] == valuetosearch) {
return j;
        }
    }
}


var trigger = true
  // trigger: onclick
function showContentInTable(moduleID){
if (trigger){
  trigger = false;

    $('#loadingmessage').show();
    
  // create headTable
  var headTable = document.getElementById("modulesTable");
  while (headTable.rows.length > 0){
    headTable.deleteRow(0);
  }
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
  
  

  // create mandatory & nonMandatory table
  var mandatoryTable = document.getElementById('mandatory');
  while (mandatoryTable.rows.length > 0){
        mandatoryTable.deleteRow(0);
      }
  var nonMandatoryTable = document.getElementById('nonMandatory');
  while (nonMandatoryTable.rows.length > 0){
        nonMandatoryTable.deleteRow(0);
      }
  
  // fetch data
  $.getJSON("php/moduleGroups.php",{module_details:moduleID},
    function(data) {
    $('#description').html(data.details.description);
    $('#moduleID').html('<strong>'+ moduleID +'</strong>' + " "+ data.details.name);
    if (data.details.maxECTS != data.details.minECTS){
    $('h3').html("["+data.details.minECTS+" - "+data.details.maxECTS+" ECTS-Punkte]");
} else {
    $('h3').html("["+data.details.minECTS+" ECTS-Punkte]");
}

// mandatoryCourses bauen

   var mandatoryCourseArray = [];
   $.each(data.details.courses, 
    function(mandatory){
      if (this.mandatory){
        mandatoryCourseArray.push(this);
      }
    }
    );

    if (mandatoryCourseArray.length != 0){
      var table = document.getElementById("mandatory");
      var row = table.insertRow(0);
      var cell1 = row.insertCell(0);
      cell1.innerHTML = "<h4>Pflichtmodule</h4>";
        
      row = table.insertRow(1);
      cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);

      cell1.innerHTML = "<strong>Kürzel</strong>";
      cell2.innerHTML = "<strong>Bezeichnung</strong>";
      cell3.innerHTML = "<strong>Semester</strong>";
      cell4.innerHTML = "<strong>ECTS</strong>";
         
     
      for (var i = 0; i<mandatoryCourseArray.length;i++){
      
        row = table.insertRow(2+i);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        
        cell1.innerHTML = mandatoryCourseArray[i].short_name;
        cell2.innerHTML = mandatoryCourseArray[i].full_name;
        cell3.innerHTML = mandatoryCourseArray[i].semester;
        cell4.innerHTML = mandatoryCourseArray[i].ects;
      }
    } 
         
// nonMandatory Courses bauen
    var nonMandatoryCourseArray = [];
    $.each(data.details.courses, 
        function(mandatory){
            if (!this.mandatory){
                nonMandatoryCourseArray.push(this);
     console.log(mandatoryCourseArray.length);
    }
    });
    
    if (nonMandatoryCourseArray.length != 0){
     var tableOpt = document.getElementById("nonMandatory");
       var rowOpt = tableOpt.insertRow(0);
         var  cellOpt1 = rowOpt.insertCell(0);
       cellOpt1.innerHTML = "<h4>Wahlmodule</h4>";
        
       var rowOpt = tableOpt.insertRow(1);
       cellOpt1 = rowOpt.insertCell(0);
       var cellOpt2 = rowOpt.insertCell(1);
       var cellOpt3 = rowOpt.insertCell(2);
       var cellOpt4 = rowOpt.insertCell(3);

       cellOpt1.innerHTML = "<strong>Kürzel</strong>";
        cellOpt2.innerHTML = "<strong>Bezeichnung</strong>";
        cellOpt3.innerHTML = "<strong>Semester</strong>";
       cellOpt4.innerHTML = "<strong>ECTS</strong>";

  
     
       for (var j =0; j<nonMandatoryCourseArray.length;j++){
         
            rowOpt = tableOpt.insertRow(2+j);
            cellOpt1 = rowOpt.insertCell(0);
            cellOpt2 = rowOpt.insertCell(1);
            cellOpt3 = rowOpt.insertCell(2);
            cellOpt4 = rowOpt.insertCell(3);

        cellOpt1.innerHTML = nonMandatoryCourseArray[j].short_name;
        cellOpt2.innerHTML = nonMandatoryCourseArray[j].full_name;
        cellOpt3.innerHTML = nonMandatoryCourseArray[j].semester;
        cellOpt4.innerHTML = nonMandatoryCourseArray[j].ects;
        }
      
    }
    // delete grey line, if no courses exist
    if (nonMandatoryCourseArray.length == 0 & mandatoryCourseArray.length == 0){
     document.getElementById('greyLine').style.visibility = "hidden";
    }

    
    // document.getElementById('mandatory').style.display ='block'; 
    headCell3.appendChild(h);
    $('#loadingmessage').hide();
    // create greyLine in the end so it's not visible while data is being fetched
    
    });
}
trigger = true;
}


