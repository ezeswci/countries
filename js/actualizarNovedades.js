// JavaScript Document
//setTimeout(actualizarNovedades, 3000);
function actualizarNovedades(){
	var ipSend=window.sis_ip;
	//alert("Busco actualizar noticias");// Todo ya cargado busco las actualizaciones
	if(checkConnection()){
		var ultMod=window.ultActulizacion;
		//alert(ultMod);
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
			//value=parseInt(xmlhttp.responseText);// Devuelve el Id del invitado
			var respuesta = xmlhttp.responseText;
			if(parseInt(respuesta)!=0){
			var obj = JSON.parse(respuesta);
			for (var i = 0; i < obj.length; i++) {
				//no_id,no_titulo, no_tipo, no_fecha, no_prio,no_copete, no_contenido, no_img, no_estado, no_modif
				actualizarNoticiaElemento(obj[i]['no_id'],obj[i]['no_titulo'],obj[i]['no_tipo'],obj[i]['no_fecha'],obj[i]['no_prio'],obj[i]['no_copete'],obj[i]['no_contenido'],obj[i]['no_img'],obj[i]['no_estado'],obj[i]['no_modif']);
        	//alert("Noticias: "+obj[i]['no_id'] +obj[i]['no_titulo'] + "id por otro lado");
    		}
			
			window.db.transaction(selectNoticias, errorCB);
			}else{
				//alert("Sin actualizaciones");
			}
			//window.TengoQueActualizar=1;
			return;
			
	    }else if(xmlhttp.status==503 || xmlhttp.status==404){// Esto es si el servidor no le llega a poder responder o esta caido
			 return;
			}
	 	 }
		xmlhttp.open("POST",ipSend+"leer_novedades.php",true);// Que no se trabe por culpa de esto
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xmlhttp.send("ultMod="+ultMod);
		}
		else{ return;
		}
}
function actualizarNoticiaElemento(no_id,no_titulo, no_tipo, no_fecha, no_prio,no_copete, no_contenido, no_img, no_estado, no_modif){
	// Vemos si pertenece a un Id existente
	var flag=0;
	for (var b in window.noticias){
		if(window.noticias[b].id==no_id){
			actualizarNoticiaBase(no_id,no_titulo, no_tipo, no_fecha, no_prio,no_copete, no_contenido, no_img, no_estado, no_modif);
			flag=1;
			return;
		}
	}
	if(flag==0){
	agregarNoticiaBase(no_id,no_titulo, no_tipo, no_fecha, no_prio,no_copete, no_contenido, no_img, no_estado, no_modif);}
	// De existir lo actualiza o lo Elimina
	}
	
function actualizarNoticiaBase(no_id,no_titulo, no_tipo, no_fecha, no_prio,no_copete, no_contenido, no_img, no_estado, no_modif){
	//alert("actualizo noticia");
	//alert("actualizarReservasId -- actualizo"+i+ "id por otro lado" +idReserva+'-'+estadoCancha+'-'+re_can_id+'-'+re_fecha+'-'+re_hora);
	db=window.db;
	if(no_estado!="D"){// Si no esta desactivada
	db.transaction(function (tx) {
		tx.executeSql('UPDATE NOTICIAS SET no_titulo=?, no_tipo=?,no_fecha=?, no_prio=?,no_copete=?, no_contenido=?,no_img=?, no_estado=?, no_modif=?  WHERE no_id = ?', [no_titulo, no_tipo, no_fecha, no_prio,no_copete, no_contenido, no_img, no_estado, no_modif, no_id], successupd, errorupd);
	}
	);}else{// Si esta desactivada la elimina asi no ocupa espacio en la App 
		db.transaction(function (tx) {
		tx.executeSql('DELETE FROM NOTICIAS WHERE no_id=?', [no_id], successupd, errorupd);
	}
	);
	}
}

function agregarNoticiaBase(no_id,no_titulo, no_tipo, no_fecha, no_prio,no_copete, no_contenido, no_img, no_estado, no_modif){
	//alert("agrego noticia");
	//alert("actualizarReservasId -- actualizo"+i+ "id por otro lado" +idReserva+'-'+estadoCancha+'-'+re_can_id+'-'+re_fecha+'-'+re_hora);
	db=window.db;
	if(no_estado!="D"){// Si no esta desactivada
	db.transaction(function (tx) {
		tx.executeSql('INSERT INTO NOTICIAS (no_id,no_titulo, no_tipo, no_fecha, no_prio,no_copete, no_contenido, no_img, no_estado, no_modif) VALUES (?,?,?,?,?,?,?,?,?,?)', [no_id,no_titulo, no_tipo, no_fecha, no_prio,no_copete, no_contenido, no_img, no_estado, no_modif], successupd, errorupd);
	}
	);}
}
function successupd(){
	 //alert('acualizo bien');
	 
}
function errorupd(){
	 alert('acualizo mal');
	 
}