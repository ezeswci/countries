// JavaScript Document
//Primer pregunta sis_ip, sis_tabs
//Fijo sis_vers_act, sis_ult_ver
//Segunda pregunta
window.regId="0";
window.simulacion=false;
if(!window.simulacion){
document.addEventListener("deviceready", onDeviceReadyUdid, false);
function onDeviceReadyUdid() {
    window.udid=device.uuid;
}
}else{
		window.udid='123456';
	}
function registrarClubHouse(){// Envio un mensaje para saber a que direccion voy a apuntar
	var lectura=document.getElementById("codigo").value;
	var codigos=lectura.split("-");
	var codigo=codigos[0];
	//var regId=window.regId;
	//alert(regId+"-"+codigo);
	mostrarSincronizando();
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
			alert(respuesta);
			if(respuesta!="0"){
				devolucion=respuesta.split("-");
				window.logos=devolucion[0];
    			window.sis_ip=devolucion[1];
				window.sis_tabs=devolucion[2];
				registrarClubHouse2();
			}else{
				// Avisar que hubo un error en el codigo ingresado
				mostrarAviso();
				}
	    }
	 	 }
		xmlhttp.open("POST","http://miclubhouse.com.ar/sincro/data.php",true);
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xmlhttp.send("codigo="+codigo);
}
function registrarClubHouse2(){// Envio el codigo a esa direccion para 
	var ipSend=window.sis_ip;
	var lectura=document.getElementById("codigo").value;
	var codigos=lectura.split("-");
	var codigo=codigos[1];
	var udid=window.udid;//"123456";
	//var udid="123456";
	var regId=window.regId;
	alert(regId+"-"+codigo+"-"+udid);
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
		xmlhttp.open("POST",ipSend+"sincronizar_usuario.php",true);
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xmlhttp.send("codigo="+codigo+"&udid="+udid+"&regId="+regId);
}
function mostrarSincronizando(){
	document.getElementById("cartel2").style.visibility="visible";
	document.getElementById("fondo_negro2").style.visibility="visible";
}
function cerrarTodo(){
	document.getElementById("cartel").style.visibility="hidden";
	document.getElementById("fondo_negro").style.visibility="hidden";
}
function mostrarAviso(){
	document.getElementById("cartel2").style.visibility="hidden";
	document.getElementById("fondo_negro2").style.visibility="hidden";
	document.getElementById("cartel").style.visibility="visible";
	document.getElementById("fondo_negro").style.visibility="visible";
}