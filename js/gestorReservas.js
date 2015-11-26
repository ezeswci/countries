// JavaScript Document
function abrirReservas (){
	var ipSend=window.sis_ip;
	if(!window.simulacion){window.analytics.trackEvent('Reservas', 'Abre Reservas', 'General', 1);}
	document.getElementById("cartel").innerHTML='<div class="titulo"><p>TIPO DE RESERVA</p></div><div class="content"><p>Haga click en el tipo de reserva que desea gestionar.</p></div><div class="content_export" id="content_canchas"><div class="loader"></div></div><div class="botones"><div onclick="cerrarTodo();" class="boton_unico"><p>CANCELAR</p></div></div>';	 
	document.getElementById("cartel").style.visibility="visible";
	document.getElementById("fondo_negro").style.visibility="visible";
	if(checkConnection()){
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
			document.getElementById("content_canchas").innerHTML=xmlhttp.responseText;
			return;
			
	    }else if(xmlhttp.status==503 || xmlhttp.status==404){// Esto es si el servidor no le llega a poder responder o esta caido
			 abrirReservas ();
			}
	 	 }
		xmlhttp.open("POST",ipSend+"ver_deportes.php",true);
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xmlhttp.send();
		}
		else{ return;
		}
}
function cerrarTodo(){
	document.getElementById("cartel").style.visibility="hidden";
	document.getElementById("fondo_negro").style.visibility="hidden";
}

