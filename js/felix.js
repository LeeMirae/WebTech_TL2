// JavaScript Document

function showContentInTable(moduleID){
  $('#loadingmessage').show();
  $.getJSON("php/moduleGroups.php",{module_details:moduleID},
    function(data, textStatus, jqXHR) {
    var kuerzel = data.kuerzel;
    var description = data.description;
    var semester = "";
    var minECTS = this.minECTS;
    var maxETCS = this.maxECTS;
    var modulname = this.name;
    var beschreibung = "";

    $('#description').html("<p>"+this.description+"</p>");

    });
  $('#loadingmessage').hide();
}


function getModuleContent(module){
$.getJSON(
  'php/moduleGroups.php',{module_details:module},
  function(data, textStatus, jqXHR) {
    var content = "";
    $.each(data, function(index, value){
      /*content += bla.id;*/
      $('#moduleContent').html(content);
    });
  });
}


/*FUNKTIONIERT!*/
function getAllContent(module){
$.getJSON('php/moduleGroups.php',{module_details:module},
  function(data, status) {
    var content = "<tr>";
    var add = "";
    if (module == null || module === 'undefined'){
    $.each(data.groups, function(index, value){
      content += <td>id: this.id</
    });
    $('#moduleContent').html(content);
  } else {
    console.log(data);
  }
    
  });
}

