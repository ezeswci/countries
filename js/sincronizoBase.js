//$(document).ready(onDeviceReady);

//Global database
//
var db;
window.sis_vers_act="1.0";
// PhoneGap is ready
//
function registrarEnBase() {
    var dbSize = 20000000;// 20mb
    var dbName = "CCA";
    var dbVersion = "1.0";
    var dbDisplayName = "CCAppDatabase";
	//alert("Entre");

    //Init DB
    //
   window.db = window.openDatabase(dbName, dbVersion, dbDisplayName, dbSize);
   db.transaction(initDB, errorCB, successCB);
	

}

// Init the table
//
function initDB(tx) {
    //La tabla lote usuario tambien controla el sistema
	// sis_ip a donde apunta
	// sis_tabs son los tabs que el country tiene disponibles Noticias - visitas- emergencias - reservas // 0 no- 1 si ej: 0/1/1/0
	// sis_vers_act  La utlima version disponible, por cada paso de entero es obligatorio actualizar
	// sis_ult_ver  La utlima verificacion echa, hacer una por semana?
	tx.executeSql('CREATE TABLE IF NOT EXISTS LOT_USU (lu_id, lu_lot_id , lu_usu_id , lu_tipo, sis_ip, sis_tabs, sis_vers_act, sis_ult_ver, sis_ult_avi)');// tipo: 1- alpha 0-normal
	//tx.executeSql('CREATE TABLE IF NOT EXISTS COUNTRY (co_id, co_nombre)');
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
	db.transaction(insertUsu, errorCB);
	// Para la demo
	//db.transaction(selectHist, errorCB);
}

function selectHist(tx) {
    tx.executeSql('SELECT * FROM LOT_USU', [], querySuccess, errorCB);
}
function insertUsu(tx){
	  /*Lo unico que va*/
	 sis_ult_ver= new Date();
	 cero=0;
	 var query2 = 'INSERT INTO LOT_USU (lu_id, lu_lot_id , lu_usu_id , lu_tipo, sis_ip, sis_tabs, sis_vers_act, sis_ult_ver, sis_ult_avi) VALUES (?,?,?,?,?,?,?,?,?)';
     tx.executeSql(query2, [window.lu_id, window.lu_lo_id, window.lu_usu_id, window.lu_tipo, window.sis_ip, window.sis_tabs, window.sis_vers_act, sis_ult_ver, cero]); 
	 
	 tx.executeSql('SELECT * FROM LOT_USU', [], querySuccess, errorCB);
	 
}
function querySuccess(tx, rs) {
	if(rs.rows.length>0){
		tabs=window.sis_tabs.split("/");
		if(tabs[0]!=0){ window.location = "noticias.html";}
		else{
				if(tabs[1]!=0){window.location = "invitados.html";}else{
					if(tabs[2]!=0){ window.location = "emergencia.html";}
					else{window.location = "reservas.html";}
				}
	
			}
	}else{
		 //window.location = "sincronizar.html";
		 alert("error");
	}
}
