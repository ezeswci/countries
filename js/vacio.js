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
    tx.executeSql('CREATE TABLE IF NOT EXISTS USUARIOS (usu_id, usu_udid, usu_countrie_nom, usu_coun_id, usu_nombre, usu_estado )');
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
    tx.executeSql('SELECT * FROM USUARIOS', [], querySuccess, errorCB);
}
function insertUsu(tx){
	//var id=device.uuid;
	//alert('Cargo usuario');
	var id='123';// Sacarlo para el cel
	 var query = 'INSERT INTO USUARIOS (usu_id, usu_udid, usu_countrie_nom, usu_coun_id, usu_nombre, usu_estado ) VALUES (?,?,?,?,?,?)';
     tx.executeSql(query, [1, id, "Tortugas", 1, "Ezequiel Wernicke", "A"]);
	 
}
function querySuccess(tx, rs) {
    // this will be empty since no rows were inserted.
	//alert(rs.rows.length);
	if(rs.rows.length>0){
		window.location = "noticias.html";
	}else{
		//alert("sin usuario");
		db=window.db;
		 db.transaction(insertUsu, errorCB);// Remplaza el sincronizar
		 setTimeout(function(){window.location = "sincronizar.html";},3000)
		// -- cuando tenga q sincronizar
		//window.location = "noticias.html";
	}
}
