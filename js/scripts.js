// JavaScript Document

$(document).ready(function() {
	$.get("php/moduleGroups.php", function(data){
	alert("Data: " + data);
	});	
});