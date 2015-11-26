// JavaScript Document
window.arregloDeReservas=new Array();
function mostrarDeporte(nombreDeporte,deporteId){	
if(!window.simulacion){window.analytics.trackEvent('Reservas', 'Abre Reservas Especifico', nombreDeporte, 1);}
var ipSend=window.sis_ip;
	document.getElementById("cartel").innerHTML='<div class="titulo"><p>'+nombreDeporte+'</p></div><div class="content"><p>Haga click en los horarios que desea reservar.</p></div><div class="content_export" style="overflow-x: auto;" id="content_canchas"><div class="loader"></div></div><div class="botones"><div class="botonera"><div onclick="cerrarTodo();" class="boton"><p>CANCELAR</p></div><div onclick="gestionarReserva()" class="boton der"><p>RESERVAR</p></div></div></div>';	 
document.getElementById("cartel").style.visibility="visible";
if(checkConnection()){
		if (window.XMLHttpRequest)
	 	 {// code for IE7+, Firefox, Chrome, Opera, Safari
	  		xmlhttp=new XMLHttpRequest();
	  		}
		else
	  	{// code for IE6, IE5
	 	 xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	 	 }
		xmlhttp.onreadystatechange=function()
	  	{
	 	 if (xmlhttp.readyState==4 && xmlhttp.status==200)
	    {
			document.getElementById("content_canchas").innerHTML=xmlhttp.responseText;
			return;
			
	    }else if(xmlhttp.status==503 || xmlhttp.status==404){// Esto es si el servidor no le llega a poder responder o esta caido
			 mostrarDeporte(nombreDeporte,deporteId);
			}
	 	 }
		xmlhttp.open("POST",ipSend+"ver_horarios.php",true);
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xmlhttp.send("de_id="+deporteId)
		}
		else{ return;
		}
}
function reservarHorarioTomado(){
	crearAviso("Este horario ya esta reservado, elija otro");
}
function reservarHorario(nombreCancha, nombreDeporte, canchaId, hora, fecha, elemento){	
	if(elemento.className=='hora_reserva'){
		elemento.className='hora_reserva reservar';
		//alert("Reservar"+deporte+hora+cancha);
		agregarReserva(nombreCancha, nombreDeporte, canchaId, hora, fecha);
	}else{
		if(elemento.className=='hora_reserva reservar'){
		elemento.className='hora_reserva';
		//alert("Reservar"+deporte+hora+cancha);
		quitarReserva(nombreCancha, nombreDeporte, canchaId, hora, fecha);
		}else{
		//alert("ya esta ocupado de antes");
		crearAviso("Este horario ya esta reservado, elija otro");
		}
	}
}
function agregarReserva(nombreCancha, nombreDeporte, canchaId, hora, fecha){
	var horario= new HoraDeporte(nombreCancha, nombreDeporte, canchaId, hora, fecha);
	window.arregloDeReservas.push(horario);
}
function quitarReserva(nombreCancha, nombreDeporte, canchaId, hora, fecha){
	//var horario= new HoraDeporte(deporte, hora, cancha);
	myArray=window.arregloDeReservas;
	index =-1;
	for(var i = 0, len = myArray.length; i < len; i++) {
    if (myArray[i].canchaId == canchaId && myArray[i].hora == hora && myArray[i].fecha == fecha ) {
		window.arregloDeReservas.splice(i, 1);
        break;
    	}
	}
}
function gestionarReserva(){ // Gestiona la reserva y a partir de eso deberia actualizar
	clearTimeout(window.actualiza);
	element="";
	cero=0;
	var p=new Array(); 
	//p.re_id +p.re_deporte +p.re_hora +p.re_fecha +p.re_can_nom +p.re_can_id+p.re_estad
	for (var b in window.arregloDeReservas ) {
		p.re_deporte=window.arregloDeReservas[b].nombreDeporte;
		p.re_hora=window.arregloDeReservas[b].hora;
		p.re_fecha=window.arregloDeReservas[b].fecha;
		p.re_can_nom=window.arregloDeReservas[b].nombreCancha;
		p.re_can_id=window.arregloDeReservas[b].canchaId;
		p.re_estad=0;
		p.re_id=0;
	   element +=parseReservas(p.re_deporte, p.re_hora,p.re_fecha,p.re_can_nom,p.re_can_id,0, b); 
	   guardarEnBaseYArreglo(p.re_deporte, p.re_hora,p.re_fecha,p.re_can_nom,p.re_can_id,b);
	   if(!window.simulacion){window.analytics.trackEvent('Reservas', 'Hace Reserva'+p.re_deporte, p.re_can_nom+p.re_hora, 1);}  
   }
   $(".historial").prepend(element);
   while(window.arregloDeReservas.length > 0) {
    window.arregloDeReservas.pop();
	}
	actualizar();
	cerrarTodo();
}
//
function guardarEnBaseYArreglo(re_deporte, re_hora,re_fecha,re_can_nom,re_can_id, b){
	var p=new Array();
		p.re_deporte=re_deporte;
		p.re_hora=re_hora;
		p.re_fecha=re_fecha;
		p.re_can_nom=re_can_nom;
		p.re_can_id=re_can_id;
		p.re_estad=0;
		p.re_id=0;
	cero=0;
	window.consultaReservas.push(p);
    db=window.db;
	   db.transaction(
	   function(tx){
		var query = 'INSERT INTO RESERVAS (re_id , re_deporte, re_hora, re_fecha, re_can_nom, re_can_id, re_estad) VALUES (?,?,?,?,?,?,?)';
     	tx.executeSql(query, [cero, re_deporte, re_hora, re_fecha,re_can_nom, re_can_id, cero]);
        }
	   , errorCB, successCBS);
	}
