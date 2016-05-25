$(document).ready(onDeviceReady);
// Para hacerlo mas adaptable a varios countries deberia ver en que country estoy
// Tener en cuenta que uso el lot_usu_id para decir a que corresponde la invitación

if(!window.simulacion){
document.addEventListener('deviceready', function () {
    // Analytics para club House
	window.analytics.startTrackerWithId('UA-69244682-1');// Analytics para club house
	window.analytics.trackView('OP-Invitados');
}, false);
}
//Global database
//
window.db;
//window.passreal;
//window.passfalsa;
window.lotUsuId;
window.consultaInvitados=new Array();// La consulta echa
window.delet_id;
// PhoneGap is ready
//
function onDeviceReady() {
    var dbSize = 20000000;// 20mb
    var dbName = "CCA";
    var dbVersion = "1.0";
    var dbDisplayName = "CCAppDatabase";
	//alert("Empieza");
    //Init DB
    //
    window.db = window.openDatabase(dbName, dbVersion, dbDisplayName, dbSize);
   	window.db.transaction(initDB, errorCB, successCB);
	invBack();
	//window.db.transaction(selectPass, errorCB);
	//db.transaction(initDB, errorCB, successCBM);

}
function selectPass(tx) {
    //tx.executeSql('SELECT * FROM PASS', [], querySuccessPass, errorCB);
}

// Init the table
//
function initDB(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS INVITADOS (inv_id , inv_lu_id, inv_nombre, inv_estado, inv_mod )');// Inivtados estado 0-enviado 1-recibido 2-entro 3-cancelado 4-no aparece entro 5- no aparece cancelado
}

// Transaction error callback
//
function errorCB(tx, err) {
    alert("Error processing SQL: " + err);
}

