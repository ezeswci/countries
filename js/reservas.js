$(document).ready(onDeviceReady);
// Para hacerlo mas adaptable a varios countries deberia ver en que country estoy
// Tener en cuenta que uso el lot_usu_id para decir a que corresponde la invitación


  
//Global database
//
window.db;
//window.passreal;
//window.passfalsa;
window.lotUsuId;
window.consultaReservas=new Array();// La consulta echa
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
	reservasBack();
	//window.db.transaction(selectPass, errorCB);
	//db.transaction(initDB, errorCB, successCBM);

}
function selectPass(tx) {
    //tx.executeSql('SELECT * FROM PASS', [], querySuccessPass, errorCB);
}

// Init the table
//
function initDB(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS RESERVAS (re_id , re_deporte, re_hora, re_fecha, re_can_nom, re_can_id, re_estad )');// Reservas estado 0-enviado 1-recibido Solicitado 3-Confirmado 5- Rechazado 6-Solicita Cancelacion  7-Cancelado
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
    db.transaction(selectReservas, errorCB);
	
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
// Enlisto todos los invitados y los adjunto al panel DATE(myDate) = DATE(NOW())
function selectReservas(tx) {
    tx.executeSql('SELECT * FROM RESERVAS ORDER BY re_fecha DESC, re_hora DESC ', [], querySuccess, errorCB);
}
function querySuccess(tx, rs) {
    // this will be empty since no rows were inserted.
	//window.consultaReservas;// Esta es la consulta de todos los invitados tal cual la mostramos.
    for (var i = 0; i < rs.rows.length; i++) {
        var p = rs.rows.item(i);
		window.consultaReservas[i]=p;
		//alert('rowid'+p.rowid);
		var element = parseReservas(p.re_deporte, p.re_hora,p.re_fecha, p.re_can_nom,p.re_can_id,p.re_estad, i)
		//verificarEstadoInvitado(i+1,p.inv_id, p.inv_nombre, p.inv_estado, p.inv_mod); No lo hacemos recien lo carga por si no tiene internet
        //alert(element);
        $(".historial").append(element);
    }
	setTimeout(function(){actualizar();},3000);
}

function successCBS(){
	//window.location='reservas.html';
}
function borrarContacto(modificado,i,element){
	element=element.parentNode;
	element.parentNode.style.display="none";
	//borrarContactoEstado(i,modificado)
	window.delet_id=modificado;
	window.consultaInvitados[i].inv_estado=3;
	window.db.transaction(borrarContactoId, errorCB, successELI);
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