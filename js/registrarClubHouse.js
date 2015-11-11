// JavaScript Document
//Primer pregunta sis_ip, sis_tabs
//Fijo sis_vers_act, sis_ult_ver
//Segunda pregunta
function registrarClubHouse(){// Envio un mensaje para saber a que direccion voy a apuntar
	var lectura=document.getElementById("codigo").value;
	var codigos=lectura.split("-");
	var codigo=codigos[0];
	var udid=device.uuid;//"123456";
	//var udid="123456";
	var regId=window.regId;
	//alert(regId);
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
			respuesta=xmlhttp.responseText;
			if(respuesta!="0"){
				devolucion=respuesta.split("-");
    			window.sis_ip=devolucion[0];
				window.sis_tabs=devolucion[1];
				registrarClubHouse2();
			}else{
				// Avisar que hubo un error en el codigo ingresado
				mostrarAviso();
				}
	    }
	 	 }
		xmlhttp.open("POST","http://miclubhouse.com.ar/sincro/data.php",false);
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xmlhttp.send("codigo="+codigo);
}
function registrarClubHouse2(){// Envio el codigo a esa direccion para 
	var ipSend=window.sis_ip;
	var lectura=document.getElementById("codigo").value;
	var codigos=lectura.split("-");
	var codigo=codigos[1];
	//var udid=device.uuid;//"123456";
	var udid="123456";
	var regId=window.regId;
	//alert(regId);
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
			respuesta=xmlhttp.responseText;
			if(respuesta!="0"){
				devolucion=respuesta.split("-")
    			window.lu_id=parseInt(devolucion[0]);
				window.lu_lo_id=parseInt(devolucion[1]);
				window.lu_usu_id=parseInt(devolucion[2]);
				window.lu_tipo=parseInt(devolucion[3]);
				registrarEnBase();
			}else{
				// Avisar que hubo un error en el codigo ingresado
				mostrarAviso();
				}
	    }
	 	 }
		 //http://swci.com.ar/cc/api/
		xmlhttp.open("POST",ipSend+"sincronizar_usuario.php",false);
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xmlhttp.send("codigo="+codigo+"&udid="+udid+"&regId="+regId);
}
function cerrarTodo(){
	document.getElementById("cartel").style.visibility="hidden";
	document.getElementById("fondo_negro").style.visibility="hidden";
}
function mostrarAviso(){
	document.getElementById("cartel").style.visibility="visible";
	document.getElementById("fondo_negro").style.visibility="visible";
}
