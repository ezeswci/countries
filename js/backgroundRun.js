// JavaScript Document
/*
function onDeviceReady() {
    var dbSize = 20000000;// 20mb
    var dbName = "CCA";
    var dbVersion = "1.0";
    var dbDisplayName = "CCAppDatabase";
	//alert("Empieza");
    //Init DB
    //
    window.db = window.openDatabase(dbName, dbVersion, dbDisplayName, dbSize);
	window.db.transaction(selectLotUsuIdBack, errorBack);
   	window.db.transaction(initDBReservasBack, errorBack, successCBReservasBack);
	window.db.transaction(initDBInvitadosBack, errorBack, successCBInvitadosBack);
	window.db.transaction(initDBAlertaBack, errorBack, successCBAlertaBack);
}


*/
window.simulacion=false;
if(!window.simulacion){
document.addEventListener('deviceready', function () {
    // cordova.plugins.backgroundMode is now available
	if(!window.simulacion){
	if(!cordova.plugins.backgroundMode.isEnabled()){cordova.plugins.backgroundMode.enable();}
	cordova.plugins.backgroundMode.configure({
    silent: true
				})
;}
}, false);
document.addEventListener("deviceready", onDeviceReadyUdid, false);
function onDeviceReadyUdid() {
	
    window.udid=device.uuid;
}
}else{
		window.udid='123456';
	}
if(!window.simulacion){
document.addEventListener('deviceready', function () {
    // Analytics para club House
	window.analytics.startTrackerWithId('UA-69244682-1');// Analytics para club house
	window.analytics.trackView('OP-Mas');
}, false);
}
function inicioMasBack(){
	var dbSize = 20000000;// 20mb
    var dbName = "CCA";
    var dbVersion = "1.0";
    var dbDisplayName = "CCAppDatabase";
	//alert("Empieza");
    //Init DB
    //
    window.db = window.openDatabase(dbName, dbVersion, dbDisplayName, dbSize);
	masBack();
}
function masBack(){
	//alert("Entro al Back");
	setTimeout(function(){window.db.transaction(selectLotUsuIdBack, errorBack);
   	window.db.transaction(initDBReservasBack, errorBack, successCBReservasBack);
	window.db.transaction(initDBInvitadosBack, errorBack, successCBInvitadosBack);
	window.db.transaction(initDBAlertaBack, errorBack, successCBAlertaBack);
	comprobarEquipoBack();},10000);
	setTimeout(function(){masBack();},60000);
}
function reservasBack(){
	//alert("Entro al Back");
	setTimeout(function(){window.db.transaction(initDBInvitadosBack, errorBack, successCBInvitadosBack);
	window.db.transaction(initDBAlertaBack, errorBack, successCBAlertaBack);
	comprobarEquipoBack();},10000);
	setTimeout(function(){reservasBack();},60000);
}
function notBack(){	
	//alert("Entro al Back Noticias");
   	setTimeout(function(){window.db.transaction(initDBReservasBack, errorBack, successCBReservasBack);
	window.db.transaction(initDBInvitadosBack, errorBack, successCBInvitadosBack);
	window.db.transaction(initDBAlertaBack, errorBack, successCBAlertaBack);
	comprobarEquipoBack();},10000);
	setTimeout(function(){notBack();},60000);
}
function invBack(){
	//alert("Entro al Back");
   	setTimeout(function(){window.db.transaction(initDBReservasBack, errorBack, successCBReservasBack);
	window.db.transaction(initDBAlertaBack, errorBack, successCBAlertaBack);
	comprobarEquipoBack();},10000);
	setTimeout(function(){invBack();},60000);
}
function emergBack(){
	//alert("Entro al Back");
   	setTimeout(function(){
	window.db.transaction(initDBReservasBack, errorBack, successCBReservasBack);
	window.db.transaction(initDBInvitadosBack, errorBack, successCBInvitadosBack);
	comprobarEquipoBack();},10000);
	setTimeout(function(){emergBack();},60000);
}
function errorBack(){
	//alert("Error");
	//window.location='reservas.html';
}
function successBack(){
	//crearAviso(1);
}
// Init the table
//
// -------------------------- Empiezo con el sector de Reservas -------------------------------------
function initDBReservasBack(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS RESERVAS (re_id , re_deporte, re_hora, re_fecha, re_can_nom, re_can_id, re_estad )');// Reservas estado 0-enviad
}

