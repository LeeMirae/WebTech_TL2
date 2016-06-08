// JavaScript Document



function getModules(module){
	
	$.get("php/moduleGroups.php",
	 {module_details:module},
	 function(data,status){
	 	console.log(data);
	 });
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

