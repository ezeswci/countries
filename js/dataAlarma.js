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
    //db.transaction(selectInvitados, errorCB);
	
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