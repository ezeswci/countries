$(document).ready(onDeviceReady);

//Global database
//
var db;

// PhoneGap is ready
//
function onDeviceReady() {
    var dbSize = 200000;
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
    //tx.executeSql('CREATE TABLE IF NOT EXISTS USUARIOS (usu_id, usu_udid, usu_nombre, usu_apellido, usu_celular, usu_estado)');
	// Esto no estaba antes
	//tx.executeSql('CREATE TABLE IF NOT EXISTS LOTES (lot_id, lot_nombre , lot_coun_id , lot_flia)');
	tx.executeSql('CREATE TABLE IF NOT EXISTS LOT_USU (lu_id, lu_lot_id , lu_usu_id , lu_tipo)');// tipo: 1- alpha 0-normal
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
	db.transaction(initDB, errorCB);
	// Para la demo
	db.transaction(selectHist, errorCB);
}

function selectHist(tx) {
    tx.executeSql('SELECT * FROM LOT_USU', [], querySuccess, errorCB);
}
function insertUsu(tx){
	//var id=device.uuid;
	//alert('Cargo usuario');
	 //var id='123';// Sacarlo para el cel
	 //var query = 'INSERT INTO USUARIOS (usu_id, usu_udid, usu_nombre, usu_apellido, usu_celular, usu_estado ) VALUES (?,?,?,?,?,?)';
     //tx.executeSql(query, [1, id, "Ezequiel", "Wernicke", "1161749820", "A"]);
	 //var query1 = 'INSERT INTO LOTES (lot_id, lot_nombre , lot_coun_id , lot_flia) VALUES (?,?,?,?)';
     //tx.executeSql(query1, [1, "T-63", 1, "Wernicke"]);
	 /* Lo unico que va
	 var query2 = 'INSERT INTO LOT_USU (lu_id, lu_lot_id , lu_usu_id , lu_tipo) VALUES (?,?,?,?)';
     tx.executeSql(query2, [1, 1, 1, 1]); */
	 //var query3 = 'INSERT INTO COUNTRY (co_id, co_nombre) VALUES (?,?)';
     //tx.executeSql(query3, [1, "Ayres de Pilar"]);/**/
	 
}
function querySuccess(tx, rs) {
    // this will be empty since no rows were inserted.
	//alert(rs.rows.length);
	if(rs.rows.length>0){
		var p = rs.rows.item(0);
		window.sis_tabs=p.sis_tabs.split("/");
		
		if(window.sis_tabs[0]!=0){ window.location = "noticias.html";}
		else{
				if(window.sis_tabs[1]!=0){window.location = "invitados.html";}else{
					if(window.sis_tabs[2]!=0){ window.location = "emergencia.html";}
					else{window.location = "reservas.html";}
				}
	
			}
		//window.location = "noticias.html";
	}else{
		
		 window.location = "sincronizar.html";
		// -- cuando tenga q sincronizar
		//window.location = "noticias.html";
	}
}