function parseReservas(deporte, hora, fecha, cancha, canchaId,re_estado, parimpar){
	diafecha=parseDiaFecha(fecha,hora);
	ident=hora+fecha+canchaId;
	if(re_estado<6){
		var estado;
		switch(re_estado) {
    case 0:
        estado='<img src="img/estados/enviando.png" id="img_inv_'+ident+'" class="estado" />';//'Enviando';
        break;
    case 1:
        estado='<img src="img/estados/recibido.png" id="img_inv_'+ident+'" class="estado" />';//'Recibido';
        break;
	case 3:
        estado='<img src="img/estados/ok.png" id="img_inv_'+ident+'" class="estado" />';//'Entro';
        break;
	case 5:
        estado='<img src="img/estados/no.png" id="img_inv_'+ident+'" class="estado" />';//'Cancelado'; borrarContactoEstado(i,inv_mod)
        break;
	}
	if(parimpar%2==0){clase='texto';}else{clase='texto par';}
		if(estado!='cancelado'){
    	return '<div class="historial_item" id="historial_item_'+ident+'"><div class="'+clase+'"><div class="fecha">'+diafecha+'</div><!--div onclick="cancelarReserva('+ident+',this)" class="borrar"><p>X</p></div--><div class="contacto">'+deporte+' --- '+cancha+'</div>'+estado+'</div></div>';}else{
		return '';
		}
	
	}else{
		return '';
	}
}
function crearAviso(contenidoAviso){
	document.getElementById("contAlert").innerHTML=contenidoAviso;
	document.getElementById("cartel4").style.visibility="visible";
	document.getElementById("fondo_negro2").style.visibility="visible";
}
function cerrarAviso(){
	document.getElementById("cartel4").style.visibility="hidden";
	document.getElementById("fondo_negro2").style.visibility="hidden";
}
function utcformat(d){
    //d= new Date(d);// - a.getTimezoneOffset();
	d= new Date();
	dia= d.getDate();// Dia del mes
	mes= d.getMonth();// que mes
	hora= d.getHours();// hora
	minutos=d.getMinutes();// minutos
    return '<div class="dia">'+dia+'/'+mes+'</div><div class="hora">'+hora+':'+minutos+'</div>';
}
function HoraDeporte(nombreCancha, nombreDeporte, canchaId, hora, fecha) {
  this.nombreCancha = nombreCancha;
  this.nombreDeporte = nombreDeporte;
  this.canchaId = canchaId;
  this.hora = hora;
  this.fecha = fecha;
  //alert('Una instancia de Persona');
}
function parseDiaFecha(fecha,hora){
	dia=fecha.substring(8, 10);
	mes=fecha.substring(5, 7);
	hora=hora.substring(0, 5);
	return '<div class="dia">'+dia+'/'+mes+'</div><div class="hora">'+hora+'</div>';
}