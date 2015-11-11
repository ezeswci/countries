// JavaScript Document
window.TengoQueActualizar=0;
window.consultaReservas;
function actualizar(){
	// Esta es la consulta de todos los invitados tal cual la mostramos.
	arreglo=window.consultaReservas;
    for (var i = 0; i < arreglo.length; i++) {
        var p = arreglo[i];
		verificarEstadoReserva(i,p.re_id , p.re_deporte, p.re_hora, p.re_fecha, p.re_can_nom, p.re_can_id, p.re_estad);
		//alert("actualizo"+p.re_id +p.re_deporte +p.re_hora +p.re_fecha +p.re_can_nom +p.re_can_id+p.re_estad + "id por otro lado");
    }
	setTimeout(function(){actualizar();},15000);// Actualiza cada 15 segundos
}
function errorCBAA() {
    alert("error CBAA");
}
function verificarEstadoReserva(i,re_id , re_deporte, re_hora, re_fecha, re_can_nom, re_can_id, re_estad){
	if(re_estad!=0){// Tengo que verificar si entro al barrio
		if(masDeunDia(re_fecha)){// Me fijo si es algo que ya quedo viejo, si quedo viejo lo fleto
				borrarReservaFinalizada(i,re_hora, re_fecha,re_can_id);
			}else{
		if(re_estad==1){// Solo consulto los que estan pendientes de que autorizen
		actualizarReserva(i,re_id,re_hora, re_fecha,re_can_id,re_estad);
		}	// No es sincronizado, varia el mayor
			}
		return;
	}else{// hay que crear el invitado y asociarlo con la guardia
		 crearReserva(i,re_id , re_deporte, re_hora, re_fecha, re_can_nom, re_can_id, re_estad);
		 return
	}
}
function crearReserva(i,re_id , re_deporte, re_hora, re_fecha, re_can_nom, re_can_id, re_estad){
	//alert ("entre a crear un usuario con i="+i);
	//alert("crear Reserva -- actualizo"+i+ "id por otro lado" +re_id+'-'+re_deporte+'-'+re_hora+'-'+re_fecha+'-'+re_can_nom+'-'+re_can_id+'-'+re_estad);
	if(checkConnection()){
		var lot=window.lotUsuId;
		var ipSend=window.sis_ip;
		var xmlhttp;
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
				value=(xmlhttp.responseText).split("-");//id-estado¨
				idReserva=parseInt(value[0]);
				estadoCancha=parseInt(value[1]);
				//alert("crearReserva:"+xmlhttp.responseText+"--:"+idReserva+"-"+estadoCancha);
				if(idReserva!=0){
					actualizarReservasId(i,idReserva,estadoCancha,re_can_id, re_fecha, re_hora);
				}else{
					actualizarReservasId(i,0,5,re_can_id, re_fecha, re_hora);
				}
				if(estadoCancha<6){
				var estado;
				switch(estadoCancha) {
    			case 0:
       			 estado="img/estados/no.png";// El turno esta tomado
        		break;
    			case 1:
        		estado="img/estados/recibido.png";//'Recibido';
        		break;
				case 3:
        		estado="img/estados/ok.png";//'Entro';
        		break;
				case 5:
       			estado="img/estados/no.png";//'Cancelado'; borrarContactoEstado(i,inv_mod)
        		break;
								}}
			// poner la imagen de que lo recibio
			ident=re_hora+re_fecha+re_can_id;
			document.getElementById("img_inv_"+ident).src=estado;
			//window.TengoQueActualizar=1;
			return;
			
	    }else if(xmlhttp.status==503 || xmlhttp.status==404){// Esto es si el servidor no le llega a poder responder o esta caido
			 return;
			}
	 	 }
		xmlhttp.open("POST",ipSend+"nueva_reserva.php",true);
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xmlhttp.send("in_lousu_id="+lot+"&re_hora="+re_hora+"&re_fecha="+re_fecha+"&re_can_id="+re_can_id);
		}
		else{ return;
		}
}
function actualizarReservasId(i,idReserva,estadoCancha,re_can_id, re_fecha, re_hora){
	//alert("actualizo"+rowid+'--'+value);
	//alert("actualizarReservasId -- actualizo"+i+ "id por otro lado" +idReserva+'-'+estadoCancha+'-'+re_can_id+'-'+re_fecha+'-'+re_hora);
	p=window.consultaReservas[i];
	p.re_estad=estadoCancha;
	p.re_id=idReserva;
	window.consultaReservas[i]=p;
	db=window.db;
	db.transaction(function (tx) {
		tx.executeSql('UPDATE RESERVAS SET re_estad=?, re_id=? WHERE re_can_id = ? and re_fecha = ? and re_hora = ? ', [estadoCancha,idReserva,re_can_id, re_fecha, re_hora], successupd, errorupd);
	}
	);
}
function successupd(){
	 //alert('acualizo bien');
	 
}
function errorupd(){
	 alert('acualizo mal');
	 
}

