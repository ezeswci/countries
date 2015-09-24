// JavaScript Document
window.TengoQueActualizar=0;
function actualizar(){
if(window.TengoQueActualizar==1){
		setTimeout(function(){window.location="invitados.html";},5000);}else
		{
//alert("Va pregunta para actualizar:");
if(window.db!=null) { 
window.db.transaction(actualizarInvitados, errorCB);
}else{ 
setTimeout(function(){esperarActualizar();},9000); 
}}
//setTimeout(function(){actualizar();},9000);
}
setTimeout(function(){actualizar();},9000);
function esperarActualizar(){
	//alert("Espero a actualizar");
	if (typeof actualizar == 'function') { 
  		setTimeout(function(){actualizar();},9000); 
		}else{ 
  		setTimeout(function(){esperarActualizar();},9000); 
		}
}
function actualizarInvitados(tx) {
    tx.executeSql('SELECT * FROM INVITADOS', [], querySuccessActualizar, errorCBAA);
}
function querySuccessActualizar(tx, rs) {
    // this will be empty since no rows were inserted.
	//alert("Hace la llamada para actualizar");
	var actualizar=0;
    for (var i = 0; i < rs.rows.length; i++) {
        var p = rs.rows.item(i);
		//alert('rowid'+p.rowid);
		// No es sincronizable, no conviene varia simplemente el tengo que actualizar
		verificarEstadoInvitado(i+1,p.inv_id, p.inv_nombre, p.inv_estado, p.inv_mod);
    }
		setTimeout(function(){esperarActualizar();},5000);
}
function errorCBAA() {
    alert("error CBAA");
}
function verificarEstadoInvitado(rowid,inv_id, inv_nombre, inv_estado, inv_mod){
	//alert ("entre a verificar estado-"+inv_estado);
	if(inv_estado!=0){// Tengo que verificar si entro al barrio
		//alert ("Mira si entro al barrio:"+inv_estado);
		actualizarInvitado(inv_id, inv_estado);// No es sincronizado, varia el mayor
		return;
	}else{// hay que crear el invitado y asociarlo con la guardia
		//alert ("Crea un usuario:"+inv_estado);
		 crearInvitado(rowid,inv_id, inv_nombre, inv_estado, inv_mod);
		 return
	}
}
function crearInvitado(rowid,inv_id, inv_nombre, inv_estado, inv_mod){
	//alert ("entre a crear un usuario");
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
			value=parseInt(xmlhttp.responseText);
			actualizarContactoId(rowid,value);
			window.TengoQueActualizar=1;
			return;
			
	    }
	 	 }
		xmlhttp.open("POST","http://swci.com.ar/cc/api/nuevo_invitado.php",true);
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xmlhttp.send("in_lousu_id="+lot+"&in_nombre="+inv_nombre);
		}
		else{ return;
		}
}
function actualizarContactoId(rowid,value){
	//alert("actualizo"+rowid+'--'+value);
	estado=1;
	window.db.transaction(function (tx) {
		tx.executeSql('UPDATE INVITADOS SET inv_estado=?, inv_id=? WHERE rowid = ?', [estado,value,rowid], successupd, errorupd);
	}
	);
}
function successupd(){
	 alert('acualizo bien');
	 
}
function errorupd(){
	 alert('acualizo mal');
	 
}
function actualizarInvitado(inv_id, inv_estado){
	//alert ("entre a actualizar un invitado:"+inv_id);
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
			//alert("devuelto:"+value+" Tengo:"+inv_estado);
			if(inv_estado!=value){
			//alert("Actualizo:"+value);
			actualizarContactoEstado(inv_id,value);
			window.TengoQueActualizar=1;
			
			}
			return;
	    }
	 	 }
		xmlhttp.open("POST","http://swci.com.ar/cc/api/leer_invitado.php",false);
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xmlhttp.send("in_lousu_id="+inv_id);
		}
		else{ return;
		}
}
function actualizarContactoEstado(inv_id,value){
	//alert("actualizo"+inv_id);
	window.db.transaction(function (tx) {
		tx.executeSql('UPDATE INVITADOS SET inv_estado=? WHERE inv_id = ?', [value,inv_id], successupd, errorupd);
	}
	);
}