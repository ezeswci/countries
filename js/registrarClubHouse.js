// JavaScript Document
function registrarClubHouse(){
	var codigo=document.getElementById("codigo").value;
	var udid=device.uuid;
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
		xmlhttp.open("POST","http://swci.com.ar/cc/api/sincronizar_usuario.php",false);
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xmlhttp.send("codigo="+codigo+"&udid="+udid);
}
function cerrarTodo(){
	document.getElementById("cartel").style.visibility="hidden";
	document.getElementById("fondo_negro").style.visibility="hidden";
}
function mostrarAviso(){
	document.getElementById("cartel").style.visibility="visible";
	document.getElementById("fondo_negro").style.visibility="visible";
}