function actualizarReserva(i,re_id,re_hora, re_fecha,re_can_id,re_estad){
	//alert ("entre a actualizar un invitado:"+inv_id);
	var ipSend=window.sis_ip;
	if(checkConnection()){
		//var lot=window.lotUsuId;
		var xmlhttp;
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
			value=parseInt(xmlhttp.responseText);
			ident=re_hora+re_fecha+re_can_id;
			if(value==3){// Si el estado es procesado cambiar a procesado
			document.getElementById("img_inv_"+ident).src="img/estados/ok.png";
			actualizarReservasEstado(re_id,value,i);// Completar
			}
			if(value==5){// Si el estado es procesado cambiar a procesado
			document.getElementById("img_inv_"+ident).src="img/estados/no.png";
			actualizarReservasEstado(re_id,value,i);// Completar
			}
			return;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404){// Esto es si el servidor no le llega a poder responder o esta caido
			 return;
			}
	 	 }
		xmlhttp.open("POST",ipSend+"leer_reserva.php",false);
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xmlhttp.send("re_id="+re_id);
		}
		else{ return;
		}
}
function actualizarReservasEstado(re_id,re_estad,i){
	//alert("actualizo"+rowid+'--'+value);
	//alert("actualizarReservasId -- actualizo"+i+ "id por otro lado" +idReserva+'-'+estadoCancha+'-'+re_can_id+'-'+re_fecha+'-'+re_hora);
	p=window.consultaReservas[i];
	p.re_estad=re_estad;
	window.consultaReservas[i]=p;
	db=window.db;
	db.transaction(function (tx) {
		tx.executeSql('UPDATE RESERVAS SET re_estad=? WHERE re_id=? ', [re_estad,re_id], successupd, errorupd);
	}
	);
}
function masDeunDia(re_fecha){
	fecha_reserva=re_fecha.split("-");
	dia_reserva=parseInt(fecha_reserva[2]);
	mes_reserva=parseInt(fecha_reserva[1])-1;
	ano_reserva=parseInt(fecha_reserva[0]);
	var one = new Date(); // Hoy
    var two = new Date(ano_reserva, mes_reserva, dia_reserva); // Reserva
    // Do the math.
    var millisecondsPerDay = 1000 * 60 * 60 * 24;
    var millisBetween = two.getTime() - one.getTime();
    var days = millisBetween / millisecondsPerDay;
	//alert(re_fecha+' el uno'+one+' el dos'+two+' diferencia'+diferenciaDias+'sin redondeo'+days);
	if(days>-1){// Si esta en el dia se puede ir aporximando a -1 por la direcencia de hora cuando pasa el -1 es que paso el dia
		return false;// No lo elimina
	}else{
		return true;// Lo elimina
	}
	
}
function borrarReservaFinalizada (i,re_hora, re_fecha,re_can_id){
	window.consultaReservas.splice(i, 1);
	db=window.db;
	//alert("elimino"+re_hora+re_fecha+re_can_id)
	db.transaction(function (tx) {
		tx.executeSql('DELETE FROM RESERVAS WHERE re_hora=? and re_fecha=? and re_can_id=? ', [re_hora,re_fecha,re_can_id], successupd, errorupd);
	}
	);
}