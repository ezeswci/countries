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
window.db;
function onDeviceReady() {
    var dbSize = 20000000;// 20mb
    var dbName = "CCA";
    var dbVersion = "1.0";
    var dbDisplayName = "CCAppDatabase";
	//alert("Empieza");
    //Init DB
    //
    window.db = window.openDatabase(dbName, dbVersion, dbDisplayName, dbSize);
   	window.db.transaction(initDBAlerta, errorCB, successCBAlerta);
	emergBack();
}
function initDBAlerta(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS ALERTA (al_id , al_estado)');// Reservas al_estado 0-noenviado, 1 si
}

// Transaction error callback
//
function errorCB(tx, err) {
    alert("Error processing SQL: " + err);
}
function successupd(tx, err) {
}
function errorupd(tx, err) {
}

// Transaction success callback
//
function successCBAlerta() {
	db.transaction(selectLotUsuId, errorCB);
    db.transaction(selectAlerta, errorCB);
	
}
// Elijo el Lot usu id
function selectAlerta(tx) {
    tx.executeSql('SELECT * FROM ALERTA', [], querySuccessAlerta, errorCB);
}
function querySuccessAlerta(tx, rs) {
    // this will be empty since no rows were inserted.
	if(rs.rows.length>0){// Quedo un alerta pendiente
	enviarMensajeServidor();
	}
}
function crearAlerta(){
	al_id=1;
	estado=0;
	window.db.transaction(function (tx) {
		tx.executeSql('INSERT INTO ALERTA (al_id , al_estado) VALUES (?,?)', [al_id,estado], successupd, errorupd);
	}
	);
}
function borrarAlerta(){
	estado=0;
	window.db.transaction(function (tx) {
		tx.executeSql('DELETE FROM ALERTA WHERE al_estado = ?', [estado], successupd, errorupd);
	}
	);
}
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
function successELI(){
	//crearAviso(1);
}