// Transaction success callback
//
function successCB() {
    //alert("Success!");
    //Select query
    //
	db.transaction(selectLotUsuId, errorCB);
    db.transaction(selectInvitados, errorCB);
	
}
// Elijo el Lot usu id
function selectLotUsuId(tx) {
    tx.executeSql('SELECT * FROM LOT_USU', [], querySuccessUsuId, errorCB);
}
function querySuccessUsuId(tx, rs) {
    // this will be empty since no rows were inserted.

    for (var i = 0; i < rs.rows.length; i++) {
        var p = rs.rows.item(i);
		window.lotUsuId=p.lu_id;
		window.sis_ip=p.sis_ip;
		window.sis_tabs=p.sis_tabs.split("/");
		window.sis_ult_avi=p.sis_ult_avi;
		cargoOpcionesDeMenu();
    }
}
function cargoOpcionesDeMenu(){
	// sis_tabs son los tabs que el country tiene disponibles Noticias - visitas- emergencias - reservas
	if(window.sis_tabs[0]==0){ document.getElementById("botNoticiasFoot").style.display="none";}
	if(window.sis_tabs[1]==0){ document.getElementById("botInvitadosFoot").style.display="none";}
	if(window.sis_tabs[2]==0){ document.getElementById("botEmergenciasFoot").style.display="none";}
	if(window.sis_tabs[3]==0){ document.getElementById("botReservasFoot").style.display="none";}
}
// Enlisto todos los invitados y los adjunto al panel
function selectInvitados(tx) {
    tx.executeSql('SELECT * FROM INVITADOS ORDER BY inv_mod DESC', [], querySuccess, errorCB);
}
function querySuccess(tx, rs) {
    // this will be empty since no rows were inserted.
	window.consultaInvitados;// Esta es la consulta de todos los invitados tal cual la mostramos.
    for (var i = 0; i < rs.rows.length; i++) {
        var p = rs.rows.item(i);
		window.consultaInvitados[i]=p;
		//alert('rowid'+p.rowid);
        var element = parseINVITADOS(p.inv_id, p.inv_nombre, p.inv_estado, p.inv_mod, i);
		//verificarEstadoInvitado(i+1,p.inv_id, p.inv_nombre, p.inv_estado, p.inv_mod); No lo hacemos recien lo carga por si no tiene internet
        //alert(element);
        $(".historial").prepend(element);
    }
	window.actualiza=setTimeout(function(){actualizar();},3000);
}
function parseINVITADOS(inv_id, inv_nombre, inv_estado, modificado, parimpar){
	diafecha=utcformat(modificado);//(new Date(modificado)).toUTCString();
	if(inv_estado<4){
		var estado;
		switch(inv_estado) {
    case 0:
        estado='<img src="img/estados/enviando.png" id="img_inv_'+modificado+'" class="estado" />';//'Enviando';
		estadoClase="";
        break;
    case 1:
        estado='<img src="img/estados/recibido.png" id="img_inv_'+modificado+'" class="estado" />';//'Recibido';
		estadoClase="";
        break;
	case 2:
        estado='<img src="img/estados/procesado.png" id="img_inv_'+modificado+'" class="estado" />';//'Entro';
		estadoClase="entro";
        break;
	case 3:
        estado='cancelado';//'Cancelado'; borrarContactoEstado(i,inv_mod)
        break;
	}
	if(parimpar%2==0){clase='texto '+estadoClase;}else{clase='texto par '+estadoClase;}
		if(estado!='cancelado'){
    	return '<div class="historial_item" id="historial_item_'+(modificado)+'"><div class="'+clase+'"><div class="fecha">'+diafecha+'</div><div onclick="borrarContacto('+modificado+','+parimpar+',this)" class="borrar"><p>X</p></div><div class="contacto">'+inv_nombre+'</div>'+estado+'</div></div>';}else{
		return '';
		}
	
	}else{
		return '';
	}
}
// Fin de Ajunto los inivtados
function agregarContactos (){
	document.getElementById("cartel").style.visibility="visible";
	document.getElementById("fondo_negro").style.visibility="visible";
}
function agregarSMSManual(){
	if(!window.simulacion){window.analytics.trackEvent('Invitados', 'Apertura invitado', 'invitados', 1);}
	document.getElementById("cartel2").style.visibility="hidden";
	document.getElementById("cartel3").innerHTML='<div class="titulo"><p>INGRESE LOS DATOS</p></div><div class="content"><p>Ingrese el nombre del Invitado.</p><table width="100%" style=" margin-top:15px;"><tr><td width="20%">Nombre:</td><td><input type="text" id="con_nombre" autocomplete="off" ></td></tr></table><table style=" margin-bottom:25px;" width="100%"><tr><td width="20%">Apellido:</td><td><input type="text" id="con_apellido" autocomplete="off" ></td></tr></table></div><div class="botones"><div class="botonera"><div onclick="cerrarTodo();" class="boton"><p>CANCELAR</p></div><div onclick="agregarAgenda();" class="boton der"><p>AGREGAR</p></div></div></div>';
	document.getElementById("fondo_negro").style.visibility="visible";
	document.getElementById("cartel3").style.visibility="visible";
}/*
function agregarMailManual(){
	document.getElementById("cartel2").style.visibility="hidden";
	document.getElementById("cartel3").innerHTML='<div class="titulo">INGRESE LOS DATOS</div><div class="content"><p>Ingrese el nombre del contacto a agregar como su mail a cual enviarle el mensaje de Alerta.</p><table width="100%"><tr><td width="20%">Nombre:</td><td><input type="text" id="con_nombre" autocomplete="off" ></td></tr><tr><td>Mail:</td><td><input type="text" id="con_destino" autocomplete="off" ></td></tr></table></div><input type="hidden" id="con_tipo" value="Mail" /><div class="botones"><div onclick="cerrarTodo();" class="boton">CANCELAR</div><div onclick="agregarAgenda();" class="boton der">AGREGAR</div></div>';
	document.getElementById("cartel3").style.visibility="visible";
}*/
function successCBS(){
	window.location='invitados.html';
}
function insertContactoManual(tx){
	if(!window.simulacion){window.analytics.trackEvent('Invitados', 'Autorizo invitado', 'invitados', 1);}
	 nombre=document.getElementById("con_nombre").value.capitalize()+" "+document.getElementById("con_apellido").value.capitalize();
	 estado=0;
	 quien=window.lotUsuId;
	 cuando=Date.now();
	 //alert("claves"+verdadera+"-fal-"+falsa);CONTACT (con_id unique, con_tipo, con_nombre, con_destino)
	 var query = 'INSERT INTO INVITADOS (inv_nombre, inv_estado, inv_lu_id, inv_mod) VALUES (?,?,?,?)';
     tx.executeSql(query, [nombre, estado, quien, cuando]);
	 clearTimeout(window.actualiza);
	 actualizar();
	 
}
function borrarContacto(modificado,i,element){
	element=element.parentNode;
	element.parentNode.style.display="none";
	//borrarContactoEstado(i,modificado)
	window.delet_id=modificado;
	window.consultaInvitados[i].inv_estado=3;
	window.db.transaction(borrarContactoId, errorCB, successELI);
	if(!window.simulacion){window.analytics.trackEvent('Invitados', 'Elimino invitado', 'invitados', 1);}
	// Ver de sacarlo del arreglo cunado lo elimino
	// El cancelar tiene que ser distinto
}
function borrarContactoId(tx){
	 modificado=window.delet_id;
	 tx.executeSql('DELETE FROM INVITADOS WHERE inv_mod = ?', [modificado], successELI, errorCB);
	 
}
function successELI(){
	//crearAviso(1);
}
function crearAviso(tipo){
	if(tipo==1){
	contenidoAviso="El contacto fue eliminado";}else if(tipo==2){
	contenidoAviso="Error al Intentar borrar el contacto";}else if(tipo==3){
	contenidoAviso="El contacto fue Agregado";}else if(tipo==4){
	contenidoAviso="Es obligatorio completar el Nombre y el Apellido";}
	document.getElementById("contAlert").innerHTML=contenidoAviso;
	document.getElementById("cartel4").style.visibility="visible";
	document.getElementById("fondo_negro2").style.visibility="visible";
}
function cerrarAviso(){
	document.getElementById("cartel4").style.visibility="hidden";
	document.getElementById("fondo_negro2").style.visibility="hidden";
}
function cerrarTodo(){
	document.getElementById("cartel").style.visibility="hidden";
	document.getElementById("cartel2").style.visibility="hidden";
	document.getElementById("cartel3").style.visibility="hidden";
	document.getElementById("fondo_negro").style.visibility="hidden";
	document.getElementById("fondo_negro2").style.visibility="hidden";
}
function agregarAgenda(){
	nombre=document.getElementById("con_nombre").value;
	apellido=document.getElementById("con_apellido").value;
	if(nombre.length<1 || apellido.length<1){
		 crearAviso(4);
	}else{
	db=window.db;
	db.transaction(insertContactoManual, errorCB, successCBS);
	document.getElementById("cartel3").style.visibility="hidden";}
}
// Darle el formato a la fecha 

function utcformat(d){
    d= new Date(d);// - a.getTimezoneOffset();
	dia= d.getDate();// Dia del mes
	mes= d.getMonth();// que mes
	hora= d.getHours();// hora
	minutos=d.getMinutes();// minutos
    return '<div class="dia">'+dia+'/'+mes+'</div><div class="hora">'+hora+':'+minutos+'</div>';
}
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