// Transaction error callback
//
function errorCB(tx, err) {
    alert("Error processing SQL: " + err);
}

// Transaction success callback
//
function successCBReservasBack() {
	//alert("Miro las reservas");
	db.transaction(selectReservasBack, errorBack);
	
}
// Elijo el Lot usu id
function selectLotUsuIdBack(tx) {
	//alert("Entro a buscar datos usuario USU id BACK");
    tx.executeSql('SELECT * FROM LOT_USU', [], querySuccessUsuIdBack, errorBack);
}
function querySuccessUsuIdBack(tx, rs) {
    // this will be empty since no rows were inserted.
	//alert("DATOS usuario USU id BACK");
    for (var i = 0; i < rs.rows.length; i++) {
        var p = rs.rows.item(i);
		window.lotUsuId=p.lu_id;
		window.sis_ip=p.sis_ip;
		window.sis_ult_avi=p.sis_ult_avi;
    }
}
function selectReservasBack(tx) {
    tx.executeSql('SELECT * FROM RESERVAS ORDER BY re_fecha DESC, re_hora DESC ', [], querySuccessReservasBack, errorBack);
}
function querySuccessReservasBack(tx, rs) {
    // this will be empty since no rows were inserted.
	//window.consultaReservas;// Esta es la consulta de todos los invitados tal cual la mostramos.
    for (var i = 0; i < rs.rows.length; i++) {
        var p = rs.rows.item(i);
		verificarEstadoReservaBack(i,p.re_id , p.re_deporte, p.re_hora, p.re_fecha, p.re_can_nom, p.re_can_id, p.re_estad);
    }
}
function verificarEstadoReservaBack(i,re_id , re_deporte, re_hora, re_fecha, re_can_nom, re_can_id, re_estad){
	if(re_estad!=0){// Tengo que verificar si entro al barrio
		if(masDeunDia(re_fecha)){// Me fijo si es algo que ya quedo viejo, si quedo viejo lo fleto
				borrarReservaFinalizadaBack(i,re_hora, re_fecha,re_can_id);
			}else{
		if(re_estad==1){// Solo consulto los que estan pendientes de que autorizen
		actualizarReservaBack(i,re_id,re_hora, re_fecha,re_can_id,re_estad);
		}	// No es sincronizado, varia el mayor
			}
		return;
	}else{// hay que crear el invitado y asociarlo con la guardia
		 crearReservaBack(i,re_id , re_deporte, re_hora, re_fecha, re_can_nom, re_can_id, re_estad);
		 return
	}
}
function crearReservaBack(i,re_id , re_deporte, re_hora, re_fecha, re_can_nom, re_can_id, re_estad){
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
					actualizarReservasIdBack(i,idReserva,estadoCancha,re_can_id, re_fecha, re_hora);
				}else{
					actualizarReservasIdBack(i,0,5,re_can_id, re_fecha, re_hora);
				}
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
function actualizarReservasIdBack(i,idReserva,estadoCancha,re_can_id, re_fecha, re_hora){
	db=window.db;
	db.transaction(function (tx) {
		tx.executeSql('UPDATE RESERVAS SET re_estad=?, re_id=? WHERE re_can_id = ? and re_fecha = ? and re_hora = ? ', [estadoCancha,idReserva,re_can_id, re_fecha, re_hora], successBack, errorBack);
	}
	);
}
function actualizarReservaBack(i,re_id,re_hora, re_fecha,re_can_id,re_estad){
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
			actualizarReservasEstadoBack(re_id,value,i);// Completar
			}
			if(value==5){// Si el estado es procesado cambiar a procesado
			actualizarReservasEstadoBack(re_id,value,i);// Completar
			}
			return;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404){// Esto es si el servidor no le llega a poder responder o esta caido
			 return;
			}
	 	 }
		xmlhttp.open("POST",ipSend+"leer_reserva.php",true);
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xmlhttp.send("re_id="+re_id);
		}
		else{ return;
		}
}
function actualizarReservasEstadoBack(re_id,re_estad,i){
	//alert("actualizo"+rowid+'--'+value);
	//alert("actualizarReservasId -- actualizo"+i+ "id por otro lado" +idReserva+'-'+estadoCancha+'-'+re_can_id+'-'+re_fecha+'-'+re_hora);
	db=window.db;
	db.transaction(function (tx) {
		tx.executeSql('UPDATE RESERVAS SET re_estad=? WHERE re_id=? ', [re_estad,re_id], successBack, errorBack);
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
function borrarReservaFinalizadaBack (i,re_hora, re_fecha,re_can_id){
	db=window.db;
	//alert("elimino"+re_hora+re_fecha+re_can_id)
	db.transaction(function (tx) {
		tx.executeSql('DELETE FROM RESERVAS WHERE re_hora=? and re_fecha=? and re_can_id=? ', [re_hora,re_fecha,re_can_id], successBack, errorBack);
	}
	);
}
// -------------------------- Termino con el sector de Reservas -------------------------------------
// -------------------------- Comienzo con el sector de Invitados -------------------------------------
function initDBInvitadosBack(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS INVITADOS (inv_id , inv_lu_id, inv_nombre, inv_estado, inv_mod )');// Inivtados estado 0-enviado 1-recibido 2-entro 3-cancelado 4-no aparece entro 5- no aparece cancelado
}
function successCBInvitadosBack() {
    //alert("Success!");
	//alert("Miro los Invitados");
    db.transaction(selectInvitadosBack, errorBack);
	
}
function selectInvitadosBack(tx) {
    tx.executeSql('SELECT * FROM INVITADOS ORDER BY inv_mod DESC', [], querySuccessInvitadosBack, errorBack);
}
function querySuccessInvitadosBack(tx, rs) {
    for (var i = 0; i < rs.rows.length; i++) {
        var p = rs.rows.item(i);
		verificarEstadoInvitadoBack(i,p.inv_id, p.inv_nombre, p.inv_estado, p.inv_mod);

    }
}
function verificarEstadoInvitadoBack(i,inv_id, inv_nombre, inv_estado, inv_mod){
	if(inv_estado!=0){// Tengo que verificar si entro al barrio
		if(inv_estado==1){// Solo consulto los que estan pendientes de que autorizen
		actualizarInvitadoBack(i,inv_mod,inv_id, inv_estado);
		}// No es sincronizado, varia el mayor
		return;
	}else{// hay que crear el invitado y asociarlo con la guardia
		 crearInvitadoBack(i,inv_nombre, inv_estado, inv_mod);
		 return
	}
}
function crearInvitadoBack(i,inv_nombre, inv_estado, inv_mod){
	var ipSend=window.sis_ip;
	if(checkConnection()){
		var lot=window.lotUsuId;
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
			value=parseInt(xmlhttp.responseText);// Devuelve el Id del invitado
			actualizarContactoIdBack(i,value,inv_mod);
			//window.TengoQueActualizar=1;
			return;
			
	    }else if(xmlhttp.status==503 || xmlhttp.status==404){// Esto es si el servidor no le llega a poder responder o esta caido
			 return;
			}
	 	 }
		xmlhttp.open("POST",ipSend+"nuevo_invitado.php",true);
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xmlhttp.send("in_lousu_id="+lot+"&in_nombre="+inv_nombre);
		}
		else{ return;
		}
}
function actualizarContactoIdBack(i,value,inv_mod){
	estado=1;// Lo acaba de crear
	window.db.transaction(function (tx) {
		tx.executeSql('UPDATE INVITADOS SET inv_estado=?, inv_id=? WHERE inv_mod = ?', [estado,value,inv_mod], successBack, errorBack);
	}
	);
}
function actualizarInvitadoBack(i,inv_mod,inv_id, inv_estado){
	//alert ("entre a actualizar un invitado:"+inv_id);
	var ipSend=window.sis_ip;
	if(checkConnection() && inv_id>0){
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
			
			//alert("devuelto:"+value+" Tengo:"+inv_estado);
			if(inv_estado!=value){
			//alert("Actualizo:"+value);
			actualizarContactoEstadoBack(i,inv_id,value);			
			}
			return;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404){// Esto es si el servidor no le llega a poder responder o esta caido
			 return;
			}
	 	 }
		xmlhttp.open("POST",ipSend+"leer_invitado.php",true);
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xmlhttp.send("in_lousu_id="+inv_id);
		}
		else{ return;
		}
}
function actualizarContactoEstadoBack(i,inv_id,value){
	window.db.transaction(function (tx) {
		tx.executeSql('UPDATE INVITADOS SET inv_estado=? WHERE inv_id = ?', [value,inv_id], successBack, errorBack);
	}
	);
}
// -------------------------- Termino con el sector de Invitados -------------------------------------
// -------------------------- Comienzo con el sector de Alarma -------------------------------------
function initDBAlertaBack(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS ALERTA (al_id , al_estado)');// Reservas al_estado 0-noenviado, 1 si
}
// Transaction success callback
//
function successCBAlertaBack() {
	//alert("Miro los alerta");
    db.transaction(selectAlertaBack, errorBack);
	
}
// Elijo el Lot usu id
function selectAlertaBack(tx) {
    tx.executeSql('SELECT * FROM ALERTA', [], querySuccessAlertaBack, errorBack);
}
function querySuccessAlertaBack(tx, rs) {
    // this will be empty since no rows were inserted.
	if(rs.rows.length>0){// Quedo un alerta pendiente
	enviarMensajeServidorBack();
	}
}
function crearAlertaBack(){
	al_id=1;
	estado=0;
	window.db.transaction(function (tx) {
		tx.executeSql('INSERT INTO ALERTA (al_id , al_estado) VALUES (?,?)', [al_id,estado], successBack, errorBack);
	}
	);
}
function borrarAlertaBack(){
	estado=0;
	window.db.transaction(function (tx) {
		tx.executeSql('DELETE FROM ALERTA WHERE al_estado = ?', [estado], successBack, errorBack);
	}
	);
}
function enviarMensajeServidorBack(){
	//alert ("entre a actualizar un invitado:");
	crearAlertaBack();
	var lot_usu=window.lotUsuId;
	var usu_udid=window.udid;
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
			borrarAlertaBack();
			//alert("devuelto:"+value+" Tengo:"+inv_estado);
	    }
	 	 }
		xmlhttp.open("POST",ipSend+"activar_alerta.php",true);
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xmlhttp.send("lot_usu="+lot_usu+"&usu_udid="+usu_udid);
		}
		else{
			setTimeout(function(){enviarMensajeServidorBack();},3000); 
		}
}
// -------------------------- Termino con el sector de Alarma -------------------------------------
// -------------------------- Comienza con comprobaciones Regulares -------------------------------------
function comprobarEquipoBack(){
	//alert("Miro comprobar equipo");
	var lot_usu=window.lotUsuId;
	var usu_udid=window.udid;
	var ipSend=window.sis_ip;
	//alert("Entre comprobar equipo, lot usu"+lot_usu+" udid"+usu_udid+" ipsend"+ipSend);
	if(checkConnection()&& lot_usu != undefined && usu_udid != undefined && ipSend != undefined){
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
			//alert(xmlhttp.responseText);
			if(value==0){
				echarCelular(lot_usu);
			}else{
				comprobarSiAvisos();
			}
			//alert("devuelto:"+value+" Tengo:"+inv_estado);
	    }
	 	 }
		xmlhttp.open("POST",ipSend+"comprobar_equipo.php",true);
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xmlhttp.send("lot_usu="+lot_usu+"&usu_udid="+usu_udid);
		}
		else{
			setTimeout(function(){comprobarEquipo();},3000); 
		}
}
function echarCelular(lot_usu){
	val=0;
	window.db.transaction(function (tx) {
		tx.executeSql('UPDATE LOT_USU SET lu_usu_id=? WHERE lu_usu_id = ?', [val,lot_usu], successBack, errorBack);
	}
	);
	window.location = "echado.html";
} 
function comprobarSiAvisos(){
	
	var lot_usu=window.lotUsuId;
	var ipSend=window.sis_ip;
	var sis_ult_avi=window.sis_ult_avi;
	//alert ("entre a comprobar alertas"+sis_ult_avi);
	//alert("Entre comprobar equipo, lot usu"+lot_usu+" udid"+usu_udid+" ipsend"+ipSend);
	if(checkConnection()&& lot_usu != undefined && ipSend != undefined){
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
			var respuesta = xmlhttp.responseText;
			//alert(respuesta);
			if(parseInt(respuesta)!=0){
			var obj = JSON.parse(respuesta);
			for (var i = 0; i < obj.length; i++) {
				generarAlerta(obj[i]['ci_id'],obj[i]['ci_titulo'],obj[i]['ci_content']);//
				avisoPorAtras(obj[i]['ci_id'],obj[i]['ci_titulo'],obj[i]['ci_content']);
				//actualizarUltimoAviso(obj[i]['ci_fecha'],lot_usu)
    		}
			//alert("fecha"+obj[i-1]['ci_fecha'])
			actualizarUltimoAviso(obj[i-1]['ci_fecha'],lot_usu);
			}else{
				//alert("Sin actualizaciones");
			}
			//window.TengoQueActualizar=1;
			return;
	    }
	 	 }
		xmlhttp.open("POST",ipSend+"comprobar_mensajes.php",true);
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xmlhttp.send("lot_usu="+lot_usu+"&sis_ult_avi="+sis_ult_avi);
		}
		else{
			setTimeout(function(){comprobarSiAvisos();},3000); 
		}
}
function actualizarUltimoAviso(sis_ult_avi,lot_usu){
	window.sis_ult_avi=sis_ult_avi;
	window.db.transaction(function (tx) {
		tx.executeSql('UPDATE LOT_USU SET sis_ult_avi= ? WHERE lu_usu_id = ?', [sis_ult_avi,lot_usu], successBack, errorBack);
	}
	);
}
function generarAlerta(id,titulo,contenido){
	//alert(id+titulo+contenido);
	var div = document.createElement("div");
	var fondo = document.createElement("div");
	div.className="cartel";
	fondo.className="fondo_negro";
	div.id="acartel"+id;
	fondo.id="afondo_negro"+id;
	div.style.visibility="visible";
	fondo.style.visibility="visible";
	div.innerHTML='<div class="titulo"><p>'+titulo+'</p></div><div class="content"><p>'+contenido+'</p></div><div class="botones"><div onclick="cerraAlerta(\''+id+'\');" class="boton_unico"><p>CERRAR</p></div></div>';
	fondo.onclick=function (){cerarAlerta(id);};
	document.body.appendChild(div);
	document.body.appendChild(fondo);      
}
function avisoPorAtras(id,titulo,contenido){
	if(!window.simulacion){if(cordova.plugins.backgroundMode.isActive()){
	window.plugin.notification.local.add({
    id:         id,
	title:      titulo,
    message:    contenido,
	autoCancel: true
	});//
	}}
	}
function cerraAlerta(id){
	if(document.getElementById("acartel"+id)!=null){
		document.getElementById("acartel"+id).style.display='none';
	}
	if(document.getElementById("afondo_negro"+id)!=null){
		document.getElementById("afondo_negro"+id).style.display='none';
	}
}