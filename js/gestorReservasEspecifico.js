// JavaScript Document
window.arregloDeReservas=new Array();
function mostrarDeporte(nombreDeporte,deporteId){
	//alert("Entre a agregar agenda");
	Canchas=new Array("N 1","N 2","N 3","N 4","N 5","N 6");
	var texto=" ";
	texto +='<tr><td width="70px" height="70px" align="center">Canchas</td>';
	for (var b in Canchas) {
	   texto +='<td width="70px" height="70px" align="center">'+Canchas[b]+'</td>';
   }
	texto +='</tr>'
	for(var i=8; i<22; i++){
	texto +='<tr><td width="70px" height="70px" align="center">'+i+':00</td>';	
		for (var b in Canchas) {
	   		texto +='<td width="70px" height="70px" align="center"><div onclick="reservarHorario(this,\'' +nombreDeporte+ '\',\'' +i+ '\',\'' +Canchas[b]+ '\' );" class="hora_reserva">'+i+':00</div></td>';
   							}
	texto +='</tr>'
   }
   /*
   <!-- Repetir Todos Los horarios que sean -->
        <tr>
		<td width='70px' height="70px" align="center">hora</td>
        <!-- Repetir las canchas que sean -->
        <td width='70px' height="70px" onclick="marcarHorario(this,cancha,hora)" align="center">horario</td>
        <!-- Repetir las canchas que sean -->
        </tr>
        <!-- Repetir Todos Los horarios que sean -->*/
   
	
	document.getElementById("cartel").innerHTML='<div class="titulo"><p>'+nombreDeporte+'</p></div><div class="content"><p>Haga click en los horarios que desea reservar.</p></div><div class="content_export" style="overflow-x: auto;"><table border="0" cellpadding="5px" align="center">'+texto+'</table></div><div class="botones"><div class="botonera"><div onclick="cerrarTodo();" class="boton"><p>CANCELAR</p></div><div onclick="gestionarReserva()" class="boton der"><p>RESERVAR</p></div></div></div>';	 
document.getElementById("cartel").style.visibility="visible";
}
function reservarHorario(elemento, deporte, hora, cancha){
	
	if(elemento.className=='hora_reserva'){
		elemento.className='hora_reservada';
		//alert("Reservar"+deporte+hora+cancha);
		agregarReserva(deporte, hora, cancha);
	}else{
		elemento.className='hora_reserva';
		//alert("Saco"+deporte+hora+cancha);
		quitarReserva(deporte, hora, cancha);
	}
}
function agregarReserva(deporte, hora, cancha){
	var horario= new HoraDeporte(deporte, hora, cancha);
	window.arregloDeReservas.push(horario);
}
function quitarReserva(deporte, hora, cancha){
	var horario= new HoraDeporte(deporte, hora, cancha);
	var index = window.arregloDeReservas.indexOf(horario);
	if (index > -1) {
    window.arregloDeReservas.splice(index, 1);// 1 por que remueve un elemento
	}
	//window.arregloDeReservas.push(horario);
}
function gestionarReserva(){
	element="";
	for (var b in window.arregloDeReservas ) {
	   element +=parseReservas(window.arregloDeReservas[b].deporte, window.arregloDeReservas[b].hora, window.arregloDeReservas[b].cancha)
   }
   $(".historial").append(element);
   while(window.arregloDeReservas.length > 0) {
    window.arregloDeReservas.pop();
	}
	cerrarTodo();
}
function parseReservas(deporte, hora, cancha){
    return '<div class="historial_item"><div class="texto"><div class="fecha">'+hora+':00</div><div onclick="borrarContacto('+deporte+',this)" class="borrar">Cancelar</div><div class="contacto"><strong>'+deporte+': </strong> Cancha'+cancha+'</div></div></div>';
}