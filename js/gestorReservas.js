// JavaScript Document
function abrirReservas (){
	//document.getElementById("cartel").style.visibility="visible";
	document.getElementById("fondo_negro").style.visibility="visible";
	agregarActividadesDisponibles();
}
function cerrarTodo(){
	document.getElementById("cartel").style.visibility="hidden";
	document.getElementById("fondo_negro").style.visibility="hidden";
}

function agregarActividadesDisponibles(){
	var deporte6 = new Deporte("Squash", "dir.html");
	var deporte7 = new Deporte("Tenis", "dir.html");
	var deporte5 = new Deporte("Polo", "dir.html");
	var deporte3 = new Deporte("Golf", "dir.html");
	var deporte2 = new Deporte("Futbol", "dir.html");
	var deporte4 = new Deporte("Padel", "dir.html");
	var deporte1 = new Deporte("Eventos", "dir.html");

	deportes=new Array(deporte1,deporte2,deporte3,deporte4,deporte5,deporte6,deporte7);
	agregarActividadesDisponiblesVentana(deportes);
}
function agregarActividadesDisponiblesVentana(depo){
	//alert("Entre a agregar agenda");
	var texto=" ";
	for (var b in depo) {
	   texto +='<div class="deportes_item" onclick="mostrarDeporte(\'' +depo[b].nombre+ '\',\'' +depo[b].id+ '\')"><strong>'+depo[b].nombre+' </strong></div>';
   }
   
	
	document.getElementById("cartel").innerHTML='<div onclick="cerrarTodo();" id="x"><img src="img/x.jpg" width="35" height="35" /></div><div class="titulo">TIPO DE RESERVA</div><div class="content"><p>Haga click en el tipo de reserva que desea gestionar.</p></div><div class="content_export">'+texto+'</div><div class="botones"><div onclick="cerrarTodo();" class="boton_unico">CANCELAR</div></div>';	 
document.getElementById("cartel").style.visibility="visible";
}