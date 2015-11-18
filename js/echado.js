// JavaScript Document
//document.addEventListener('deviceready', function () {
    
//})
setTimeout(function(){mostrar();},3000);
function mostrar(){
	document.getElementById("cartel").style.visibility="visible";
	document.getElementById("fondo_negro").style.visibility="visible";
}
function cerrarTodo(){
	document.getElementById("cartel").style.visibility="hidden";
	document.getElementById("fondo_negro").style.visibility="hidden";
}