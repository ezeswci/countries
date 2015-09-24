$(document).ready(onDeviceReady);
// Para hacerlo mas adaptable a varios countries deberia ver en que country estoy
// Tener en cuenta que uso el lot_usu_id para decir a que corresponde la invitación


//var devicePlatform = device.platform;// - "Android" - "iOS"
//Global database
//
window.db;
//window.passreal;
//window.passfalsa;
window.lotUsuId;
// PhoneGap is ready
//
function onDeviceReady() {
    var dbSize = 200000;
    var dbName = "CCA";
    var dbVersion = "1.0";
    var dbDisplayName = "CCAppDatabase";
	//alert("Empieza");
    //Init DB
    //
    window.db = window.openDatabase(dbName, dbVersion, dbDisplayName, dbSize);
   	window.db.transaction(initDB, errorCB, successCB);
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
    }
}
// Enlisto todos los invitados y los adjunto al panel
function selectInvitados(tx) {
    tx.executeSql('SELECT * FROM INVITADOS', [], querySuccess, errorCB);
}
function querySuccess(tx, rs) {
    // this will be empty since no rows were inserted.

    for (var i = 0; i < rs.rows.length; i++) {
        var p = rs.rows.item(i);
		//alert('rowid'+p.rowid);
        var element = parseINVITADOS(p.inv_id, p.inv_nombre, p.inv_estado, p.inv_mod);
		verificarEstadoInvitado(i+1,p.inv_id, p.inv_nombre, p.inv_estado, p.inv_mod);
        //alert(element);
        $(".historial").append(element);
    }
}
function parseINVITADOS(inv_id, inv_nombre, inv_estado, modificado){
	modificado=utcformat(modificado);//(new Date(modificado)).toUTCString();
	if(inv_estado<4){
		var estado;
		switch(inv_estado) {
    case 0:
        estado='Enviando';
        break;
    case 1:
        estado='Recibido';
        break;
	case 2:
        estado='Entro';
        break;
	case 3:
        estado='Cancelado';
        break;
	}
    return '<div class="historial_item"><div class="texto"><div class="fecha">'+modificado+'</div><div onclick="borrarContacto('+inv_id+',this)" class="borrar">Cancelar</div><div class="contacto"><strong>'+inv_nombre+': </strong>'+estado+'</div></div></div>';}else{
		return '';
	}
}
// Fin de Ajunto los inivtados
function agregarContactos (){
	document.getElementById("cartel").style.visibility="visible";
	document.getElementById("fondo_negro").style.visibility="visible";
}
function agregarManual(){
	document.getElementById("cartel").style.visibility="hidden";
	document.getElementById("cartel2").innerHTML='<div onclick="cerrarTodo();" id="x"><img src="img/x.jpg" width="35" height="35" /></div><div class="titulo">SMS O MAIL</div><div class="content"><p>Hay contactos que reciben el mensaje de alerta por SMS y otros que lo reciben por mail.</p><p>Elija el tipo de contacto que desea cargar:. </p></div><div class="botones"><div onclick="agregarSMSManual();" class="boton">SMS</div><div onclick="agregarMailManual();" class="boton der">MAIL</div></div>';
	document.getElementById("cartel2").style.visibility="visible";
}

function agregarSMSManual(){
	document.getElementById("cartel2").style.visibility="hidden";
	document.getElementById("cartel3").innerHTML='<div class="titulo">INGRESE LOS DATOS</div><div class="content"><p>Ingrese el nombre del Invitado.</p><table width="100%"><tr><td width="20%">Nombre:</td><td><input type="text" id="con_nombre" autocomplete="off" ></td></tr></table></div><div class="botones"><div onclick="cerrarTodo();" class="boton">CANCELAR</div><div onclick="agregarAgenda();" class="boton der">AGREGAR</div></div>';
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
	 nombre=document.getElementById("con_nombre").value;
	 estado=0;
	 quien=window.lotUsuId;
	 cuando=Date.now();
	 //alert("claves"+verdadera+"-fal-"+falsa);CONTACT (con_id unique, con_tipo, con_nombre, con_destino)
	 var query = 'INSERT INTO INVITADOS (inv_nombre, inv_estado, inv_lu_id, inv_mod) VALUES (?,?,?,?)';
     tx.executeSql(query, [nombre, estado, quien, cuando]);
	 
}
function borrarContacto(id,element){
	element=element.parentNode;
	element.parentNode.style.display="none";
	window.delet_id=id;
	//window.db.transaction(borrarContactoId, errorCB, successELI);
	// El cancelar tiene que ser distinto
}
function borrarContactoId(tx){
	 id=window.delet_id;
	 tx.executeSql('DELETE FROM INVITADOS WHERE inv_id = ?', [id], successELI, errorCB);
	 
}
function successELI(){
	//crearAviso(1);
}
function crearAviso(tipo){
	if(tipo==1){
	contenidoAviso="El contacto fue eliminado";}else if(tipo==2){
	contenidoAviso="Error al Intentar borrar el contacto";}else if(tipo==3){
	contenidoAviso="El contacto fue Agregado";}else if(tipo==4){
	contenidoAviso="La clave no es correcta, intente nuevamente";}
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
	document.getElementById("fondo_negro3").style.visibility="hidden";
}
function agregarAgenda(){
	db=window.db;
	db.transaction(insertContactoManual, errorCB, successCBS);
	document.getElementById("cartel3").style.visibility="hidden";
}
// Darle el formato a la fecha 

function utcformat(d){
    d= new Date(d);// - a.getTimezoneOffset();
	dia= d.getDate();// Dia del mes
	mes= d.getMonth();// que mes
	hora= d.getHours();// hora
	minutos=d.getMinutes();// minutos
    return hora+':'+minutos+' - '+dia+'/'+mes;
}
