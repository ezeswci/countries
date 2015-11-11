// JavaScript Document
window.TengoQueActualizar=0;
window.consultaInvitados;
/*function actualizar(){
if(window.TengoQueActualizar==1){
		setTimeout(function(){window.location="invitados.html";},1000);}else
		{
//alert("Va pregunta para actualizar:");
if(window.db!=null) { 
window.db.transaction(actualizarInvitados, errorCB);
}else{ 
setTimeout(function(){esperarActualizar();},2000); 
}}
//setTimeout(function(){actualizar();},9000);
}
setTimeout(function(){actualizar();},2000);
function esperarActualizar(){
	//alert("Espero a actualizar");
	if (typeof actualizar == 'function') { 
  		setTimeout(function(){actualizar();},2000); 
		}else{ 
  		setTimeout(function(){esperarActualizar();},2000); 
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
		setTimeout(function(){esperarActualizar();},1000);
}*/
function actualizar(){
	// Esta es la consulta de todos los invitados tal cual la mostramos.
	arreglo=window.consultaInvitados;
    for (var i = 0; i < arreglo.length; i++) {
        var p = arreglo[i];
		verificarEstadoInvitado(i,p.inv_id, p.inv_nombre, p.inv_estado, p.inv_mod);
		//alert("actualizo"+p.inv_id + "id por otro lado");
    }
	setTimeout(function(){actualizar();},15000);// Actualiza cada 15 segundos
}
function errorCBAA() {
    alert("error CBAA");
}
function verificarEstadoInvitado(i,inv_id, inv_nombre, inv_estado, inv_mod){
	//alert ("entre a verificar estado-"+inv_estado);
	//alert("verificarEstadoInvitado -- actualizo"+i+ "id por otro lado" +window.consultaInvitados.rows.item(i).inv_nombre);
	if(inv_estado!=0){// Tengo que verificar si entro al barrio
		//alert ("Mira si entro al barrio:"+inv_estado);
		if(inv_estado==1){// Solo consulto los que estan pendientes de que autorizen
		actualizarInvitado(i,inv_mod,inv_id, inv_estado);
		}// No es sincronizado, varia el mayor
		return;
	}else{// hay que crear el invitado y asociarlo con la guardia
		//alert ("Crea un usuario:"+inv_estado);
		 crearInvitado(i,inv_nombre, inv_estado, inv_mod);
		 return
	}
}
function crearInvitado(i,inv_nombre, inv_estado, inv_mod){
	var ipSend=window.sis_ip;
	//alert ("entre a crear un usuario con i="+i);
	//alert("crearInvitado -- actualizo"+i+ "id por otro lado" +window.consultaInvitados.rows.item(i).inv_nombre);
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
			actualizarContactoId(i,value,inv_mod);
			// poner la imagen de que lo recibio
			document.getElementById("img_inv_"+inv_mod).src="img/estados/recibido.png";
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
function actualizarContactoId(i,value,inv_mod){
	//alert("actualizo"+rowid+'--'+value);
	//alert("actualizarContactoId -- actualizo"+i+ "id por otro lado" +window.consultaInvitados[i].inv_nombre+'con id cambio a:'+value);
	estado=1;
	p=window.consultaInvitados[i];
	p.inv_estado=estado;
	p.inv_id=value;
	window.consultaInvitados[i]=p;
	//window.consultaInvitado[i].inv_estado=estado;//p=rowid-1
	//alert("cambio i:"+window.consultaInvitados[i].inv_estado);
	//window.consultaInvitado[i].inv_id=value;
	//alert("cambio id:"+window.consultaInvitados[i].inv_id);
	window.db.transaction(function (tx) {
		tx.executeSql('UPDATE INVITADOS SET inv_estado=?, inv_id=? WHERE inv_mod = ?', [estado,value,inv_mod], successupd, errorupd);
	}
	);
}
function successupd(){
	 //alert('acualizo bien');
	 
}
function errorupd(){
	 alert('acualizo mal');
	 
}
function actualizarInvitado(i,inv_mod,inv_id, inv_estado){
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
			if(value==2){// Si el estado es procesado cambiar a procesado
			document.getElementById("img_inv_"+inv_mod).src="img/estados/procesado.png";}
			actualizarContactoEstado(i,inv_id,value);			
			}
			return;
	    }else if(xmlhttp.status==503 || xmlhttp.status==404){// Esto es si el servidor no le llega a poder responder o esta caido
			 return;
			}
	 	 }
		xmlhttp.open("POST",ipSend+"leer_invitado.php",false);
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xmlhttp.send("in_lousu_id="+inv_id);
		}
		else{ return;
		}
}
function actualizarContactoEstado(i,inv_id,value){
	//alert("actualizo"+inv_id);
	window.consultaInvitados[i].inv_estado=value;// Value en este caso es el estado en el que se encunetra
	window.db.transaction(function (tx) {
		tx.executeSql('UPDATE INVITADOS SET inv_estado=? WHERE inv_id = ?', [value,inv_id], successupd, errorupd);
	}
	);
}
